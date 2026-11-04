import Link from "next/link";

export default function ProductPortfolioGrid() {
  const portfolioItems = [
    {
      id: "p1",
      title: "Wallets",
      desc: "From classic bi-folds to slim minimal cardholders",
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "p2",
      title: "Bags",
      desc: "A companion for every professional journey",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "p3",
      title: "Belts",
      desc: "Handcrafted dress & casual leather belts",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "p4",
      title: "Jackets",
      desc: "Bespoke full-grain leather jackets",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section className="py-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
          Curated Masterpieces
        </h2>
        <p className="text-xs text-slate-500 uppercase tracking-widest mt-1 font-medium">
          Engineered for precision and timeless elegance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portfolioItems.map((item) => (
          <Link
            key={item.id}
            href="/collections"
            className="group rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 p-4"
          >
            <div className="w-full h-64 rounded-xl overflow-hidden bg-slate-100 mb-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="px-2 pb-2">
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-normal">
                {item.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}