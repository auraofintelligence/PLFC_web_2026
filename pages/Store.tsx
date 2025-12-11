
import React, { useState } from 'react';
import { PRODUCTS } from '../constants';

interface StoreProps {
  addToCart: () => void;
}

const Store: React.FC<StoreProps> = ({ addToCart }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [addingId, setAddingId] = useState<string | null>(null);
  const categories = ['All', 'Apparel', 'Headwear', 'Accessories', 'Fishing Gear'];

  const filteredProducts = PRODUCTS.filter(p => activeCategory === 'All' || p.category === activeCategory);

  const handleAddToCart = (id: string) => {
    setAddingId(id);
    addToCart();
    setTimeout(() => setAddingId(null), 1000);
  };

  return (
    <div className="animate-fade-in bg-slate-50 dark:bg-slate-900 min-h-screen">
      {/* Hero */}
      <section className="relative h-96 bg-slate-900 overflow-hidden">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0hiMdkfw58sfOk5vCh4uJNNB0PlaEi8mH2BEHHHrRiVEq3oL5hkvcD6JNfdllzp6xFQaUGW8pdjhUHoS7GyvZOQcdBgVHN6aW3jSILU7P6DuhH7jJdL3uGTRJv3BKIfchVgnFl9EAMt5k-p8AbdetJ6dOq0r6c2cYOWizkow_4vVJHDatuklb9Mp5hdeZ52RMS60gUPOp-kbojO8XL22H5eMTkH5L7RDejnEPQAe47H7TlNsDHYi2qsYz1DxKMCaTX_ib_jmaQlc"
          alt="Merch Store"
          className="w-full h-full object-cover opacity-40 animate-scale-subtle"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-5xl md:text-7xl font-black tracking-tighter mb-4 drop-shadow-xl">Gear for the Coast</h1>
          <p className="text-slate-200 text-xl max-w-2xl mx-auto font-medium drop-shadow-md">Official Point Lookout Fishing Club merchandise.</p>
          <div className="flex gap-4 mt-8">
             <button className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-bold shadow-xl transition-all transform hover:scale-105">Shop New Arrivals</button>
             <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-3 rounded-full font-bold transition-all">Member Deals</button>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 py-16 flex flex-col lg:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="sticky top-24 space-y-10">
            <div>
              <h3 className="font-black text-xl mb-6 text-slate-900 dark:text-white uppercase tracking-widest text-sm">Categories</h3>
              <div className="flex flex-col gap-3">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-left font-bold transition-all px-4 py-2 rounded-xl ${
                      activeCategory === cat ? 'text-primary bg-primary/5 shadow-sm' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10 shadow-inner">
              <h4 className="font-black text-primary mb-2">Join & Save</h4>
              <p className="text-sm text-slate-500 mb-4 leading-relaxed">Members save up to 20% on all merchandise storewide.</p>
              <button className="text-primary font-bold underline text-sm hover:text-primary-dark transition-colors">Become a Member</button>
            </div>
          </div>
        </aside>

        {/* Grid */}
        <main className="flex-grow">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{activeCategory} Products</h2>
              <p className="text-slate-400 mt-2">Showing {filteredProducts.length} items</p>
            </div>
            <select className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold p-3 shadow-sm focus:ring-primary focus:border-primary">
              <option>Sort: Featured</option>
              <option>Sort: Price Low-High</option>
              <option>Sort: Price High-Low</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all flex flex-col hover:-translate-y-1">
                <div className="relative aspect-square overflow-hidden bg-slate-50 dark:bg-slate-900">
                  {product.badge && (
                    <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase z-10 shadow-lg">{product.badge}</span>
                  )}
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <button 
                    onClick={() => handleAddToCart(product.id)}
                    className={`absolute bottom-4 right-4 size-12 rounded-full shadow-xl flex items-center justify-center transition-all ${
                      addingId === product.id ? 'bg-green-500 text-white scale-110' : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white hover:bg-primary hover:text-white opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0'
                    }`}
                  >
                    <span className="material-symbols-outlined">{addingId === product.id ? 'check' : 'add_shopping_cart'}</span>
                  </button>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <span className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2">{product.category}</span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-primary transition-colors cursor-pointer">{product.name}</h3>
                  <div className="mt-auto flex items-center gap-4">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">${product.price}</span>
                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase">
                      Member: ${product.memberPrice}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Store;
