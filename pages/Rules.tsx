
import React from 'react';

const Rules: React.FC = () => {
  return (
    <div className="animate-fade-in bg-slate-50 dark:bg-slate-900 min-h-screen">
       <section className="relative h-80 bg-slate-900 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCxBFlLJ97yb_32VHXxpXyLn1HMYhSOmud_G3-yXZK318NC-7mi_kc3P-cRua3tAwjhIR919hbz5R5KUTadQ3_QgA1CdYsaP2Oz9eN9d4KBxYdvZx9uHucs6D4zIuSHyC0n1MmS0B2I6PIN00GlJP-sP1WgfJqF2qL8HaUqzZOVBzAJN3l8gCKWVTA2TVko23yOKozhVI3wJvhmUMB2ynZ7-OCxv3kv16XEvxoMeqIgHWVjG_hQhYLsZ5VweV3IcnVVydd63NFVRYw")' }}
        ></div>
        <div className="relative text-center px-4 z-10">
          <h1 className="text-white text-5xl md:text-6xl font-black mb-4">Rules & Regulations</h1>
          <p className="text-slate-200 text-lg max-w-2xl mx-auto">Ensuring fair play and sustainability for all members.</p>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 py-20 flex flex-col lg:flex-row gap-16">
        <aside className="w-full lg:w-1/4">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
               <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Sections</h3>
               <div className="flex flex-col gap-2">
                 {['General Conduct', 'Competition Rules', 'Safety Guidelines', 'Environmental'].map((cat, idx) => (
                   <button key={idx} className={`text-left p-3 rounded-xl font-bold transition-all ${idx === 0 ? 'bg-primary/10 text-primary border-l-4 border-primary' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
                     {cat}
                   </button>
                 ))}
               </div>
            </div>
            <button className="w-full bg-white dark:bg-slate-800 border-2 border-primary text-primary font-bold py-4 rounded-3xl flex items-center justify-center gap-3">
              <span className="material-symbols-outlined">download</span> Download PDF
            </button>
          </div>
        </aside>

        <main className="flex-grow space-y-12">
          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="size-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                <span className="material-symbols-outlined">gavel</span>
              </div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">1. General Conduct</h2>
            </div>
            <div className="space-y-4">
              {[
                { title: '1.1 Code of Ethics', text: 'All members are expected to conduct themselves in a manner that promotes the sport of fishing and respects other members and the public.' },
                { title: '1.2 Disciplinary Actions', text: 'Any infractions of the rules will result in a formal review by the committee, ranging from warnings to expulsion.' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                  <h4 className="font-black text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="size-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                <span className="material-symbols-outlined">fire_extinguisher</span>
              </div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">2. Safety Guidelines</h2>
            </div>
            <div className="bg-red-50 dark:bg-red-950/20 border-l-[12px] border-red-500 p-10 rounded-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-red-500">warning</span>
                <h3 className="text-2xl font-black text-red-900 dark:text-red-100">South Passage Bar Crossing</h3>
              </div>
              <p className="text-red-800 dark:text-red-200 leading-relaxed mb-6">The bar is notoriously dangerous. All members MUST:</p>
              <ul className="space-y-3 text-red-800 dark:text-red-200 font-bold">
                <li className="flex gap-2"><span>•</span> Log on with VMR Point Lookout on VHF Channel 63</li>
                <li className="flex gap-2"><span>•</span> Ensure all passengers wear approved life jackets</li>
                <li className="flex gap-2"><span>•</span> Log off once safely returned</li>
              </ul>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Rules;
