
import React from 'react';
import { COMMITTEE_MEMBERS } from '../constants';

const About: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative h-96 bg-slate-900 flex items-center justify-center overflow-hidden">
        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdcNcrjvtdxSPHP9vnaeqQdGE24W7o-i2A0rgIsA4G8Ke0uFiCGyvr_MxhjakB37fJKHYblQmB4kOib8dVGvO8SXVygSt8_iJMfhD3gJIoVfXxFSeBe1l31-cm1jHreB-xPUZBum2Cb2c-HmZR68RFCiRmg0eD4X1SUIDtPv4c9Mn-NwxmWW2_hK7Q5iudkK5T30h_qJqBJihATBEB987NPJSt1DZWjHDHIFN62LNCir72Vgisb5p2_Z4KQ6zvWH8MK2Yr20aPoiY" alt="About" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <h1 className="relative text-white text-5xl md:text-7xl font-black tracking-tight z-10">Our Story</h1>
      </section>

      {/* History */}
      <section className="py-24 px-6 max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-8">Decades of Passion</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Founded in 1975, the Point Lookout Fishing Club has been at the heart of the Stradbroke community for nearly 50 years. What started as a small group of local anglers sharing stories has evolved into one of QLD's most respected recreational fishing organizations.
            </p>
            <div className="space-y-4">
              {[
                { year: '1975', event: 'First foundation meeting at Point Lookout Community Hall.' },
                { year: '1982', event: 'Official incorporation and formal club rules established.' },
                { year: '2024', event: 'New community portal launched to better serve our growing membership.' }
              ].map((m, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                  <span className="font-black text-primary">{m.year}</span>
                  <span className="text-slate-600 dark:text-slate-300">{m.event}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[40px] overflow-hidden shadow-2xl">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPyEb3c8LR9zi49CVKx1zdlSwuAOyT5GdGvEn66Pc-7LaGf__u22XMculmcX0Pq1KkUfqDr8-u3X-asHjJ_TPc1IQYY19xdmsxTwHBVJobYmqelR1L1mC4SE8hfgDFrtPpkS9xRvO5MYoad_Tg4ySzPzFf_nNy6h9YPC2CTGosAZhnz-IgJj-z8y8vzlUxrLC-Ondxzx8_NktZa9c9cP1beZUvkAh9TPRj1mve6RLbMNfe6Z7OEiB5YoJuz6kjwwu-6ahBRJu6QwY" alt="Historical Map" className="w-full" />
          </div>
        </div>
      </section>

      {/* Committee */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white">Meet Your Committee</h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">Dedicated volunteers working behind the scenes to keep the club running smoothly.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {COMMITTEE_MEMBERS.map((member, idx) => (
              <div key={idx} className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 dark:border-slate-700">
                <div className="aspect-[4/5] overflow-hidden bg-slate-200">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-8 relative">
                  {member.isSpecial && (
                    <div className="absolute -top-6 right-6 size-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg">
                      <span className="material-symbols-outlined">star</span>
                    </div>
                  )}
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">{member.name}</h3>
                  <p className="text-primary font-bold text-sm mb-4">{member.role}</p>
                  <p className="text-slate-500 text-sm leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
