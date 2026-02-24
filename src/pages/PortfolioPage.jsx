import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout, {
  PropertyCard,
  SearchIcon,
  PlusIcon,
} from "../components/DashboardLayout";
import properties from "../assets/images/properties.jpg";

/* ─── Portfolio properties ──────────────────────────────── */
const PORTFOLIO_PROPERTIES = [
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
  {
    id: 5,
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
    id: 6,
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
    id: 7,
    image: properties,
    address: "55 Crystal Falls Dr",
    location: "Leander, TX",
    type: "3 bed / 2 bath",
    tenants: 1,
    tickets: 2,
    balance: "$120",
  },
  {
    id: 8,
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

const FILTERS = ["ALL", "OCCUPIED", "VACANT"];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      {/* ── Header row ── */}
      <div className="flex justify-between flex-col sm:flex-row sm:items-center  mb-5">
        {/* Title */}
        <h1 className="text-xl font-bold text-[#0F1114] flex-shrink-0">
          Portfolio
        </h1>

        <div className="flex">
          {/* Search bar */}
          <div className="flex items-center bg-white border border-[#0F11141A] rounded-full px-4 py-2 gap-2 flex-1 min-w-[344px] mr-2">
            <SearchIcon color="#9CA3AF" />
            <input
              type="text"
              placeholder="Search by address, city, owner, tag..."
              className="bg-transparent border-none outline-none text-sm text-gray-600 placeholder-gray-400 w-full"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2  flex-shrink-0">
            <button className="px-5 py-2 border border-[#0F1114] rounded-full text-sm font-semibold text-[#0F1114] hover:bg-gray-50 transition">
              IMPORT
            </button>
            <button
              onClick={() => navigate("/portfolio/add-property")}
              className="flex items-center gap-2 px-5 py-2 bg-[linear-gradient(225.01deg,#3388FF_0%,#004CE6_100%)] shadow-[0px_4px_8px_-2px_#004CE580] rounded-full text-sm font-semibold text-white hover:opacity-90 transition"
            >
              <PlusIcon />
              ADD PROPERTY
            </button>
          </div>
        </div>
      </div>

      {/* ── Filter tabs ── */}
      <div className="flex items-center gap-2 mb-5">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-[7px] rounded-full text-sm font-semibold transition
              ${
                activeFilter === f
                  ? "bg-[#0F1114] text-white"
                  : "bg-white border border-[#0F11141A] text-[#0F1114] hover:bg-gray-50"
              }
            `}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ── Property grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 pb-6">
        {PORTFOLIO_PROPERTIES.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </DashboardLayout>
  );
}
