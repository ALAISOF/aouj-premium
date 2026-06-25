'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '500', '700', '900'] });

// --- داتا القصة والتاريخ (مطابقة حرفياً لدفتر التحملات الصفحات 5 و 6) ---
const historyData = [
  {
    year: "1978",
    title: "LA FONDATION",
    description: "Fondation à Zagora par Haj Mohamed Ouhaddou & Youssef Ouhaddou. Début de l'aventure avec seulement 2 véhicules 4x4 Santana.",
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2070&auto=format&fit=crop"
  },
  {
    year: "1986",
    title: "L'EXPANSION",
    description: "Une étape cruciale dans notre développement stratégique avec l'ouverture de notre tout premier bureau à Marrakech.",
    image: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?q=80&w=2070&auto=format&fit=crop" // صورة لمراكش
  },
  {
    year: "1990",
    title: "LA DIVERSIFICATION",
    description: "Adaptation aux nouveaux besoins du marché et diversification de notre offre avec l'ajout d'une flotte de minibus.",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2070&auto=format&fit=crop"
  },
  {
    year: "2002",
    title: "CAPACITÉ MAXIMALE",
    description: "Intégration de véhicules grande capacité de 36 et 48 places pour les groupes, et ouverture d'une nouvelle agence à Ouarzazate.",
    image: "https://images.unsplash.com/photo-1538964173425-93884d739596?q=80&w=2070&auto=format&fit=crop"
  },
  {
    year: "2012",
    title: "L'ÈRE DU PREMIUM",
    description: "Investissement massif dans le confort de nos passagers avec l'acquisition de Mercedes Vito et SsangYong.",
    image: "/morocco.jpg"
  },
  {
    year: "2018",
    title: "INNOVATION TECHNOLOGIQUE",
    description: "Intégration du WiFi à bord de tous nos véhicules et déploiement d'un logiciel de gestion logistique ultra-avancé.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    year: "2020",
    title: "ENGAGEMENT SOLIDAIRE",
    description: "Mobilisation totale lors de la pandémie COVID-19 : transport solidaire pour les malades, le personnel médical et la distribution de vaccins.",
    image: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?q=80&w=2083&auto=format&fit=crop"
  }
];

