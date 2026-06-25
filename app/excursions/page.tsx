'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Montserrat } from 'next/font/google';
import { MapPin, Calendar, Compass } from 'lucide-react';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '500', '700', '900'] });

// --- داتا الرحلات والخدمات (مقسمة حسب الفئات الـ 7 والأعداد المطلوبة في دفتر التحملات ص 5) ---
const excursionsCategories = [
  {
    id: "transferts",
    region: "Prestations Exclusives",
    title: "Transferts Aéroport",
    description: "Une prise en charge totale et prestigieuse dès votre arrivée sur le sol marocain. Ponctualité absolue et discrétion garantie.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop",
    items: [
      { name: "Accueil Personnalisé VIP", detail: "Protocoles d'arrivée" },
      { name: "Transfert Hébergement", detail: "Berlines & Vans Premium" },
      { name: "Service Retour Privé", detail: "Gestion des bagages شامل" }
    ]
  },
  {
    id: "marrakech",
    region: "Cœur Almohade",
    title: "Excursions Marrakech",
    description: "Explorez la ville ocre, ses palais séculaires et ses jardins secrets à travers trois itinéraires d'exception conçus pour l'élite.",
    image: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?q=80&w=2070&auto=format&fit=crop",
    items: [
      { name: "Circuit Impérial", detail: "6 Jours - Grand Luxe" },
      { name: "Palais & Traditions", detail: "6 Jours - Immersion Privée" },
      { name: "Grand Tour de l'Atlas", detail: "8 Jours - Panoramas VIP" }
    ]
  },
  {
    id: "fes",
    region: "Cité Spirituelle",
    title: "Fès & Villes Impériales",
    description: "Plongez dans l'histoire vivante du Royaume à travers ses plus anciennes cités médiévales et architectures arabo-andalouses.",
    image: "https://images.unsplash.com/photo-1548786811-dd6e453ccca7?q=80&w=2071&auto=format&fit=crop",
    items: [
      { name: "Médina Millénaire", detail: "5 Jours - Guide Historien" },
      { name: "Patrimoine & Fès", detail: "5 Jours - Trajet Confort" },
      { name: "Les Joyaux Spirituels", detail: "6 Jours - Sur Mesure" }
    ]
  },
  {
    id: "ouarzazate",
    region: "Porte du Désert",
    title: "Ouarzazate & Désert",
    description: "Des kasbahs majestueuses en pisé aux dunes infinies de sable doré du Sahara. Un dépaysement absolu dans un confort 5 étoiles.",
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=2070&auto=format&fit=crop",
    items: [
      { name: "Kasbahs & Oasis", detail: "3 Jours - Expédition 4x4" },
      { name: "L'Inspirante Nomade", detail: "7 Jours - Bivouac de Prestige" },
      { name: "Dunes de Merzouga", detail: "3 Jours - Vol privé en option" }
    ]
  },
  {
    id: "grands-circuits",
    region: "Traversées Nationales",
    title: "Grands Circuits",
    description: "Les plus grands itinéraires nationaux du Maroc combinant le Nord, le Sud et les côtes dans un format alterné texte/image haut de gamme.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop",
    items: [
      { name: "Le Grand Maroc complet", detail: "10 Jours - Expérience Totale" },
      { name: "Royaume des Contrastes", detail: "11 Jours - Circuit Royal" },
      { name: "De la Terre à l'Océan", detail: "8 Jours - Trajet Premium" }
    ]
  },
  {
    id: "agadir",
    region: "Côte Souss-Massa",
    title: "Points Forts Villes (Agadir)",
    description: "Trois excursions d'une précision chirurgicale pour capturer l'essence de la côte atlantique, de la brise marine et de l'arrière-pays.",
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2070&auto=format&fit=crop",
    items: [
      { name: "Échappée Océane", detail: "6 Jours - Thalasso & Confort" },
      { name: "Vallée du Paradis", detail: "8 Jours - Nature Sauvage" },
      { name: "Agadir Privilège", detail: "2 Jours - Micro-Escale VIP" }
    ]
  },
  {
    id: "aventure",
    region: "Expéditions Sauvages",
    title: "Aventure & Nature",
    description: "Cinq treks exclusifs hors des sentiers battus au cœur des parcs naturels, vallées cachées et sommets les plus impressionnants.",
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=2073&auto=format&fit=crop",
    items: [
      { name: "Trek du Nord Maroc", detail: "Rif Sauvage" },
      { name: "Traversée du M'Goun", detail: "Haute Altitude" },
      { name: "Désert & Vallée du Draa", detail: "Oasis Secrètes" },
      { name: "Ascension du Toubkal", detail: "Toit de l'Afrique" },
      { name: "Évasion Bleue Chefchaouen", detail: "Randonnée Privée" }
    ]
  }
];

