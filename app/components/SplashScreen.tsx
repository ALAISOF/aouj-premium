'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onLoadingComplete: () => void;
}

interface Particle {
  x: number;
  y: number;
  z: number;
  vz: number;
  brightness: number;
  hue: 'white' | 'silver';
  trailLength: number;
}

const TOTAL_DURATION_MS: number = 8000;
const WARP_DURATION_MS: number = 5500;
const FOG_START_MS: number = 5500;
const FOG_DURATION_MS: number = 1500;
const EXIT_START_MS: number = 7000;
const EXIT_DURATION_MS: number = 1000;

export default function SplashScreen({ onLoadingComplete }: SplashScreenProps): React.ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animationPhase, setAnimationPhase] = useState<'warp' | 'fog' | 'exit'>('warp');
  const particlesRef = useRef<Particle[]>([]);
  const startTimeRef = useRef<number>(0);
  const animationIdRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    for (let i = 0; i < 450; i++) {
      particles.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * 8000 + 100,
        vz: Math.random() * 35 + 15,
        brightness: Math.random() * 0.85 + 0.15,
        hue: Math.random() > 0.75 ? 'silver' : 'white',
        trailLength: Math.random() * 60 + 40,
      });
    }
    particlesRef.current = particles;

    const handleResize = (): void => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) return;

    startTimeRef.current = performance.now();

    const animate = (timestamp: number): void => {
      const elapsed: number = timestamp - startTimeRef.current;

      ctx.fillStyle = 'rgba(7, 11, 25, 0.08)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (elapsed < WARP_DURATION_MS) {
        const progress: number = elapsed / WARP_DURATION_MS;
        const speedMultiplier: number = Math.pow(progress + 0.05, 3.2);

        particlesRef.current.forEach((particle: Particle) => {
          const acceleratedVz: number = particle.vz * (1 + speedMultiplier * 12);
          particle.z -= acceleratedVz;

          if (particle.z < 10) {
            particle.z = 8000;
            particle.x = Math.random() * canvas.width - canvas.width / 2;
            particle.y = Math.random() * canvas.height - canvas.height / 2;
          }

          const cameraDistance: number = 600;
          const perspectiveScale: number = cameraDistance / particle.z;
          const screenX: number = canvas.width / 2 + particle.x * perspectiveScale;
          const screenY: number = canvas.height / 2 + particle.y * perspectiveScale;

          const trailDepthOffset: number = acceleratedVz * particle.trailLength * 0.6;
          const trailZ: number = Math.max(10, particle.z + trailDepthOffset);
          const trailPerspectiveScale: number = cameraDistance / trailZ;
          const trailScreenX: number = canvas.width / 2 + particle.x * trailPerspectiveScale;
          const trailScreenY: number = canvas.height / 2 + particle.y * trailPerspectiveScale;

          const depthFactor: number = Math.max(0, 1 - particle.z / 8000);
          const progressFade: number = Math.min(1, progress * 1.3);
          const baseOpacity: number = particle.brightness * depthFactor * progressFade;

          const primaryColor: string = particle.hue === 'silver'
            ? `rgba(194, 207, 224, ${baseOpacity * 0.95})`
            : `rgba(255, 255, 255, ${baseOpacity})`;

          ctx.strokeStyle = primaryColor;
          ctx.lineWidth = Math.max(0.8, depthFactor * (1.5 + speedMultiplier * 4));
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.globalAlpha = 1;

          ctx.beginPath();
          ctx.moveTo(trailScreenX, trailScreenY);
          ctx.lineTo(screenX, screenY);
          ctx.stroke();

          const glowColor: string = particle.hue === 'silver'
            ? `rgba(148, 179, 219, ${baseOpacity * 0.4})`
            : `rgba(255, 255, 255, ${baseOpacity * 0.5})`;

          ctx.strokeStyle = glowColor;
          ctx.lineWidth = Math.max(3, depthFactor * (12 + speedMultiplier * 20));
          ctx.globalAlpha = Math.max(0.04, 0.1 + speedMultiplier * 0.08);

          ctx.beginPath();
          ctx.moveTo(trailScreenX, trailScreenY);
          ctx.lineTo(screenX, screenY);
          ctx.stroke();

          ctx.strokeStyle = glowColor;
          ctx.lineWidth = Math.max(6, depthFactor * (20 + speedMultiplier * 35));
          ctx.globalAlpha = Math.max(0.02, 0.04 + speedMultiplier * 0.04);

          ctx.beginPath();
          ctx.moveTo(trailScreenX, trailScreenY);
          ctx.lineTo(screenX, screenY);
          ctx.stroke();

          ctx.globalAlpha = 1;
        });
      }

      if (elapsed < TOTAL_DURATION_MS) {
        animationIdRef.current = requestAnimationFrame(animate);
      }
    };

    animationIdRef.current = requestAnimationFrame(animate);

    const fogTimer: NodeJS.Timeout = setTimeout(() => {
      setAnimationPhase('fog');
    }, FOG_START_MS);

    const exitTimer: NodeJS.Timeout = setTimeout(() => {
      setAnimationPhase('exit');
    }, EXIT_START_MS);

    const completeTimer: NodeJS.Timeout = setTimeout(() => {
      onLoadingComplete();
    }, TOTAL_DURATION_MS);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      clearTimeout(fogTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoadingComplete]);

  const fogVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: FOG_DURATION_MS / 1000, ease: 'easeInOut' },
    },
    exit: {
      opacity: 0,
      transition: { duration: EXIT_DURATION_MS / 1000, ease: 'easeInOut' },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.35, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: FOG_DURATION_MS / 1000,
        ease: 'easeOut',
        type: 'spring',
        stiffness: 70,
        damping: 18,
        mass: 0.8,
      },
    },
    exit: {
      opacity: 0,
      scale: 1.2,
      y: -50,
      transition: { duration: EXIT_DURATION_MS / 1000, ease: 'easeInOut' },
    },
  };

  const sloganVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, delay: 0.5, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: EXIT_DURATION_MS / 1000, ease: 'easeInOut' },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: EXIT_DURATION_MS / 1000, ease: 'easeInOut' },
      }}
      className="fixed inset-0 w-full h-screen bg-[#070B19] flex items-center justify-center z-50 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          opacity: animationPhase === 'warp' ? 1 : 0.12,
          transition: 'opacity 0.8s ease-in-out',
        }}
      />

      <AnimatePresence>
        {(animationPhase === 'fog' || animationPhase === 'exit') && (
          <motion.div
            variants={fogVariants as any}
            initial="hidden"
            animate={animationPhase === 'exit' ? 'exit' : 'visible'}
            exit="exit"
            className="absolute inset-0"
            style={{
              pointerEvents: 'none',
              background: 'radial-gradient(circle at center, rgba(7, 11, 25, 0.2) 0%, rgba(4, 7, 18, 0.96) 100%)',
              backdropFilter: 'blur(70px)',
              WebkitBackdropFilter: 'blur(70px)',
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(animationPhase === 'fog' || animationPhase === 'exit') && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-8"
            style={{ pointerEvents: 'none' }}
          >
            <motion.div
              variants={logoVariants as any}
              initial="hidden"
              animate={animationPhase === 'exit' ? 'exit' : 'visible'}
              exit="exit"
            >
              <motion.div
                animate={{
                  filter: [
                    'drop-shadow(0 0 25px rgba(200, 214, 229, 0.35)) drop-shadow(0 0 60px rgba(30, 58, 138, 0.2))',
                    'drop-shadow(0 0 45px rgba(200, 214, 229, 0.55)) drop-shadow(0 0 100px rgba(30, 58, 138, 0.4))',
                    'drop-shadow(0 0 25px rgba(200, 214, 229, 0.35)) drop-shadow(0 0 60px rgba(30, 58, 138, 0.2))',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Image
                  src="/logo_logo.png" 
                  alt="AOUJ Premium Logo"
                  width={420}
                  height={420}
                  priority
                  quality={100}
                  style={{
                    width: 'auto',
                    height: 'auto',
                    maxWidth: '420px',
                    maxHeight: '420px',
                    objectFit: 'contain',
                  }}
                />
              </motion.div>
            </motion.div>

            <motion.div
              variants={sloganVariants as any}
              initial="hidden"
              animate={animationPhase === 'exit' ? 'exit' : 'visible'}
              exit="exit"
            >
              <p
                className="text-xs font-bold tracking-[0.4em] text-[#CBD5E1] uppercase"
                style={{
                  letterSpacing: '0.4em',
                  textShadow: '0 0 15px rgba(200, 214, 229, 0.2), 0 2px 5px rgba(0, 0, 0, 0.5)',
                  whiteSpace: 'nowrap',
                }}
              >
                THE PINNACLE OF LUXURY MOTION
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}