export default function OurHistoryPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start start", "end end"] 
  });
  
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const rawIndex = Math.floor(latest * historyData.length);
    const index = Math.min(rawIndex, historyData.length - 1);
    if (index !== activeIndex && index >= 0) {
      setActiveIndex(index);
    }
  });

  return (
    <main className={`bg-[#070B19] min-h-screen text-white selection:bg-[#94B3DB] selection:text-[#070B19] ${montserrat.className}`}>
      
      {/* مقدمة الصفحة */}
      <section className="h-[60vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
        <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#94B3DB]/50 to-transparent"></div>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
          className="text-[#94B3DB] text-xs font-bold tracking-[0.5em] uppercase mb-6"
        >
          Notre Héritage
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-7xl font-black uppercase tracking-tight"
        >
          L'Histoire d'<span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">AOUJ</span>
        </motion.h1>
        <motion.div 
           initial={{ height: 0 }} animate={{ height: "60px" }} transition={{ duration: 1, delay: 1 }}
           className="w-[1px] bg-gradient-to-b from-[#94B3DB] to-transparent mt-12"
        />
      </section>

      {/* القسم التفاعلي (تم زيادة الارتفاع إلى 700vh ليناسب 7 أحداث) */}
      <section ref={containerRef} className="relative h-[700vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <img 
                src={historyData[activeIndex].image} 
                alt={historyData[activeIndex].title}
                className="w-full h-full object-cover filter brightness-[0.3] contrast-[1.1]" 
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#070B19]/80 via-transparent to-[#070B19]/90"></div>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-20 z-20">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="max-w-4xl"
                >
                  <div className="relative">
                    <span className="text-[8rem] md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
                      {historyData[activeIndex].year}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-white relative z-10 uppercase tracking-widest mb-6">
                      {historyData[activeIndex].title}
                    </h2>
                  </div>
                  <div className="bg-[#070B19]/40 backdrop-blur-md border border-[#94B3DB]/10 p-8 rounded-xl shadow-[0_0_50px_rgba(148,179,219,0.1)] relative z-10 mx-auto max-w-2xl">
                    <p className="text-lg md:text-xl text-gray-300 font-medium leading-relaxed">
                      {historyData[activeIndex].description}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* مؤشر النزول الجانبي */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-30 hidden md:flex">
            {historyData.map((_, idx) => (
              <div 
                key={idx} 
                className={`w-2 transition-all duration-500 rounded-full ${activeIndex === idx ? 'h-12 bg-[#94B3DB] shadow-[0_0_15px_rgba(148,179,219,0.8)]' : 'h-2 bg-[#94B3DB]/20'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* نهاية الصفحة للتمهيد للفوتر */}
      <section className="h-[40vh] flex items-center justify-center bg-[#070B19] relative z-20">
         <h3 className="text-2xl md:text-4xl font-bold text-[#94B3DB] text-center px-4">
           Le voyage continue...
         </h3>
      </section>

      {/* --- الفوتر (Footer) --- */}
      <footer className="bg-[#040712] border-t border-white/5 pt-20 pb-10 px-6 md:px-16 relative z-50">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pb-16">
            
            {/* الشعار والوصف */}
            <div className="flex flex-col space-y-6">
              <div className="flex items-center gap-2">
                <img src="/logo_logon.png" alt="AOUJ VIP Transport" className="h-25 w-auto mb-6" />
              </div>
              <p className="text-gray-400 text-sm font-light leading-relaxed max-w-sm">
                L'infrastructure technologique et logistique au service du transport VIP. Opérant sur l'ensemble du Royaume du Maroc avec une précision chirurgicale.
              </p>
              <div className="flex gap-3 pt-2">
                <a href="#" className="w-9 h-9 border border-white/10 flex items-center justify-center text-xs font-bold text-white hover:border-[#94B3DB] hover:text-[#94B3DB] transition-all rounded-[2px]">IN</a>
                <a href="#" className="w-9 h-9 border border-white/10 flex items-center justify-center text-xs font-bold text-white hover:border-[#94B3DB] hover:text-[#94B3DB] transition-all rounded-[2px]">X</a>
              </div>
            </div>
            
            {/* الأنظمة */}
            <div className="flex flex-col space-y-4 md:pl-12">
              <h4 className="text-xs font-bold tracking-[0.2em] text-white uppercase mb-2">Systèmes</h4>
              <ul className="space-y-3 text-sm text-gray-400 font-light">
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span>•</span> Portail Réservation</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span>•</span> Base Documentaire (FAQ)</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span>•</span> Notre Histoire</a></li>
              </ul>
            </div>
            
            {/* مركز القيادة */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-xs font-bold tracking-[0.2em] text-white uppercase mb-2">Centre de Commande</h4>
              <ul className="space-y-3 text-sm font-light">
                <li className="text-gray-400">Casablanca, Maroc</li>
                <li className="text-white font-bold tracking-wide">+212 500 000 000</li>
                <li><a href="mailto:vip@aouj-transport.com" className="text-gray-400 hover:text-[#94B3DB] underline underline-offset-4 transition-colors">vip@aouj-transport.com</a></li>
              </ul>
            </div>
            
          </div>

          {/* الشريط السفلي للحقوق */}
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-gray-500 tracking-wider">
            <div>
              © 2026 AOUJ VIP TRANSPORT. SECURE NETWORK.
            </div>
            <div className="flex gap-6 uppercase font-medium">
              <a href="#" className="hover:text-white transition-colors">Confidentialité (NDA)</a>
              <a href="#" className="hover:text-white transition-colors">CGU</a>
            </div>
          </div>
          
        </div>
      </footer>

    </main>
  );
}