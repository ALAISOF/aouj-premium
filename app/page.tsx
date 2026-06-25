'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Montserrat } from 'next/font/google';

// --- Configuration VIP Typography ---
const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '500', '700', '900'] });

// --- Animation Core Variants ---
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const textReveal = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

// --- Navigation ---
const FloatingSideNav = () => (
  <motion.div 
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1, delay: 1 }}
    className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-6 bg-[#070B19]/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-[0_0_30px_rgba(148,179,219,0.1)]"
  >
    <a href="#hero" className="text-gray-500 hover:text-[#94B3DB] transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg></a>
    <a href="#about" className="text-gray-500 hover:text-[#94B3DB] transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg></a>
    <a href="#flotte" className="text-gray-500 hover:text-[#94B3DB] transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg></a>
    <a href="#contact-us" className="text-gray-500 hover:text-[#94B3DB] transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477-4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg></a>
  </motion.div>
);

// --- Sections ---
const HeroSciFi = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-[#070B19]">
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#070B19]/70 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop" 
          alt="Premium Transport" 
          className="w-full h-[120%] object-cover scale-105 filter brightness-50 contrast-125 grayscale-[30%]"
        />
      </motion.div>
      
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-20 text-center px-4 max-w-6xl mx-auto mt-24"
      >
        <motion.h1 variants={textReveal} className="text-5xl md:text-[5.5rem] font-black tracking-tight mb-4 leading-[1.1] uppercase text-white drop-shadow-2xl">
          LA MEILLEURE FAÇON DE <br/>
          <span className="text-[#94B3DB] drop-shadow-[0_0_30px_rgba(148,179,219,0.4)]">
            VOYAGER À TRAVERS LE MAROC
          </span>
        </motion.h1>
        
        <motion.p variants={textReveal} className="text-lg md:text-xl text-[#C2CFE0] mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
          Services de transport premium, discrétion absolue et confort inégalé <br className="hidden md:block"/> pour vos déplacements d'affaires et excursions privées.
        </motion.p>
        
        <motion.div variants={textReveal} className="flex flex-col sm:flex-row gap-6 justify-center">
          <a href="#contact-us" className="px-10 py-4 bg-[#94B3DB] hover:bg-[#C2CFE0] text-[#070B19] text-sm font-black tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(148,179,219,0.2)] hover:shadow-[0_0_40px_rgba(194,207,224,0.5)] rounded-sm">
            RÉSERVER MAINTENANT
          </a>
          <a href="/Fleet" className="px-10 py-4 bg-transparent border border-[#94B3DB]/50 text-[#94B3DB] hover:bg-[#94B3DB]/10 hover:border-[#94B3DB] text-sm font-bold tracking-widest transition-all duration-300 rounded-sm backdrop-blur-md">
            DÉCOUVRIR NOTRE FLOTTE
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

const SectionAPropos = () => (
  <section id="about" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative">
    <div className="grid md:grid-cols-2 gap-16 items-center">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
        <motion.div variants={textReveal} className="flex items-center gap-4 mb-6">
          <div className="w-12 h-[1px] bg-[#94B3DB]"></div>
          <h2 className="text-sm tracking-[0.4em] text-[#94B3DB] font-bold uppercase">À Propos De Nous</h2>
        </motion.div>
        <motion.h3 variants={textReveal} className="text-4xl md:text-5xl font-black mb-8 leading-tight text-white">
          L'EXCELLENCE EN MOUVEMENT.
        </motion.h3>
        <motion.p variants={textReveal} className="text-[#94A3B8] font-medium text-lg leading-relaxed mb-6">
          AOUJ redéfinit les codes du transport de luxe au Maroc. Plus qu'un simple trajet, nous concevons des expériences de mobilité sur-mesure, alliant technologie de pointe et protocole VIP.
        </motion.p>
        <motion.div variants={textReveal} className="grid grid-cols-2 gap-8 mt-12 border-t border-white/10 pt-8">
          <div>
            <div className="text-4xl font-black text-[#94B3DB] mb-2">100%</div>
            <div className="text-xs text-[#64748B] uppercase tracking-widest font-bold">Discrétion (NDA)</div>
          </div>
          <div>
            <div className="text-4xl font-black text-[#94B3DB] mb-2">24/7</div>
            <div className="text-xs text-[#64748B] uppercase tracking-widest font-bold">Support Dédié</div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" }} className="relative group">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#94B3DB]/10 to-transparent blur-[100px] group-hover:blur-[120px] transition-all duration-700"></div>
        <div className="relative border border-white/10 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2115&auto=format&fit=crop" alt="Interior" className="w-full h-[600px] object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 grayscale-[20%]" />
        </div>
      </motion.div>
    </div>
  </section>
);

// --- Expanded Services Gallery Component (Page 4: 3 Visuals Required) ---
const SectionServices = () => (
  <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-20">
      <motion.h2 variants={textReveal} className="text-sm tracking-[0.4em] text-[#94B3DB] font-bold uppercase mb-4">Nos Services</motion.h2>
      <motion.h3 variants={textReveal} className="text-4xl md:text-5xl font-black text-white">SOLUTIONS SUR-MESURE</motion.h3>
    </motion.div>
    
    <div className="grid md:grid-cols-3 gap-6">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-[#0A1024] border border-white/5 p-10 hover:border-[#94B3DB]/50 transition-colors group shadow-lg">
        <div className="text-[#94B3DB] mb-6">
           <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <h4 className="text-2xl font-bold text-white mb-4">Excursions Privées</h4>
        <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">Découvrez le Maroc dans un confort absolu. Des circuits sur-mesure de Marrakech au Désert, conçus pour les voyageurs les plus exigeants.</p>
        <a href="/Excursions" className="text-sm text-[#94B3DB] font-bold tracking-widest uppercase flex items-center gap-2 group-hover:translate-x-2 transition-transform">Explorer <span className="text-lg">→</span></a>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-[#0A1024] border border-white/5 p-10 hover:border-[#94B3DB]/50 transition-colors group shadow-lg">
        <div className="text-[#94B3DB] mb-6">
           <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
        </div>
        <h4 className="text-2xl font-bold text-white mb-4">Transferts & Business</h4>
        <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">Transferts aéroportuaires et mise à disposition pour vos réunions d'affaires. Ponctualité rigoureuse et Wi-Fi haut débit à bord.</p>
        <a href="/Excursions" className="text-sm text-[#94B3DB] font-bold tracking-widest uppercase flex items-center gap-2 group-hover:translate-x-2 transition-transform">Détails <span className="text-lg">→</span></a>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-[#0A1024] border border-white/5 p-10 hover:border-[#94B3DB]/50 transition-colors group shadow-lg">
        <div className="text-[#94B3DB] mb-6">
           <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
        </div>
        <h4 className="text-2xl font-bold text-white mb-4">Voyages de Groupe</h4>
        <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">Prise en charge logistique complète pour délégations, événements d'envergure et circuits touristiques à haute capacité.</p>
        <a href="/Excursions" className="text-sm text-[#94B3DB] font-bold tracking-widest uppercase flex items-center gap-2 group-hover:translate-x-2 transition-transform">Découvrir <span className="text-lg">→</span></a>
      </motion.div>
    </div>
  </section>
);

// --- Points Forts Section Component (Page 4) ---
const SectionPointsForts = () => {
  const items = [
    { title: "Confiance des voyageurs", desc: "Un protocole strict de sécurité et de discrétion totale (NDA) pour tous nos clients." },
    { title: "Réservation simple", desc: "Une interface fluide et instantanée pour planifier et valider vos trajets en quelques clics." },
    { title: "Plateforme intelligente", desc: "Suivi GPS en temps réel et réadaptation de l'itinéraire de manière dynamique." }
  ];

  return (
    <section className="py-24 bg-[#04060F] border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-3 gap-12">
          {items.map((item, idx) => (
            <div key={idx} className="relative pl-8 border-l border-[#94B3DB]/20">
              <div className="absolute top-0 left-0 w-2 h-2 bg-[#94B3DB] rounded-full -translate-x-[4.5px]"></div>
              <h4 className="text-lg font-bold text-white mb-3 uppercase tracking-wider">{item.title}</h4>
              <p className="text-sm text-[#94A3B8] leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const fleetData = [
  {
    id: "01",
    title: "Minibus",
    subtitle: "Confort et élégance pour les petits groupes",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2070&auto=format&fit=crop",
    vehicles: [
      { name: "Mercedes Vito", seats: "7 - 9 Places", desc: "Discret, élégant et agile — idéal pour les transferts VIP." },
      { name: "Ford Transit", seats: "8 - 17 Places", desc: "Spacieux et polyvalent, réunit les groupes de taille moyenne." }
    ]
  },
  {
    id: "02",
    title: "Mercedes Sprinter",
    subtitle: "Polyvalence et prestige pour chaque mission",
    image: "https://images.unsplash.com/photo-1557223562-6c77ef16210f?q=80&w=2070&auto=format&fit=crop", 
    vehicles: [
      { name: "Sprinter VIP", seats: "07 Places", desc: "La configuration VIP ultime dans un espace privé." },
      { name: "Sprinter Mid", seats: "17 Places", desc: "Le parfait équilibre entre intimité et capacité." },
      { name: "Sprinter Max", seats: "20 Places", desc: "Une convivialité maximale sans compromettre le confort." }
    ]
  },
  {
    id: "03",
    title: "4WD · 4x4",
    subtitle: "Aventure et luxe, sans compromis",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop",
    vehicles: [
      { name: "Mitsubishi Pajero", seats: "Circuit", desc: "Robuste et infatigable, conquiert chaque terrain." },
      { name: "Toyota Land Cruiser", seats: "Circuit", desc: "L'icône du tout-terrain — puissance et fiabilité." },
      { name: "Toyota Prado", seats: "Circuit", desc: "Alliant luxe et performances tout-terrain." }
    ]
  },
  {
    id: "04",
    title: "Autocars VIP",
    subtitle: "Explorez nos bus pour la grande échelle",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop",
    vehicles: [
      { name: "Premium Bus S", seats: "30 Places", desc: "Confort régional." },
      { name: "Premium Bus M", seats: "40 Places", desc: "Voyages nationaux." },
      { name: "Premium Bus L", seats: "50 Places", desc: "Idéal pour les longs trajets." },
      { name: "Irizar Edition", seats: "54 Places", desc: "Capacité maximale avec un confort optimal." }
    ]
  }
];

const SectionFlotteInteractive = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const rawIndex = Math.floor(latest * fleetData.length);
    const index = Math.min(rawIndex, fleetData.length - 1);
    if (index !== activeIndex && index >= 0) {
      setActiveIndex(index);
    }
  });

  return (
    <section id="flotte" ref={containerRef} className="relative h-[400vh] bg-[#04060F]">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden px-6 md:px-12 max-w-7xl mx-auto">
        
        <div className="mb-12 relative z-20">
          <h2 className="text-sm tracking-[0.4em] text-[#94B3DB] font-bold uppercase mb-4">Notre Flotte</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white">UN VÉHICULE POUR CHAQUE HORIZON.</h3>
        </div>

        <div className="relative w-full h-[60vh] md:h-[550px] border border-white/5 bg-[#070B19] overflow-hidden rounded-xl shadow-[0_0_50px_rgba(4,6,15,0.8)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col md:flex-row"
            >
              <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#070B19] via-[#070B19]/50 to-transparent z-10"></div>
                <img 
                  src={fleetData[activeIndex].image} 
                  alt={fleetData[activeIndex].title} 
                  className="w-full h-full object-cover filter brightness-[0.4] grayscale-[20%] group-hover:scale-105 transition-transform duration-[1.5s]"
                />
                
                <div className="absolute bottom-10 left-10 z-20 pr-4">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-[5rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-[#C2CFE0] to-[#64748B] leading-none">
                      {fleetData[activeIndex].id}
                    </span>
                    <h4 className="text-[2rem] font-bold text-white tracking-tight leading-tight mt-4">
                      {fleetData[activeIndex].title}
                    </h4>
                  </div>
                  <p className="text-[#94B3DB] text-base font-medium tracking-wide mt-1">
                    {fleetData[activeIndex].subtitle}
                  </p>
                </div>
              </div>

              <div className="w-full md:w-1/2 h-1/2 md:h-full p-8 md:p-12 bg-[#070B19] flex flex-col justify-center overflow-y-auto">
                <div className="space-y-8">
                  {fleetData[activeIndex].vehicles.map((v, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + (idx * 0.1) }}
                      className="border-l-[3px] border-[#94B3DB]/20 hover:border-[#94B3DB] pl-6 transition-colors group"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="text-xl font-bold text-white">{v.name}</h5>
                        <span className="text-xs bg-[#94B3DB]/10 px-3 py-1 rounded-sm text-[#94B3DB] font-bold tracking-wider">{v.seats}</span>
                      </div>
                      <p className="text-sm text-[#94A3B8] leading-relaxed font-medium group-hover:text-[#C2CFE0] transition-colors">
                        {v.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute right-6 top-1/2 -translate-y-1/2 h-48 w-[2px] bg-white/5 rounded-full hidden md:block">
          <motion.div 
            className="w-full bg-[#94B3DB] rounded-full origin-top shadow-[0_0_10px_rgba(148,179,219,0.5)]"
            style={{ scaleY: scrollYProgress }}
          />
        </div>
      </div>
    </section>
  );
};

const PourquoiNous = () => {
  const points = [
    { titre: "SÉCURITÉ & NDA", desc: "Traitement confidentiel de vos données de vol et itinéraires." },
    { titre: "CHAUFFEURS CERTIFIÉS", desc: "Profils bilingues, formés au pilotage défensif et protocole VIP." },
    { titre: "TECHNOLOGIE EMBARQUÉE", desc: "Suivi GPS temps réel, connectivité 5G et gestion via plateforme intelligente." }
  ];

  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-20 items-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          <motion.h2 variants={textReveal} className="text-sm tracking-[0.4em] text-[#94B3DB] font-bold uppercase mb-4">Pourquoi Choisir AOUJ</motion.h2>
          <motion.h3 variants={textReveal} className="text-4xl md:text-5xl font-black mb-12 text-white">FIABILITÉ ABSOLUE.</motion.h3>
          <div className="space-y-8">
            {points.map((pt, i) => (
              <motion.div variants={textReveal} key={i} className="flex gap-6 group">
                <div className="w-16 h-16 flex-shrink-0 bg-[#070B19] border border-white/10 flex items-center justify-center text-[#64748B] group-hover:border-[#94B3DB] group-hover:text-[#94B3DB] transition-all duration-300">
                  <span className="font-black text-2xl">0{i+1}</span>
                </div>
                <div className="pt-2">
                  <h4 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">{pt.titre}</h4>
                  <p className="text-[#94A3B8] font-medium text-sm leading-relaxed">{pt.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative h-[600px]">
          <div className="absolute inset-0 bg-[#94B3DB]/10 blur-[100px] z-0"></div>
          <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover relative z-10 border border-white/10 filter contrast-125 grayscale-[20%]" alt="Professionalisme" />
        </motion.div>
      </div>
    </section>
  );
};

// --- Updated FAQ Component (Page 4: 5 Questions + Email Required) ---
const SectionFAQ = () => {
  const [active, setActive] = useState<number | null>(0);
  const faqs = [
    { q: "COMMENT SÉCURISER UNE RÉSERVATION VIP ?", a: "Notre portail digital permet une réservation immédiate et chiffrée. Une équipe dédiée prend le relais pour personnaliser chaque détail du protocole." },
    { q: "QUELS SONT VOS PROTOCOLES DE CONFIDENTIALITÉ ?", a: "Chaque membre de notre personnel est lié par un accord de non-divulgation (NDA). Les données clients sont stockées sur des serveurs chiffrés." },
    { q: "EST-IL POSSIBLE DE MODIFIER L'ITINÉRAIRE EN TEMPS RÉEL ?", a: "Affirmatif. Nos plateformes logistiques permettent une adaptation dynamique de l'itinéraire selon vos exigences de dernière minute." },
    { q: "QUELS TYPES DE VÉHICULES PROPOSEZ-VOUS ?", a: "Notre flotte comprend des minibus premium (Mercedes Vito, Ford Transit), des Mercedes Sprinter configurés en salon VIP, des 4x4 tout-terrain et des autocars de luxe de grande capacité." },
    { q: "COUVREZ-VOUS TOUT LE ROYAUME DU MAROC ?", a: "Oui, nous opérons sur l'ensemble du territoire national avec des agences stratégiques à Casablanca, Marrakech, Agadir, Ouarzazate, Zagora et Erfoud." }
  ];

  return (
    <section className="py-32 bg-[#04060F] border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-sm tracking-[0.4em] text-[#94B3DB] font-bold uppercase mb-4">Support</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white">BASE DE CONNAISSANCES</h3>
          <p className="text-sm text-[#94A3B8] mt-4 font-medium">
            Pour toute autre question, contactez notre équipe sur : <a href="mailto:vip@aouj-transport.com" className="text-[#94B3DB] underline">vip@aouj-transport.com</a>
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-white/10 bg-[#070B19] overflow-hidden transition-all duration-300">
              <button onClick={() => setActive(active === i ? null : i)} className="w-full px-8 py-6 flex justify-between items-center text-left hover:bg-white/[0.03]">
                <span className="text-sm md:text-base text-white font-bold tracking-wide">{faq.q}</span>
                <span className={`text-[#94B3DB] text-xl font-light transition-transform duration-500 ${active === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              <AnimatePresence>
                {active === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className="px-8 pb-6 text-[#94A3B8] text-sm font-medium leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- CTA Final / Banner Component (Page 4) ---
const CTAFinalBanner = () => (
  <section className="py-20 relative overflow-hidden bg-gradient-to-r from-[#0A1024] to-[#04060F] border-t border-white/5 text-center">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(148,179,219,0.05)_0%,transparent_70%)]"></div>
    <div className="max-w-4xl mx-auto px-6 relative z-10">
      <h3 className="text-3xl md:text-4xl font-black text-white uppercase mb-6 tracking-wide">
        Prêt à planifier votre prochain déplacement ?
      </h3>
      <p className="text-gray-400 max-w-xl mx-auto mb-8 text-sm font-medium">
        Remplissez le protocole de demande ci-dessous. Nos répartiteurs traiteront votre demande avec la plus haute priorité.
      </p>
      <a href="#contact-us" className="inline-block px-8 py-3 bg-transparent border border-[#94B3DB] text-[#94B3DB] text-xs font-bold tracking-widest uppercase hover:bg-[#94B3DB] hover:text-[#070B19] transition-all duration-300">
        Ouvrir le Formulaire
      </a>
    </div>
  </section>
);

// --- Formulaire de Contact Compliant Component (#contact-us) ---
const FormulaireContact = () => {
  const [formData, setFormData] = useState({
    nomComplet: '',
    email: '',
    telephone: '',
    objet: 'Réservation VIP',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.nomComplet.trim()) tempErrors.nomComplet = 'Le nom complet est obligatoire.';
    if (!formData.email.trim()) {
      tempErrors.email = "L'adresse e-mail est obligatoire.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "L'adresse e-mail n'est pas valide.";
    }
    if (!formData.objet) tempErrors.objet = "L'objet est obligatoire.";
    if (!formData.message.trim()) tempErrors.message = 'Le message est obligatoire.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('submitting');

    // 1. تجميع البيانات في FormData عشان يتقبلها Google Apps Script
    const submitData = new FormData();
    submitData.append('nomComplet', formData.nomComplet);
    submitData.append('email', formData.email);
    submitData.append('telephone', formData.telephone);
    submitData.append('objet', formData.objet);
    submitData.append('message', formData.message);

    try {
      // 2. حط رابط الـ Web App اللي نسخته من جوجل هنا 👇
      const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxDN2E3Rn47kwTxdWSIZ-KwqSoCGacixopTu2JCGNIqWz--VsBy6mPHz8JNkoicZLsN/exec"; 

      // 3. إرسال الطلب لقاعدة بيانات جوجل
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: submitData,
        mode: 'no-cors' // مهم جداً عشان نتفادى خطأ CORS في المتصفح
      });

      // 4. إظهار رسالة النجاح وتفريغ الحقول
      setStatus('success');
      setFormData({ nomComplet: '', email: '', telephone: '', objet: 'Réservation VIP', message: '' });
      
      // إخفاء رسالة النجاح بعد 5 ثواني
      setTimeout(() => setStatus('idle'), 5000);

    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      setStatus('error');
    }
  };

  return (
    <section id="contact-us" className="py-32 bg-[#070B19] border-t border-white/5 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm tracking-[0.4em] text-[#94B3DB] font-bold uppercase mb-4">Contact</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white uppercase">Formulaire de Demande</h3>
        </div>

        <div className="bg-[#0A1024] border border-white/5 p-8 md:p-12 shadow-2xl relative">
          
          <AnimatePresence>
            {status === 'success' && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium rounded-sm flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>Votre message a été envoyé avec succès ! Notre équipe VIP vous contactera sous peu.</span>
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-8 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-medium rounded-sm flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>Une erreur est survenue lors de l'envoi. Veuillez réessayer.</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Nom Complet *</label>
                <input 
                  type="text" 
                  name="nomComplet"
                  value={formData.nomComplet}
                  onChange={handleChange}
                  className={`w-full bg-[#070B19] border ${errors.nomComplet ? 'border-rose-500/50' : 'border-white/10'} focus:border-[#94B3DB] px-4 py-3 text-white text-sm outline-none transition-colors`}
                  placeholder="Haj Mohamed"
                />
                {errors.nomComplet && <p className="text-rose-400 text-xs mt-1 font-medium">{errors.nomComplet}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Adresse E-mail *</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-[#070B19] border ${errors.email ? 'border-rose-500/50' : 'border-white/10'} focus:border-[#94B3DB] px-4 py-3 text-white text-sm outline-none transition-colors`}
                  placeholder="vip@aouj-transport.com"
                />
                {errors.email && <p className="text-rose-400 text-xs mt-1 font-medium">{errors.email}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Numéro de Téléphone (Optionnel)</label>
                <input 
                  type="tel" 
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className="w-full bg-[#070B19] border border-white/10 focus:border-[#94B3DB] px-4 py-3 text-white text-sm outline-none transition-colors"
                  placeholder="+212 600 000 000"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Objet *</label>
                <select 
                  name="objet"
                  value={formData.objet}
                  onChange={handleChange}
                  className="w-full bg-[#070B19] border border-white/10 focus:border-[#94B3DB] px-4 py-3 text-white text-sm outline-none transition-colors appearance-none"
                >
                  <option value="Réservation VIP">Réservation VIP</option>
                  <option value="Excursion sur-mesure">Excursion sur-mesure</option>
                  <option value="Transfert Aéroport">Transfert Aéroport</option>
                  <option value="Autre demande">Autre demande</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Message *</label>
              <textarea 
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className={`w-full bg-[#070B19] border ${errors.message ? 'border-rose-500/50' : 'border-white/10'} focus:border-[#94B3DB] px-4 py-3 text-white text-sm outline-none transition-colors resize-none`}
                placeholder="Détaillez vos besoins logistiques..."
              />
              {errors.message && <p className="text-rose-400 text-xs mt-1 font-medium">{errors.message}</p>}
            </div>

            <button 
              type="submit" 
              disabled={status === 'submitting'}
              className="w-full py-4 bg-[#94B3DB] hover:bg-[#C2CFE0] text-[#070B19] font-black tracking-widest text-xs uppercase transition-colors disabled:opacity-50"
            >
              {status === 'submitting' ? 'TRANSMISSION EN COURS...' : 'ENVOYER LA DEMANDE'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const FooterSecure = () => (
  <footer className="bg-[#020308] border-t border-white/10 pt-24 pb-12 relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-[#94B3DB] to-transparent opacity-50"></div>
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 mb-20 relative z-10">
      <div className="md:col-span-5">
        <img src="/logo_logon.png" alt="AOUJ VIP Transport" className="h-25 w-auto mb-6" />
        <p className="text-[#94A3B8] text-sm max-w-sm leading-relaxed mb-8 font-medium">L'infrastructure technologique et logistique au service du transport VIP. Opérant sur l'ensemble du Royaume du Maroc avec une précision chirurgicalه.</p>
        <div className="flex gap-4">
           <div className="w-12 h-12 border border-white/10 flex items-center justify-center hover:bg-[#94B3DB] hover:border-[#94B3DB] hover:text-[#070B19] transition-all text-white cursor-pointer font-bold text-xs">IN</div>
           <div className="w-12 h-12 border border-white/10 flex items-center justify-center hover:bg-[#94B3DB] hover:border-[#94B3DB] hover:text-[#070B19] transition-all text-white cursor-pointer font-bold text-xs">X</div>
        </div>
      </div>
      
      <div className="md:col-span-3 md:col-start-7">
        <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-sm">Systèmes</h4>
        <ul className="space-y-4 text-sm text-[#94A3B8] font-medium">
          <li className="hover:text-[#C2CFE0] cursor-pointer transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[#94B3DB] rounded-full"></span> Portail Réservation</li>
          <li className="hover:text-[#C2CFE0] cursor-pointer transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[#94B3DB] rounded-full"></span> Base Documentaire (FAQ)</li>
          <li className="hover:text-[#C2CFE0] cursor-pointer transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-[#94B3DB] rounded-full"></span> Notre Histoire</li>
        </ul>
      </div>

      <div className="md:col-span-3">
        <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-sm">Centre de Commande</h4>
        <ul className="space-y-4 text-sm text-[#94A3B8] font-medium">
          <li>Casablanca, Maroc</li>
          <li className="text-white font-bold">+212 500 000 000</li>
          <li className="text-[#94B3DB] border-b border-[#94B3DB]/30 inline-block pb-1 hover:text-white hover:border-white transition-colors">vip@aouj-transport.com</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-[#64748B] font-bold uppercase tracking-wider relative z-10">
      <p>© 2026 AOUJ VIP TRANSPORT. SECURE NETWORK.</p>
      <div className="flex gap-6 mt-4 md:mt-0">
        <span className="hover:text-[#C2CFE0] cursor-pointer transition-colors">CONFIDENTIALITÉ (NDA)</span>
        <span className="hover:text-[#C2CFE0] cursor-pointer transition-colors">CGU</span>
      </div>
    </div>
  </footer>
);

export default function PageVIP() {
  return (
    <main className={`bg-[#070B19] min-h-screen text-white selection:bg-[#94B3DB] selection:text-[#070B19] ${montserrat.className}`}>
      <FloatingSideNav />
      <HeroSciFi />
      <SectionAPropos />
      <SectionServices />
      <SectionPointsForts />
      <SectionFlotteInteractive />
      <PourquoiNous />
      <SectionFAQ />
      <CTAFinalBanner />
      <FormulaireContact />
      <FooterSecure />
    </main>
  );
}