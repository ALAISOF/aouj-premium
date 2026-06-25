'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Home,
  Compass,
  Truck,
  BookOpen,
} from 'lucide-react';
import Link from 'next/link';

interface DockItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

const dockItems: DockItem[] = [
  {
    id: 'accueil',
    label: 'Accueil',
    icon: <Home size={24} strokeWidth={1.5} />,
    href: '/',
  },
  {
    id: 'excursions',
    label: 'Excursions',
    icon: <Compass size={24} strokeWidth={1.5} />,
    href: '/excursions',
  },
  {
    id: 'fleet',
    label: 'Fleet',
    icon: <Truck size={24} strokeWidth={1.5} />,
    href: '/fleet',
  },
  {
    id: 'ourstory',
    label: 'OurStory',
    icon: <BookOpen size={24} strokeWidth={1.5} />,
    href: '/notre-histoire',
  },
];

export default function CommandDock() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const dockRef = useRef<HTMLDivElement>(null);
  const itemRefsMap = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const calculateMagneticPull = (item: DockItem, mousePos: { x: number; y: number }) => {
    if (hoveredId !== item.id) return { x: 0, y: 0 };

    const itemElement = itemRefsMap.current.get(item.id);
    if (!itemElement) return { x: 0, y: 0 };

    const rect = itemElement.getBoundingClientRect();
    const itemCenterX = rect.left + rect.width / 2;
    const itemCenterY = rect.top + rect.height / 2;

    const dx = mousePos.x - itemCenterX;
    const dy = mousePos.y - itemCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const magneticRange = 150;
    if (distance > magneticRange) return { x: 0, y: 0 };

    const strength = (1 - distance / magneticRange) * 12;
    const normalizedDx = dx / distance;
    const normalizedDy = dy / distance;

    return {
      x: normalizedDx * strength,
      y: normalizedDy * strength,
    };
  };

  return (
    <div ref={dockRef} className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50">
      {/* Main dock container with glassmorphism */}
      <motion.div
        className="relative backdrop-blur-xl bg-[#070B19]/60 border-l border-[#94B3DB]/25 rounded-l-3xl shadow-2xl will-change-transform"
        animate={{
          borderColor: hoveredId
            ? 'rgba(148, 179, 219, 0.6)'
            : 'rgba(148, 179, 219, 0.25)',
          boxShadow: hoveredId
            ? '0 0 40px rgba(148, 179, 219, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
            : '0 0 20px rgba(148, 179, 219, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        {/* Navigation items grid */}
        <div className="flex flex-col items-center justify-center gap-6 py-10 px-4 w-20">
          {dockItems.map((item) => {
            const magneticPull = calculateMagneticPull(item, mousePosition);

            return (
              <div
                key={item.id}
                ref={(el) => {
                  if (el) itemRefsMap.current.set(item.id, el);
                }}
                className="relative w-12 h-12"
              >
                {/* Magnetic pull container */}
                <motion.div
                  animate={{
                    x: magneticPull.x,
                    y: magneticPull.y,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 250,
                    damping: 18,
                    mass: 1,
                  }}
                  className="w-full h-full"
                >
                  <Link href={item.href} className="block w-full h-full">
                    <motion.button
                      className="relative w-full h-full flex items-center justify-center rounded-xl text-[#94B3DB] cursor-pointer focus:outline-none"
                      onMouseEnter={() => setHoveredId(item.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.96 }}
                      animate={{
                        backgroundColor:
                          hoveredId === item.id
                            ? 'rgba(148, 179, 219, 0.12)'
                            : 'rgba(148, 179, 219, 0)',
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Icon with glow effect */}
                      <motion.div
                        animate={{
                          scale: hoveredId === item.id ? 1.2 : 1,
                          filter:
                            hoveredId === item.id
                              ? 'drop-shadow(0 0 10px rgba(148, 179, 219, 0.7))'
                              : 'drop-shadow(0 0 0px rgba(148, 179, 219, 0))',
                        }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className={hoveredId === item.id ? "text-white" : "text-[#94B3DB]"}
                      >
                        {item.icon}
                      </motion.div>

                      {/* Hover border glow */}
                      {hoveredId === item.id && (
                        <motion.div
                          className="absolute inset-0 rounded-xl border border-[#94B3DB]/40 pointer-events-none"
                          animate={{
                            opacity: [0.4, 0.8, 0.4],
                            boxShadow: [
                              'inset 0 0 12px rgba(148, 179, 219, 0.2)',
                              'inset 0 0 24px rgba(148, 179, 219, 0.4)',
                              'inset 0 0 12px rgba(148, 179, 219, 0.2)',
                            ],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                      )}
                    </motion.button>
                  </Link>
                </motion.div>

                {/* Floating glass micro-card tooltip */}
                <motion.div
                  initial={{ opacity: 0, x: 16, scale: 0.92 }}
                  animate={{
                    opacity: hoveredId === item.id ? 1 : 0,
                    x: hoveredId === item.id ? -110 : 16,
                    scale: hoveredId === item.id ? 1 : 0.92,
                  }}
                  transition={{
                    duration: 0.35,
                    type: 'spring',
                    stiffness: 350,
                    damping: 25,
                    mass: 0.8,
                  }}
                  className="absolute right-full top-1/2 -translate-y-1/2 mr-3 pointer-events-none"
                >
                  <div className="relative group">
                    {/* Glass card with blur background */}
                    <div className="backdrop-blur-lg bg-[#04060F]/80 border border-[#94B3DB]/40 rounded-2xl px-4 py-3 shadow-2xl relative z-10">
                      {/* Label text */}
                      <motion.p
                        className="text-xs font-bold text-white whitespace-nowrap tracking-widest uppercase"
                        animate={{
                          letterSpacing: hoveredId === item.id ? '0.16em' : '0.08em',
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.label}
                      </motion.p>

                      {/* Animated glow background inside card */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl -z-10"
                        animate={{
                          boxShadow: [
                            '0 0 0px rgba(148, 179, 219, 0)',
                            '0 0 20px rgba(148, 179, 219, 0.4)',
                            '0 0 0px rgba(148, 179, 219, 0)',
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    </div>

                    {/* Arrow pointer */}
                    <motion.div
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1.5"
                      style={{
                        width: 0,
                        height: 0,
                        borderLeft: '8px solid rgba(148, 179, 219, 0.4)',
                        borderTop: '5px solid transparent',
                        borderBottom: '5px solid transparent',
                      }}
                      animate={{
                        opacity: hoveredId === item.id ? 1 : 0,
                      }}
                    />
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Bottom decorative accent line */}
        <motion.div
          className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-[#94B3DB]/50 to-transparent rounded-full"
          animate={{
            opacity: hoveredId ? 0.7 : 0.2,
            boxShadow: hoveredId
              ? '0 0 10px rgba(148, 179, 219, 0.6)'
              : '0 0 0px rgba(148, 179, 219, 0)',
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Ambient glow backdrop */}
      <motion.div
        className="absolute inset-0 rounded-l-3xl blur-3xl pointer-events-none"
        animate={{
          backgroundColor: hoveredId
            ? 'rgba(148, 179, 219, 0.12)'
            : 'rgba(148, 179, 219, 0.04)',
          opacity: hoveredId ? 1 : 0.6,
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      />
    </div>
  );
}