export default function ExcursionsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // حركة فتح الأبواب الملكية (من 0% إلى 15% من عمق السكرول)
  const leftDoorX = useTransform(scrollYProgress, [0, 0.15], ["0%", "-100%"]);
  const rightDoorX = useTransform(scrollYProgress, [0, 0.15], ["0%", "100%"]);
  const doorsOpacity = useTransform(scrollYProgress, [0.13, 0.15], [1, 0]);

  const [activeIndex, setActiveIndex] = useState(0);

  // توزيع الفئات الـ 7 على باقي الـ ScrollProgress بسلاسة
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.15) {
      const progress = (latest - 0.15) / 0.85; 
      const index = Math.floor(progress * excursionsCategories.length);
      setActiveIndex(Math.min(index, excursionsCategories.length - 1));
    } else {
      setActiveIndex(0);
    }
  });

  return (
    <main className={`bg-[#070B19] text-white selection:bg-[#94B3DB] selection:text-[#070B19] ${montserrat.className}`}>
      
      {/* القسم السينمائي التفاعلي الممتد (تم رفعه لـ 800vh لرحابة التصفح) */}
      <section ref={containerRef} className="relative h-[800vh] bg-[#070B19]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          
          {/* الخلفيات والمحتوى التغيري */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <img 
                src={excursionsCategories[activeIndex].image} 
                alt={excursionsCategories[activeIndex].title}
                className="w-full h-full object-cover filter brightness-[0.25] contrast-[1.15]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#070B19]/90 via-transparent to-[#070B19]"></div>
              
              {/* تجميعة المحتوى والـ Sub-items بطريقة بريميوم */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-20 z-10 raw-content">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="max-w-5xl w-full"
                >
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <MapPin size={16} className="text-[#94B3DB] animate-pulse" />
                    <span className="text-[#94B3DB] font-bold tracking-[0.4em] uppercase text-[11px] md:text-xs">
                      {excursionsCategories[activeIndex].region}
                    </span>
                  </div>
                  
                  <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-widest mb-4">
                    {excursionsCategories[activeIndex].title}
                  </h2>
                  
                  <p className="text-sm md:text-base text-gray-400 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
                    {excursionsCategories[activeIndex].description}
                  </p>

                  {/* مسارات الرحلات المنبثقة ديناميكياً بدقة متناهية وطابع أوج الملكي */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap lg:justify-center gap-4 max-w-4xl mx-auto">
                    {excursionsCategories[activeIndex].items.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                        className="bg-[#070B19]/50 backdrop-blur-md border border-[#94B3DB]/15 px-5 py-4 rounded-lg flex flex-col items-start text-left hover:border-[#94B3DB]/40 transition-all shadow-[0_4px_30px_rgba(0,0,0,0.4)] min-w-[220px] flex-1"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Compass size={14} className="text-[#94B3DB]" />
                          <span className="text-xs font-bold text-white tracking-wide uppercase">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-light">
                          <Calendar size={11} className="text-gray-500" />
                          <span>{item.detail}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* الباب الأيسر للقصر */}
          <motion.div 
            style={{ x: leftDoorX, opacity: doorsOpacity }}
            className="absolute top-0 left-0 w-1/2 h-full bg-[#050814] border-r border-[#94B3DB]/20 z-50 flex items-center justify-end shadow-[20px_0_60px_rgba(0,0,0,0.9)]"
          >
            <div className="h-full w-24 flex items-center justify-center bg-[#070B19] border-l border-[#94B3DB]/5 relative">
              <div className="w-[2px] h-[40vh] bg-gradient-to-b from-transparent via-[#94B3DB]/30 to-transparent absolute left-4"></div>
              <div className="w-5 h-36 border-y-2 border-l-2 border-[#94B3DB]/40 rounded-l-full shadow-[-5px_0_15px_rgba(148,179,219,0.1)]"></div>
            </div>
          </motion.div>

          {/* الباب الأيمن للقصر */}
          <motion.div 
            style={{ x: rightDoorX, opacity: doorsOpacity }}
            className="absolute top-0 right-0 w-1/2 h-full bg-[#050814] border-l border-[#94B3DB]/20 z-50 flex items-center justify-start shadow-[-20px_0_60px_rgba(0,0,0,0.9)]"
          >
            <div className="h-full w-24 flex items-center justify-center bg-[#070B19] border-r border-[#94B3DB]/5 relative">
              <div className="w-[2px] h-[40vh] bg-gradient-to-b from-transparent via-[#94B3DB]/30 to-transparent absolute right-4"></div>
              <div className="w-5 h-36 border-y-2 border-r-2 border-[#94B3DB]/40 rounded-r-full shadow-[5px_0_15px_rgba(148,179,219,0.1)]"></div>
            </div>
          </motion.div>

          {/* مؤشر النزول */}
          <motion.div 
            style={{ opacity: doorsOpacity }}
            className="absolute z-50 bottom-16 flex flex-col items-center pointer-events-none"
          >
            <span className="uppercase tracking-[0.5em] text-[10px] font-bold text-[#94B3DB]/80 mb-3">Défiler pour ouvrir</span>
            <div className="w-[1px] h-10 bg-gradient-to-b from-[#94B3DB] to-transparent animate-bounce" />
          </motion.div>

          {/* مؤشر النقاط الجانبي للفئات الـ 7 */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30 hidden md:flex">
            {excursionsCategories.map((_, idx) => (
              <div 
                key={idx} 
                className={`w-1.5 transition-all duration-500 rounded-full ${activeIndex === idx ? 'h-8 bg-[#94B3DB] shadow-[0_0_15px_rgba(148,179,219,0.8)]' : 'h-1.5 bg-[#94B3DB]/20'}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* --- الفوتر المحدث بالكامل والمطابق لدفتر التحملات ص 7 (مع النشرة البريدية والملفات) --- */}
      <footer className="bg-[#040712] border-t border-white/5 pt-20 pb-10 px-6 md:px-16 relative z-50">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-6 pb-16">
            
            {/* الهوية والتعريف */}
            <div className="flex flex-col space-y-5">
              <div className="flex items-center gap-2">
                <img src="/logo_logon.png" alt="AOUJ VIP Transport" className="h-25 w-auto mb-6" />
              </div>
              <p className="text-gray-400 text-xs font-light leading-relaxed max-w-sm">
                L'infrastructure technologique et logistique au service du transport VIP. Opérant sur l'ensemble du Royaume avec une précision chirurgicale.
              </p>
              <div className="flex gap-3 pt-1">
                <a href="#" className="w-8 h-8 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white hover:border-[#94B3DB] hover:text-[#94B3DB] transition-all rounded-[2px]">IN</a>
                <a href="#" className="w-8 h-8 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white hover:border-[#94B3DB] hover:text-[#94B3DB] transition-all rounded-[2px]">X</a>
              </div>
            </div>

            {/* النشرة البريدية (Newsletter) - مضافة ومطابقة لـ CDC الصفحة 7 */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-xs font-bold tracking-[0.2em] text-white uppercase">Newsletter</h4>
              <p className="text-gray-400 text-xs font-light leading-relaxed">
                Abonnez-vous pour recevoir nos itinéraires exclusifs et actualités premium.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
                <input 
                  type="email" 
                  placeholder="Votre adresse email" 
                  className="bg-[#070B19] border border-white/10 rounded px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#94B3DB]/50 transition-colors"
                  required 
                />
                <button 
                  type="submit" 
                  className="bg-[#94B3DB] text-[#070B19] text-xs font-bold py-2 rounded hover:bg-[#94B3DB]/80 transition-colors tracking-wide uppercase"
                >
                  S'abonner
                </button>
              </form>
            </div>

            {/* الأنظمة والروابط */}
            <div className="flex flex-col space-y-4 md:pl-6">
              <h4 className="text-xs font-bold tracking-[0.2em] text-white uppercase">Systèmes</h4>
              <ul className="space-y-2.5 text-xs text-gray-400 font-light">
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span>•</span> Portail Réservation</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span>•</span> Base Documentaire (FAQ)</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span>•</span> Notre Histoire</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span>•</span> Notre Flotte</a></li>
              </ul>
            </div>

            {/* مركز القيادة والاتصال */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-xs font-bold tracking-[0.2em] text-white uppercase">Centre de Commande</h4>
              <ul className="space-y-2.5 text-xs font-light">
                <li className="text-gray-400">Casablanca, Maroc</li>
                <li className="text-white font-bold tracking-wide">+212 500 000 000</li>
                <li><a href="mailto:vip@aouj-transport.com" className="text-gray-400 hover:text-[#94B3DB] underline underline-offset-4 transition-colors">vip@aouj-transport.com</a></li>
              </ul>
            </div>

          </div>

          {/* حزام الحقوق السفلي مضاف إليه Cookies حسب الدفتر */}
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 tracking-wider">
            <div>
              © 2026 AOUJ VIP TRANSPORT. SECURE NETWORK.
            </div>
            <div className="flex gap-5 uppercase font-medium">
              <a href="#" className="hover:text-white transition-colors">Confidentialité (NDA)</a>
              <a href="#" className="hover:text-white transition-colors">CGU</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>

        </div>
      </footer>
      
    </main>
  );
}