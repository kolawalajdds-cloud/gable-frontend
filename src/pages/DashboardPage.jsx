import DashboardLayout, { PropertyCard } from "../components/DashboardLayout";
import properties from "../assets/images/properties.jpg";

/* ─── Category cards ────────────────────────────────────── */
const CATEGORY_CARDS = [
  {
    id: "properties",
    title: "Properties",
    subtitle: "View and manage your portfolio",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=260&h=220&fit=crop&auto=format",
    dark: false,
    cta: "EXPLORE",
  },
  {
    id: "tenants",
    title: "Tenants",
    subtitle: "Active renters and applications",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=260&h=220&fit=crop&auto=format",
    dark: false,
    cta: "EXPLORE",
  },
  {
    id: "maintenance",
    title: "Maintenance",
    subtitle: "Open tickets and inspections",
    badge: 5,
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=220&fit=crop&auto=format",
    dark: true,
  },
];

/* ─── Hot properties ────────────────────────────────────── */
const HOT_PROPERTIES = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=220&fit=crop&auto=format",
    address: "123 Oak St",
    location: "Oakland, CA",
    type: "4 units",
    tenants: 4,
    tickets: 1,
    balance: "$0",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=400&h=220&fit=crop&auto=format",
    address: "78 Brookwood Pl",
    location: "Oakland, CA",
    type: "Single-family",
    tenants: 0,
    tickets: 0,
    balance: "$0",
  },
  {
    id: 3,
    image: properties,
    address: "55 Crystal Falls Dr",
    location: "Leander, TX",
    type: "3 bed / 2 bath",
    tenants: 1,
    tickets: 2,
    balance: "$120",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=220&fit=crop&auto=format",
    address: "901 Market St",
    location: "San Francisco, CA",
    type: "12 units",
    tenants: 4,
    tickets: 1,
    balance: "$0",
  },
];

/* ─── Category card ─────────────────────────────────────── */
function CategoryCard({ card }) {
  if (card.dark) {
    return (
      <div className="relative rounded-2xl overflow-hidden h-[160px] sm:h-[185px] flex-shrink-0 flex-1 min-w-0">
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 pb-5 pl-6 text-white">
          <div className="flex items-center gap-2 mb-[1px]">
            <h3 className="text-lg font-bold">{card.title}</h3>
            {card.badge !== undefined && (
              <span className="bg-transparent backdrop-blur-[40px] text-white text-sm font-normal rounded-full py-[3px] w-[30px] h-5 flex items-center justify-center leading-none">
                {card.badge}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-300">{card.subtitle}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-row flex-1 min-w-0 h-[160px] sm:h-[185px]">
      <div className="w-[120px] sm:w-[150px] flex-shrink-0 overflow-hidden">
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-between flex-1 min-w-0 px-4 pt-4 pb-5 sm:px-5 sm:pt-5 sm:pb-6 lg:px-6 lg:pt-[18px] lg:pb-[24px]">
        <div>
          <h3 className="text-[17px] sm:text-xl font-bold text-[#0F1114] mb-[1px]">
            {card.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#0F1114]">{card.subtitle}</p>
        </div>
        <button className="w-full mt-3 px-5 py-[14px] border border-gray-300 rounded-full text-xs font-bold text-[#0F1114] hover:bg-gray-50 transition uppercase tracking-wide">
          {card.cta}
        </button>
      </div>
    </div>
  );
}

/* ─── Dashboard page ─────────────────────────────────────── */
export default function DashboardPage() {
  return (
    <DashboardLayout>
      <h1 className="text-xl font-bold text-[#0F1114] mb-5">Dashboard</h1>

      {/* Category cards */}
      <div className="flex flex-col md:flex-row gap-4 mb-[27px]">
        {CATEGORY_CARDS.map((card) => (
          <CategoryCard key={card.id} card={card} />
        ))}
      </div>

      {/* Hot Properties */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-[#0F1114] mb-[19px] flex items-center gap-2">
          <span>🔥</span> Hot Properties
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 pb-6">
          {HOT_PROPERTIES.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
