
import React from 'react';

const Minutes: React.FC = () => {
  const records = [
    { date: 'April 15, 2024', type: 'General', title: 'General Meeting Minutes - April', desc: 'Topics: Upcoming fishing competition, new member induction, conservation efforts.', size: '2.5 MB' },
    { date: 'March 10, 2024', type: 'Committee', title: 'Committee Meeting Minutes - March', desc: 'Planning for annual fundraiser, budget review, facilities update.', size: '1.8 MB' },
    { date: 'February 20, 2024', type: 'Special', title: 'Special General Meeting - February', desc: 'Discussion on proposed club rule changes and new safety guidelines.', size: '3.1 MB' }
  ];

  return (
    <div className="animate-fade-in bg-slate-50 dark:bg-slate-900 min-h-screen">
       <section className="relative h-80 bg-slate-900 flex items-center justify-center overflow-hidden">
        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBs8nDj9DYzmChTgqZGRCP4SXXSE5P-1_xchw7ZP-WM55wIOLqvOZXt9O4FY5mlUjnhOyvnEp5HDTfGlSTwonALect97-_8fNujwlu2xLWqfj5bV7rsVMJnsivLcHL1QurvlDooEWRQBAWKv-P1q-eVEn6k8iXxihUZFgH3BuodsGi9RoOZ2sgvxJEAlR7vFDoVTx6oSc3_vCxAaXfSbY8aTi-ylPYY1fA0q4Z2DSw4803FR5JNx7UdbslgUkTzbbDqbMZbICpTLGc" alt="Minutes" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <h1 className="relative text-white text-5xl md:text-6xl font-black z-10">Meeting Minutes</h1>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 py-20 flex flex-col lg:flex-row gap-16">
        <aside className="w-full lg:w-1/4 space-y-10">
           <div className="bg-white dark:bg-slate-800 p-8 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-800">
             <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Filters</h3>
             <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold">Search</label>
                  <input type="text" className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl p-3" placeholder="Search records..." />
                </div>
                <div className="space-y-4">
                  <label className="text-sm font-bold">Meeting Type</label>
                  {['General', 'Committee', 'Special', 'AGM'].map(t => (
                    <label key={t} className="flex items-center gap-3 text-sm cursor-pointer hover:text-primary">
                      <input type="checkbox" className="rounded border-slate-300 text-primary" />
                      {t}
                    </label>
                  ))}
                </div>
             </div>
           </div>
        </aside>

        <main className="flex-grow space-y-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Club Meeting Records</h2>
            <select className="bg-white dark:bg-slate-800 border-none rounded-xl text-sm font-bold shadow-sm p-3">
              <option>Sort: Newest First</option>
              <option>Sort: Oldest First</option>
            </select>
          </div>

          <div className="space-y-6">
            {records.map((record, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 p-8 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-8 items-center">
                 <div className="flex-grow">
                   <div className="flex items-center gap-3 text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
                     <span className="material-symbols-outlined text-sm">calendar_today</span> {record.date}
                   </div>
                   <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">{record.title}</h3>
                   <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{record.desc}</p>
                 </div>
                 <button className="shrink-0 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-xl transition-all">
                   <span className="material-symbols-outlined">download</span> Download PDF ({record.size})
                 </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Minutes;
