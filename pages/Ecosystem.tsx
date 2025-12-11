
import React, { useState } from 'react';
import { FISH_SPECIES } from '../constants';

const Ecosystem: React.FC = () => {
  const [filter, setFilter] = useState<'Estuary' | 'Reef' | 'Beach' | 'All'>('All');

  const filteredSpecies = FISH_SPECIES.filter(s => filter === 'All' || s.category === filter);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCtRMcNX6zExjhycGVfbPJOeLAjHp0CmkEx9CaU0WOqi_rNGbwyAEDRufUrHyKZqM_a5TM-UOc2wCfOkXQRCRd5w5P6ebSQgME6j4_dxOdXAUkQs7WblEW__EPugBefrZ0oN3DEnSAiMErv1OgwrehkRYNEcdKE88ipGWamMq6Wuso1Maao_AGcrP6ss5U2wx0Qu_8JXX9m3uLEZQRYUogtzAWh2QlsG8lzlNMF8mFyPzs8PqPhTxz2yNH5lkkOBALwaBl1X7KFj3Y")' }}
        ></div>
        <div className="relative text-center px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-white text-xs font-bold uppercase tracking-wider mb-4">
            <span className="material-symbols-outlined text-sm">water_drop</span> Conservation & Education
          </div>
          <h1 className="text-white text-4xl md:text-6xl font-black tracking-tight">Quandamooka Aquatic Ecosystem</h1>
          <p className="text-slate-200 mt-4 text-lg max-w-2xl mx-auto">Protecting and understanding the delicate balance of North Stradbroke Island's waters.</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        {/* Acknowledgment */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border-l-[12px] border-primary shadow-sm mb-20 flex gap-8 items-start">
          <div className="hidden sm:block text-primary/80">
            <span className="material-symbols-outlined text-6xl">handshake</span>
          </div>
          <div>
            <h3 className="text-2xl font-black mb-3 text-slate-900 dark:text-white">Acknowledgment of Country</h3>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              We acknowledge the Quandamooka people as the traditional owners of the lands and waters where we fish. Our club is dedicated to the preservation and understanding of this unique aquatic environment, respecting the cultural significance it holds.
            </p>
          </div>
        </div>

        {/* Species Guide */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 border-b border-slate-200 dark:border-slate-800 pb-6">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Local Fish & Bait Guide</h2>
            <div className="flex gap-8 mt-6 md:mt-0 overflow-x-auto pb-2">
              {['All', 'Estuary', 'Reef', 'Beach'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat as any)}
                  className={`text-sm font-bold transition-all uppercase tracking-widest border-b-2 pb-1 whitespace-nowrap ${
                    filter === cat ? 'text-primary border-primary' : 'text-slate-400 border-transparent hover:text-slate-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredSpecies.map((fish, idx) => (
              <div key={idx} className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-100 dark:border-slate-800 flex flex-col">
                <div className="h-56 overflow-hidden relative">
                  <img src={fish.image} alt={fish.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  {fish.common && (
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">Common</div>
                  )}
                </div>
                <div className="p-6 flex-grow">
                  <h3 className="font-black text-xl mb-1 text-slate-900 dark:text-white">{fish.name}</h3>
                  <p className="text-xs text-slate-400 mb-4 italic uppercase tracking-widest">{fish.scientificName}</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <span className="material-symbols-outlined text-primary text-xl">phishing</span>
                      <span className="text-slate-600 dark:text-slate-300">{fish.baits}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-red-500 font-bold">
                      <span className="material-symbols-outlined text-xl">straighten</span>
                      <span>Min: {fish.minSize} {fish.maxSize ? `| Max: ${fish.maxSize}` : ''} | Bag: {fish.bagLimit}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Aquatic Dangers */}
        <section className="bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-[40px] p-8 md:p-12">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-red-500 text-white size-12 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">warning</span>
            </div>
            <h2 className="text-3xl font-black text-red-900 dark:text-red-100">Aquatic Dangers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Stonefish', icon: 'medical_services', desc: 'Masters of camouflage found in rock pools. Excruciating venom. Wear sturdy footwear.' },
              { title: 'Strong Currents', icon: 'waves', desc: 'South Passage Bar is notorious. Tidal currents can be extremely dangerous.' },
              { title: 'Blue Bottles', icon: 'medication', desc: 'Common in summer with NE winds. Painful sting. Wash with sea water.' }
            ].map((danger, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-black text-xl text-red-700 dark:text-red-400">{danger.title}</h4>
                  <span className="material-symbols-outlined text-red-400">{danger.icon}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{danger.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Ecosystem;
