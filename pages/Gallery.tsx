
import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../constants';

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Competitions', 'Social Events', 'Fish Catches', 'Youth Anglers'];

  const filteredItems = GALLERY_ITEMS.filter(item => filter === 'All' || item.category === filter);

  return (
    <div className="animate-fade-in bg-slate-50 dark:bg-slate-900 min-h-screen">
      <header className="relative h-80 bg-slate-900 flex items-center justify-center overflow-hidden">
        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdcNcrjvtdxSPHP9vnaeqQdGE24W7o-i2A0rgIsA4G8Ke0uFiCGyvr_MxhjakB37fJKHYblQmB4kOib8dVGvO8SXVygSt8_iJMfhD3gJIoVfXxFSeBe1l31-cm1jHreB-xPUZBum2Cb2c-HmZR68RFCiRmg0eD4X1SUIDtPv4c9Mn-NwxmWW2_hK7Q5iudkK5T30h_qJqBJihATBEB987NPJSt1DZWjHDHIFN62LNCir72Vgisb5p2_Z4KQ6zvWH8MK2Yr20aPoiY" alt="Gallery" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="relative text-center z-10 px-4">
          <h1 className="text-white text-5xl md:text-6xl font-black mb-2">Our Community in Photos</h1>
          <p className="text-slate-200 text-xl font-medium">Share the adventure with our vibrant club community.</p>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-8">
           <div className="relative w-full lg:w-1/3">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input type="text" placeholder="Search photos..." className="w-full bg-white dark:bg-slate-800 border-none rounded-2xl p-4 pl-12 shadow-sm focus:ring-primary" />
           </div>
           <div className="flex flex-wrap justify-center gap-3">
             {categories.map(cat => (
               <button 
                 key={cat} 
                 onClick={() => setFilter(cat)}
                 className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${
                   filter === cat ? 'bg-primary text-white shadow-lg' : 'bg-white dark:bg-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'
                 }`}
               >
                 {cat}
               </button>
             ))}
           </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-100 dark:border-slate-800">
              <div className="aspect-[4/3] overflow-hidden relative cursor-pointer">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                   <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest border border-white/30">View Lightbox</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-black text-slate-900 dark:text-white mb-4">{item.title}</h3>
                <div className="flex gap-4 text-primary">
                  <span className="material-symbols-outlined text-xl cursor-pointer hover:scale-110 transition-transform">thumb_up</span>
                  <span className="material-symbols-outlined text-xl cursor-pointer hover:scale-110 transition-transform">share</span>
                  <span className="material-symbols-outlined text-xl cursor-pointer hover:scale-110 transition-transform">comment</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
           <button className="bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-12 py-4 rounded-3xl font-black shadow-sm hover:shadow-md transition-all">Load More Photos</button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
