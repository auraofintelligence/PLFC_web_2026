
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="animate-fade-in bg-slate-50 dark:bg-slate-900 min-h-screen">
      <section className="relative h-96 bg-slate-900 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBs8nDj9DYzmChTgqZGRCP4SXXSE5P-1_xchw7ZP-WM55wIOLqvOZXt9O4FY5mlUjnhOyvnEp5HDTfGlSTwonALect97-_8fNujwlu2xLWqfj5bV7rsVMJnsivLcHL1QurvlDooEWRQBAWKv-P1q-eVEn6k8iXxihUZFgH3BuodsGi9RoOZ2sgvxJEAlR7vFDoVTx6oSc3_vCxAaXfSbY8aTi-ylPYY1fA0q4Z2DSw4803FR5JNx7UdbslgUkTzbbDqbMZbICpTLGc")' }}
        ></div>
        <div className="relative text-center px-4 z-10">
          <h1 className="text-white text-5xl md:text-7xl font-black mb-4">Contact Us</h1>
          <p className="text-slate-200 text-xl max-w-2xl mx-auto font-medium">Have a question? We'd love to hear from you.</p>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-slate-800 p-10 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-800">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8">Send a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Full Name</label>
                    <input type="text" className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl p-4 focus:ring-primary" placeholder="e.g. John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Email Address</label>
                    <input type="email" className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl p-4 focus:ring-primary" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Subject</label>
                  <select className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl p-4 focus:ring-primary">
                    <option>Membership Inquiry</option>
                    <option>Competition Question</option>
                    <option>General Feedback</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Message</label>
                  <textarea rows={5} className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl p-4 focus:ring-primary" placeholder="How can we help?"></textarea>
                </div>
                <button type="button" className="bg-primary hover:bg-primary-dark text-white font-bold py-5 px-10 rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center gap-3">
                  Send Message <span className="material-symbols-outlined">send</span>
                </button>
              </form>
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-5 space-y-10">
            <div className="bg-white dark:bg-slate-800 p-10 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-800 space-y-8">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Contact Info</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Visit Us</h4>
                    <p className="text-slate-500 text-sm">Point Lookout Fishing Club Inc.<br/>North Stradbroke Island, QLD 4183</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Email Us</h4>
                    <a href="mailto:info@plfc.com.au" className="text-primary font-bold hover:underline">info@plfc.com.au</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">call</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Call Us</h4>
                    <p className="text-slate-500 font-bold">(07) 5555 1234</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-200 dark:bg-slate-800 rounded-[40px] overflow-hidden h-64 border-4 border-white dark:border-slate-700 shadow-xl relative">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiLSIOjtL_vUXnh8j4qC119R52ogynRe2PyVU5e8AbCnIXuyfZQgPWoi4Aat5YKTrUDo5pRdKUQMnibVNcHXGY3ZQJx1cw8icp_xA8vz8MshyP9WH6kuPw7YMFfqd2x6RQrZOvvK2GDpIb8M8whih3KeTJMUkxvAfHnv_iXbYwcLjfPWtWeSAc7MJp04Pc92n_-425PQfUqa5okBIDDrHFkmaMUX6D_ai7hPcvwrpMCEJEo7hHFqheRZlUxd0BUPi8stZfTAbQkQY" alt="Map" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-primary/10 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
