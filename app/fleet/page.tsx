'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Montserrat } from 'next/font/google';
import { 
  ShieldCheck, HeartPulse, Eye, Award, Wrench, Warehouse, Fuel, Clock, MapPin, Settings
} from 'lucide-react';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '500', '700', '900'] });

// --- 1. داتا الأسطول (الأعداد والفئات مطابقة للدفتر ص 4-5) ---
const fleetData = [
  {
    category: "Bus & Autocars de Prestige",
    type: "bus",
    vehicles: [
      { id: "bus-30", name: "Autocar Premium - 30 Places", specs: "30 Places • Climatisation Individuelle • Toit Panoramique", desc: "Idéal pour les délégations professionnelles et les circuits régionaux confortables.", image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2070&auto=format&fit=crop" },
      { id: "bus-40", name: "Autocar Grand Tourisme - 40 Places", specs: "40 Places • Sièges Inclinables en Cuir • Prises USB", desc: "Un espace généreux alliant haute sécurité scandinave et confort de premier ordre.", image: "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?q=80&w=2070&auto=format&fit=crop" },
      { id: "bus-50", name: "Autocar Impérial - 50 Places", specs: "50 Places • Système Audio de Pointe • Toilette Intégrée", desc: "Le parfait équilibre pour les longs trajets à travers le Royaume avec une sérénité totale.", image: "/Setra.jpg" },
      { id: "bus-54", name: "Autocar Trans-Maroc - 54 Places", specs: "54 Places • Soute à Bagages XXL • Wifi Haut Débit", desc: "Notre plus grande capacité, configurée pour maximiser l'espace individuel de chaque voyageur.", image: "/auto.jpg" }
    ]
  },
  {
    category: "Minibus Exécutifs",
    type: "minibus",
    vehicles: [
      { id: "vito", name: "Mercedes-Benz Vito", specs: "7 à 9 Places • Salon Face-à-Face • Climatisation Thermotronic", desc: "La polyvalence par excellence pour les petits groupes ou les transferts d'affaires confidentiels.", image: "/mercedes_v_class.jpg" },
      { id: "transit-mini", name: "Ford Transit Custom", specs: "8 à 17 Places • Sièges Ergonomiques • Large Accès", desc: "Robuste, spacieux et optimisé pour le transport fluide de délégations inter-villes.", image: "/ford.jpg" }
    ]
  },
  {
    category: "Mercedes-Benz Sprinter VIP",
    type: "sprinter",
    vehicles: [
      { id: "sprinter-7", name: "Mercedes Sprinter - Configuration 7 Places", specs: "7 Places VIP • Sièges Capitaines • Écrans 4K & Console", desc: "Un véritable jet privé sur route. Aménagement ultra-luxe avec cloison de séparation.", image: "/MERCEDES SPRINTER.jpg" },
      { id: "sprinter-17", name: "Mercedes Sprinter - Configuration 17 Places", specs: "17 Places • Confort Grand Tourisme • Espace Bagages", desc: "Configuration idéale pour les équipes corporatives exigeant confort et connectivité complète.", image: "/17.jpg" },
      { id: "sprinter-20", name: "Mercedes Sprinter - Configuration 20 Places", specs: "20 Places • Version Rallongée • Climatisation Renforcée", desc: "Espace maximal optimisé pour les navettes VIP et les déplacements d'équipes de tournage ou d'événements.", image: "/20.jpg" }
    ]
  },
  {
    category: "Gamme 4WD / 4x4 Tout-Terrain",
    type: "4x4",
    vehicles: [
      { id: "pajero", name: "Mitsubishi Pajero", specs: "7 Places • Transmission Super Select 4WD-II • Sellerie Cuir", desc: "Une endurance mythique alliée à un confort absolu pour explorer les pistes du Sud.", image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop" },
      { id: "land-cruiser", name: "Toyota Land Cruiser", specs: "7 Places • Climatisation Quadrizone • Suspension Pilotée", desc: "La référence incontestée du prestige tout-terrain, assurant une souplesse impériale dans le désert.", image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2070&auto=format&fit=crop" },
      { id: "prado", name: "Toyota Prado (2 Modes)", specs: "7 Places • Mode Route & Mode Off-road • Confort Premium", desc: "Une polyvalence dynamique parfaite pour basculer des autoroutes urbaines aux oasis secrètes.", image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=2070&auto=format&fit=crop" }
    ]
  }
];

// --- 2. المتابعة الطبية للسائقين ---
const driverMedicalCards = [
  { icon: <HeartPulse size={36} className="text-[#94B3DB]" />, title: "Suivi Annuel", desc: "Examens médicaux approfondis et bilans de santé cardiovasculaires obligatoires chaque année." },
  { icon: <Eye size={36} className="text-[#94B3DB]" />, title: "Tests de Vision", desc: "Contrôles ophtalmologiques semestriels garantissant une acuité visuelle irréprochable." },
  { icon: <Award size={36} className="text-[#94B3DB]" />, title: "Professionnalisme", desc: "Formations continues certifiées en écoconduite et gestion du stress." }
];

// --- 3. البنية التحتية والصيانة ---
const infrastructurePoints = [
  { icon: <ShieldCheck size={28} className="text-white" />, title: "Véhicules Récents", desc: "Renouvellement constant pour garantir une sécurité optimale." },
  { icon: <Wrench size={28} className="text-white" />, title: "Garage Marrakech", desc: "Centre technique équipé des derniers outils de diagnostic." },
  { icon: <Fuel size={28} className="text-white" />, title: "Station Privée", desc: "Carburant hautement filtré pour préserver les moteurs." },
  { icon: <Warehouse size={28} className="text-white" />, title: "Garages Régionaux", desc: "Ateliers certifiés répartis sur tout le territoire." },
  { icon: <MapPin size={28} className="text-white" />, title: "Agences Nationales", desc: "Présence à Casablanca, Agadir, Ouarzazate, et Zagora." },
  { icon: <Clock size={28} className="text-white" />, title: "Équipe 24h/7j", desc: "Ingénieurs prêts à intervenir instantanément." }
];

export default function FleetPage() {
  return (
    <main className={`bg-[#020202] text-white selection:bg-[#94B3DB] selection:text-black ${montserrat.className} overflow-hidden`}>
      
      {/* --- 1. Hero Section (مع صورة خلفية و"خلية" زجاجية) --- */}
      <section className="h-[75vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
        {/* صورة الخلفية */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070" 
            alt="Flotte AOUJ" 
            className="w-full h-full object-cover filter brightness-[0.25] contrast-125"
          />
          {/* تدرج لوني للدمج مع باقي الصفحة */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020202]/60 to-[#020202]"></div>
        </div>

        {/* الخلية الزجاجية (Card) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
          className="relative z-10 bg-[#070B19]/50 backdrop-blur-xl border border-[#94B3DB]/20 p-10 md:p-16 rounded-2xl shadow-[0_0_50px_rgba(148,179,219,0.1)] max-w-4xl w-full mx-auto"
        >
          <p className="text-[#94B3DB] text-xs md:text-sm font-bold tracking-[0.5em] uppercase mb-4">
            L'Excellence Opérationnelle
          </p>
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-widest text-white mb-6">
            Notre Flotte
          </h1>
          
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#94B3DB] to-transparent mx-auto mb-6"></div>

          <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed">
            Explorez notre parc automobile haut de gamme certifié. Conformément à nos chartes de sécurité, chaque unité constitue un salon privé souverain.
          </p>
        </motion.div>
      </section>

      {/* --- 2. عرض السيارات (تأثير Spotlight) --- */}
      <div className="flex flex-col mb-32 relative z-10">
        {fleetData.map((categorySection, catIndex) => (
          <div key={catIndex} className="mb-24">
            
            <motion.div 
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ amount: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-widest text-[#94B3DB] border-b border-white/5 pb-4 inline-block px-8">
                {categorySection.category}
              </h2>
            </motion.div>

            <div className="flex flex-col gap-12">
              {categorySection.vehicles.map((veh, idx) => (
                <motion.section 
                  key={veh.id}
                  initial={{ opacity: 0.1, filter: "blur(12px)", scale: 0.95 }}
                  whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  viewport={{ amount: 0.5, margin: "-25% 0px -25% 0px" }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="min-h-[50vh] flex items-center justify-center py-6 px-4 md:px-12 relative"
                >
                  <div className={`max-w-7xl mx-auto w-full flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16`}>
                    
                    <div className="w-full md:w-1/2 flex flex-col">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-2xl md:text-4xl font-bold text-white uppercase tracking-wide">
                          {veh.name}
                        </h3>
                        {categorySection.type === "bus" && (
                          <span className="bg-[#94B3DB]/10 text-[#94B3DB] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 border border-[#94B3DB]/30 rounded-[2px] animate-pulse">
                            Service Premium
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-5 text-[#94B3DB]">
                        <Settings size={16} />
                        <p className="text-xs font-semibold tracking-wider uppercase">
                          {veh.specs}
                        </p>
                      </div>
                      <p className="text-sm md:text-lg text-gray-400 font-light leading-relaxed border-l-2 border-[#94B3DB]/30 pl-5">
                        {veh.desc}
                      </p>
                    </div>

                    <div className="w-full md:w-1/2">
                      <div className="relative aspect-[16/9] rounded-sm overflow-hidden shadow-[0_0_50px_rgba(148,179,219,0.05)] group">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent z-10 opacity-60 group-hover:opacity-20 transition-opacity duration-700" />
                        <img 
                          src={veh.image} 
                          alt={veh.name}
                          className="w-full h-full object-cover filter contrast-[1.1] brightness-[0.8] group-hover:scale-105 group-hover:brightness-100 transition-all duration-1000"
                        />
                      </div>
                    </div>

                  </div>
                </motion.section>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* --- 3. قسم المتابعة الطبية (تصميم فخم مع حركة عائمة) --- */}
      <section className="py-32 px-4 md:px-12 bg-[#040712] border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-20 text-center">
            <h2 className="text-[11px] text-[#94B3DB] font-bold tracking-[0.5em] uppercase mb-3">Sécurité Humaine</h2>
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-widest text-white">Suivi Médical Chauffeurs</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {driverMedicalCards.map((card, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                // الحركة العائمة (Floating)
                animate={{ y: [0, -12, 0] }}
                transition={{ 
                  opacity: { duration: 0.6 },
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 } 
                }}
                className="relative p-10 bg-[#070B19]/80 backdrop-blur-md border border-[#94B3DB]/20 rounded-2xl flex flex-col items-center text-center shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                <div className="absolute -top-10 bg-[#040712] p-4 rounded-full border border-[#94B3DB]/30 shadow-[0_0_20px_rgba(148,179,219,0.2)]">
                  {card.icon}
                </div>
                <h4 className="text-xl font-bold uppercase tracking-wider mb-4 text-white mt-8">{card.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed font-light">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. قسم البنية التحتية والصيانة (مفصول عن الفوتر تماماً مع حركة عائمة) --- */}
      <section className="py-32 px-4 md:px-12 bg-[#020202] relative overflow-hidden">
        {/* إضاءة خلفية للقسم */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#94B3DB]/[0.03] blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 mb-20">
          <div className="mb-24 text-center">
            <h2 className="text-[11px] text-[#94B3DB] font-bold tracking-[0.5em] uppercase mb-3">Logistique Globale</h2>
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-widest text-white">Infrastructure & Maintenance</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {infrastructurePoints.map((point, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                // الحركة العائمة
                animate={{ y: [0, -8, 0] }}
                transition={{ 
                  opacity: { duration: 0.5 },
                  scale: { duration: 0.5 },
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 } 
                }}
                className="group relative p-8 bg-gradient-to-br from-[#070B19] to-[#040712] border border-[#94B3DB]/10 hover:border-[#94B3DB]/40 transition-all duration-500 rounded-xl overflow-hidden flex flex-col items-start shadow-xl"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#94B3DB]/5 rounded-full blur-3xl group-hover:bg-[#94B3DB]/15 transition-all duration-500 pointer-events-none" />
                
                <div className="mb-6 p-4 bg-[#94B3DB]/10 border border-[#94B3DB]/20 rounded-lg shadow-inner z-10">
                  {point.icon}
                </div>
                
                <h4 className="text-lg font-bold uppercase tracking-wide text-[#94B3DB] mb-3 z-10">{point.title}</h4>
                <p className="text-sm text-gray-300 font-light leading-relaxed z-10">{point.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* فاصل قوي وجميل يفصل القسم عن الفوتر */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#94B3DB]/40 to-transparent"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-[4px] bg-[#94B3DB] blur-sm"></div>
      </section>

      {/* --- الفوتر (Footer) --- */}
      <footer className="bg-[#040712] pt-20 pb-10 px-6 md:px-16 relative z-50">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 pb-12">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-2">
                <img src="/logo_logon.png" alt="AOUJ VIP Transport" className="h-25 w-auto mb-6" />
              </div>
              <p className="text-gray-400 text-xs font-light leading-relaxed">
                L'infrastructure technologique et logistique au service du transport VIP. Opérant sur l'ensemble du Royaume avec une précision chirurgicale.
              </p>
              <div className="flex gap-2.5 pt-1">
                <a href="#" className="w-8 h-8 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white hover:border-[#94B3DB] hover:text-[#94B3DB] transition-all rounded-[2px]">IN</a>
                <a href="#" className="w-8 h-8 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white hover:border-[#94B3DB] hover:text-[#94B3DB] transition-all rounded-[2px]">X</a>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <h4 className="text-xs font-bold tracking-[0.2em] text-white uppercase">Newsletter</h4>
              <p className="text-gray-400 text-xs font-light">Abonnez-vous pour recevoir nos actualités et mises à niveau de flotte.</p>
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
                <input 
                  type="email" 
                  placeholder="Votre adresse email" 
                  className="bg-[#020202] border border-white/10 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#94B3DB]/40 transition-colors"
                  required 
                />
                <button type="submit" className="bg-[#94B3DB] text-black text-xs font-bold py-1.5 rounded hover:bg-[#94B3DB]/80 transition-colors uppercase tracking-wide">
                  S'abonner
                </button>
              </form>
            </div>

            <div className="flex flex-col space-y-3 md:pl-6">
              <h4 className="text-xs font-bold tracking-[0.2em] text-white uppercase">Systèmes</h4>
              <ul className="space-y-2 text-xs text-gray-400 font-light">
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1.5"><span>•</span> Accueil</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1.5"><span>•</span> Notre Flotte</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1.5"><span>•</span> Excursions</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1.5"><span>•</span> Notre Histoire</a></li>
              </ul>
            </div>

            <div className="flex flex-col space-y-3">
              <h4 className="text-xs font-bold tracking-[0.2em] text-white uppercase">Centre de Commande</h4>
              <ul className="space-y-2 text-xs font-light">
                <li className="text-gray-400">Casablanca, Maroc</li>
                <li className="text-white font-bold tracking-wide">+212 500 000 000</li>
                <li><a href="mailto:vip@aouj-transport.com" className="text-gray-400 hover:text-[#94B3DB] underline underline-offset-4 transition-colors">vip@aouj-transport.com</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] text-gray-500 tracking-wider">
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