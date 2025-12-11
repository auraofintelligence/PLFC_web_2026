
import React from 'react';
import { EVENTS } from '../constants';

const Events: React.FC = () => {
  return (
    <div className="animate-fade-in bg-slate-50 dark:bg-slate-900 min-h-screen">
      {/* Hero */}
      <section className="relative h-96 bg-primary overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent z-10"></div>
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmN2SBVTSgpFzpsaOPq3R7J0OWKT6kONhQEjbpFRhU0m_qU0uQRJrzwrco1c3Dg04GkM6uSdyZkdQ27TEoUy5xAdzMBa0Wdjb1GaT1LCGz5x3VZq4zpdpVrJSncSzWb6Y76_oZPLktM7dvKt1LA_ORWN7arrz9jHZRQHAfLQKN-5LsfkxEXyVVOg3AhWyK9zyu5YEszdZVWeISn-DVr7d5KxlB1zrGP4XrmHlDqVQBDONeoBakDUETEMZeVc2hBjwudDqp66-DfOw" 
          alt="Coastline" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="container mx-auto px-10 relative z-20">
          <h1 className="text-white text-5xl md:text-7xl font-black mb-4 drop-shadow-lg leading-tight">Events Calendar</h1>
          <p className="text-white/90 text-2xl font-medium max-w-2xl drop-shadow-md">Join the adventure. Upcoming competitions, meetings, and social gatherings.</p>
        </div>
      </section>

      <main className="max-w-[1400px] mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            {['All Events', 'Competitions', 'Social', 'Meetings'].map((cat, idx) => (
              <button 
                key={idx} 
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all shadow-sm ${
                  idx === 0 ? 'bg-primary text-white' : 'bg-white dark:bg-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Timeline */}
          <div className="space-y-10">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Upcoming 2024</h2>
            <div className="space-y-6">
              {EVENTS.map((event) => (
                <div key={event.id} className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-32 h-32 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700 shrink-0 overflow-hidden">
                    <span className="bg-primary w-full text-center text-[10px] text-white font-black py-1 uppercase tracking-widest">{event.month}</span>
                    <div className="flex-grow flex items-center justify-center">
                      <span className="text-3xl font-black text-slate-900 dark:text-white">{event.day}</span>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="material-symbols-outlined text-primary text-xl">
                        {event.category === 'Competition' ? 'emoji_events' : event.category === 'Meeting' ? 'groups' : 'local_dining'}
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">{event.category}</span>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">{event.title}</h3>
                    <div className="flex flex-wrap gap-6 text-sm text-slate-500 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">schedule</span> {event.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">place</span> {event.location}
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{event.description}</p>
                  </div>
                  <div className="shrink-0 flex items-center">
                    <button className="bg-primary hover:bg-primary-dark text-white text-sm font-bold py-3 px-8 rounded-2xl transition-all shadow-lg">
                      {event.category === 'Competition' ? 'Register Now' : 'RSVP Now'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-10">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-[40px] border border-slate-100 dark:border-slate-700 shadow-sm">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Member Benefits</h3>
            <ul className="space-y-4 mb-8">
              {[
                'Exclusive competition entry',
                'Clubhouse facility access',
                'Monthly social BBQs',
                'Discounts at local bait shops'
              ].map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                  <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                  <span className="font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
            <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-2xl shadow-xl transition-all">Join the Club</button>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Events;
