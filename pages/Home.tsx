
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center bg-slate-900 overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center animate-scale-subtle" 
          style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDF__kaE4-9Pzpz5exkdBuZWtHWFTDOJlcQlwdbIb7mmMpW5I-1UjKg4mxnssl5uzZ2Cj5xMxfFMt1LpxVWcIiVuUq29kilwsZhLN1k9N8X5zM_2i4hOcvyVTm9xYD2aP4BcZBYIyph_l9lMOBg34gginAtgoDTCQY8QQKND6ndNzdffY3tGE5E7yYSJowuy0Px3dixmTvzslGHOF9G_NYuW1pGjM1bCwVUMG4ZrU9gQgdordVb3JICmlQ9UpnGW4zOP4QMAOG-8e4")' }}
        ></div>
        <div className="relative z-10 max-w-[1000px] px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Est. 1975 • Point Lookout
          </div>
          <h1 className="text-white text-6xl md:text-8xl font-black leading-tight tracking-tighter mb-8 drop-shadow-2xl">
            More Than Just<br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-300">A Fishing Club</span>
          </h1>
          <p className="text-slate-200 text-lg md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed mb-10 opacity-90 drop-shadow-md">
            Experience the camaraderie, competition, and conservation efforts of our vibrant island community on North Stradbroke.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/membership" className="bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl transition-all transform hover:-translate-y-1">
              Become a Member
            </Link>
            <Link to="/ecosystem" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-full font-bold text-lg transition-all">
              Explore Ecosystem
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 px-6 bg-white dark:bg-slate-900">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 size-40 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-8 leading-tight">Building a Legacy on the Island</h2>
              <div className="space-y-6">
                <p className="text-slate-600 dark:text-slate-300 text-xl leading-relaxed">
                  Point Lookout Fishing Club Inc. was founded with a singular vision: to create a formalized, supportive environment for local and visiting anglers.
                </p>
                <p className="text-slate-600 dark:text-slate-300 text-xl leading-relaxed">
                  We've grown into a community dedicated to transparency, engagement, and sustainable fishing practices.
                </p>
              </div>
              <div className="mt-12 flex gap-8">
                <div className="flex flex-col">
                  <span className="text-4xl font-black text-primary">500+</span>
                  <span className="text-sm font-bold uppercase tracking-widest text-slate-400">Members</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-black text-primary">12</span>
                  <span className="text-sm font-bold uppercase tracking-widest text-slate-400">Events/Yr</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-black text-primary">Est 1975</span>
                  <span className="text-sm font-bold uppercase tracking-widest text-slate-400">Founded</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: 'groups', title: 'Community', desc: 'Inclusive & welcoming' },
                { icon: 'water_ec', title: 'Sustainable', desc: 'Protecting our waters' },
                { icon: 'verified', title: 'Integrity', desc: 'Fair play always' },
                { icon: 'school', title: 'Education', desc: 'Sharing techniques' }
              ].map((item, idx) => (
                <div key={idx} className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all group">
                  <span className="material-symbols-outlined text-primary text-5xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</span>
                  <h3 className="font-bold text-xl mb-2 text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-[120px] rounded-full"></div>
        <div className="max-w-[1000px] mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to Join the Crew?</h2>
          <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto">
            Membership is open for the upcoming season. Sign up today to access competitions, club discounts, and our growing community.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/membership" className="h-14 px-12 bg-primary hover:bg-primary-dark text-white font-bold rounded-2xl transition-all shadow-xl shadow-primary/25 flex items-center justify-center">
              Apply for Membership
            </Link>
            <Link to="/contact" className="h-14 px-12 bg-transparent border border-slate-600 hover:bg-white/5 text-white font-bold rounded-2xl transition-all flex items-center justify-center">
              Contact Secretary
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
