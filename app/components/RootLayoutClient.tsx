'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SplashScreen from './SplashScreen';
import CommandDock from './CommandDock';

interface RootLayoutClientProps {
  children: ReactNode;
}

const SHOW_ONCE_PER_SESSION = false; 

const SPLASH_DURATION_MS: number = 8000;
const FADE_OUT_DURATION_S: number = 1;
const SPLASH_STORAGE_KEY: string = 'splash_shown';

export default function RootLayoutClient({
  children,
}: RootLayoutClientProps): React.ReactElement {
  
  const [status, setStatus] = useState<'mounting' | 'splash' | 'ready'>('mounting');

  useEffect(() => {
    if (SHOW_ONCE_PER_SESSION) {
      const splashAlreadyShown = sessionStorage.getItem(SPLASH_STORAGE_KEY);
      if (splashAlreadyShown) {
        setStatus('ready');
        return;
      }
    }

    setStatus('splash');

    const splashTimer = setTimeout(() => {
      if (SHOW_ONCE_PER_SESSION) {
        sessionStorage.setItem(SPLASH_STORAGE_KEY, 'true');
      }
      setStatus('ready');
    }, SPLASH_DURATION_MS);

    return () => clearTimeout(splashTimer);
  }, []);

  const handleSplashComplete = (): void => {
    if (SHOW_ONCE_PER_SESSION) {
      sessionStorage.setItem(SPLASH_STORAGE_KEY, 'true');
    }
    setStatus('ready');
  };

  if (status === 'mounting') {
    return <div className="w-full h-screen bg-[#070B19]" />;
  }

  return (
    <div className="relative w-full min-h-screen bg-[#070B19]">
      <AnimatePresence mode="wait">
        {status === 'splash' ? (
          <motion.div
            key="splash-screen"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: FADE_OUT_DURATION_S, ease: 'easeInOut' },
            }}
            className="fixed inset-0 z-50 w-full h-screen"
          >
            <SplashScreen onLoadingComplete={handleSplashComplete} />
          </motion.div>
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: FADE_OUT_DURATION_S, ease: 'easeInOut' },
            }}
            className="relative w-full min-h-screen bg-[#070B19]"
          >
            <CommandDock />
            <main className="w-full min-h-screen relative z-10">{children}</main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}