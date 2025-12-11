
import React, { useState } from 'react';

const Membership: React.FC = () => {
  const [step, setStep] = useState(1);
  const [membershipType, setMembershipType] = useState('Family');

  return (
    <div className="animate-fade-in bg-[#f5ebd8]/30 dark:bg-slate-900 min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-center text-slate-900 dark:text-white mb-12">Membership Application Form</h1>
        
        <div className="bg-white dark:bg-slate-800 rounded-[40px] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-700">
          {/* Progress Bar */}
          <div className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 px-8 py-6">
            <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest">
              {['Details', 'Membership', 'Payment', 'Confirm'].map((label, idx) => (
                <div key={idx} className={`flex flex-col items-center gap-2 ${step >= idx + 1 ? 'text-primary' : 'text-slate-400'}`}>
                  <div className={`size-8 rounded-full flex items-center justify-center border-2 ${step >= idx + 1 ? 'border-primary bg-primary text-white' : 'border-slate-200'}`}>
                    {idx + 1}
                  </div>
                  <span className="hidden sm:block">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <form className="p-8 md:p-12 space-y-12">
            {/* Personal Info */}
            <section>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Full Name" className="w-full rounded-2xl border-slate-200 dark:border-slate-700 dark:bg-slate-900 p-4 focus:ring-primary" />
                <input type="text" placeholder="Date of Birth (DD/MM/YYYY)" className="w-full rounded-2xl border-slate-200 dark:border-slate-700 dark:bg-slate-900 p-4 focus:ring-primary" />
                <div className="md:col-span-2">
                  <input type="text" placeholder="Street Address" className="w-full rounded-2xl border-slate-200 dark:border-slate-700 dark:bg-slate-900 p-4 focus:ring-primary" />
                </div>
                <input type="text" placeholder="City/Town" className="w-full rounded-2xl border-slate-200 dark:border-slate-700 dark:bg-slate-900 p-4 focus:ring-primary" />
                <div className="flex gap-4">
                  <input type="text" placeholder="State" className="w-full rounded-2xl border-slate-200 dark:border-slate-700 dark:bg-slate-900 p-4 focus:ring-primary" />
                  <input type="text" placeholder="Postcode" className="w-full rounded-2xl border-slate-200 dark:border-slate-700 dark:bg-slate-900 p-4 focus:ring-primary" />
                </div>
              </div>
            </section>

            {/* Type Selection */}
            <section>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8">Membership Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'Individual', price: 50, icon: 'person', desc: 'Single angler access' },
                  { name: 'Family', price: 80, icon: 'groups', desc: '2 Adults + Kids < 18' },
                  { name: 'Junior', price: 25, icon: 'school', desc: 'Anglers under 18' }
                ].map((type) => (
                  <label key={type.name} className={`relative p-6 rounded-3xl border-2 cursor-pointer transition-all ${
                    membershipType === type.name ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-slate-200'
                  }`}>
                    <input 
                      type="radio" 
                      name="membership" 
                      className="sr-only" 
                      checked={membershipType === type.name}
                      onChange={() => setMembershipType(type.name)}
                    />
                    <div className="flex justify-between items-start mb-4">
                      <span className="material-symbols-outlined text-primary text-3xl">{type.icon}</span>
                      <div className={`size-5 rounded-full border-2 flex items-center justify-center ${
                        membershipType === type.name ? 'border-primary bg-primary' : 'border-slate-200'
                      }`}>
                        {membershipType === type.name && <div className="size-2 bg-white rounded-full"></div>}
                      </div>
                    </div>
                    <h4 className="font-black text-slate-900 dark:text-white text-lg">{type.name}</h4>
                    <p className="text-sm text-slate-500 mb-2">{type.desc}</p>
                    <span className="text-xl font-black text-primary">${type.price}<span className="text-xs">/yr</span></span>
                  </label>
                ))}
              </div>
            </section>

            <div className="pt-8 flex flex-col items-center">
              <button type="button" className="w-full max-w-sm bg-primary hover:bg-primary-dark text-white font-bold py-5 rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-3 transition-transform hover:scale-[1.02]">
                Submit Application <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <p className="text-xs text-slate-400 mt-6 max-w-md text-center">
                By submitting, you agree to our Terms & Conditions and acknowledge the club's code of ethics.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Membership;
