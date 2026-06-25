'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
// هنا تسوي استيراد لمكون الـ Splash Screen اللي انت مسويه
// import SplashScreen from './SplashScreen'; 

export default function SplashScreenManager({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // نشيك في ذاكرة المتصفح المؤقتة: هل العميل شاف الافتتاحية؟
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash_AOUJ');

    if (hasSeenSplash) {
      // لو شافها، نلغي الافتتاحية فوراً
      setShowSplash(false);
    } else {
      // لو أول مرة يدخل الموقع، نخليها تظهر، وبعدها نسجل إنه شافها
      // غير الرقم 3500 (3 ثواني ونصف) حسب مدة الانيميشن بتاعك
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem('hasSeenSplash_AOUJ', 'true'); // تسجيل في الذاكرة
      }, 3500); 

      return () => clearTimeout(timer);
    }
  }, []);

  // لمنع مشاكل الـ Hydration في Next.js
  if (!isMounted) return null;

  return (
    <>
      {/* هنا نعرض الـ Splash Screen لو كان showSplash يساوي true */}
      <AnimatePresence mode="wait">
        {showSplash && (
           <div className="fixed inset-0 z-[9999]">
             {/* حط مكون الـ Splash Screen بتاعك هنا */}
             {/* <SplashScreen /> */}
           </div>
        )}
      </AnimatePresence>

      {/* محتوى الموقع الأساسي (الصفحات) يظل موجود في الخلفية عشان السيو والسرعة */}
      {children}
    </>
  );
}