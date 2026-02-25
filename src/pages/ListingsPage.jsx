import { useEffect, useRef, useState } from "react";
import DashboardLayout, { SearchIcon } from "../components/DashboardLayout";
import area from "../assets/icons/tape-measure-fitness-ruler.svg";
import bed from "../assets/icons/Bed.svg";
import bath from "../assets/icons/bathroom-tub-towel.svg";
import listing from "../assets/images/listing.jpg";
import map from "../assets/icons/map.svg";
import ListingDetailModal from "../components/listings/ListingDetailModal";

/* ─── Sample listing data ────────────────────────────────── */
const LISTINGS = [
  {
    id: 1,
    name: "Cute Home",
    address: "123 Main St, City",
    price: "$3,200/mo",
    sqft: "1,524 sq ft",
    beds: "3 Bedrooms",
    baths: "3 Bathrooms",
    phone: "(510) 555-7788",
    email: "leasing@domain.com",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "78 Brookwood Pl",
    address: "Oakland, CA",
    price: "$3,200/mo",
    sqft: "1,524 sq ft",
    beds: "3 Bedrooms",
    baths: "3 Bathrooms",
    phone: "(510) 555-7788",
    email: "leasing@domain.com",
    image: listing,
  },
  {
    id: 3,
    name: "55 Crystal Falls Dr",
    address: "Leander, TX",
    price: "$3,200/mo",
    sqft: "1,524 sq ft",
    beds: "3 Bedrooms",
    baths: "3 Bathrooms",
    phone: "(510) 555-7788",
    email: "leasing@domain.com",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&auto=format&fit=crop&q=80",
  },
];

/* ─── Inline SVG icons ───────────────────────────────────── */
function ChevronDown() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0F1114"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0F1114"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6.29 6.29l1.42-1.42a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0F1114"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

/* ─── Filter Pill Button ─────────────────────────────────── */
function FilterPill({ label }) {
  return (
    <button className="flex items-center gap-[14px] px-3.5 py-2 bg-white border border-[#E5E7EB] rounded-full text-xs font-bold text-[#0F1114] hover:bg-gray-50 transition whitespace-nowrap">
      {label}
      <ChevronDown />
    </button>
  );
}

/* ─── Listing Card ───────────────────────────────────────── */
function ListingCard({ listing, onSelect }) {
  return (
    <div
      className="rounded-xl border border-[#F3F4F6] h-fit cursor-pointer hover:shadow-md transition"
      onClick={() => onSelect(listing)}
    >
      {/* Photo */}
      <div className="h-[160px] overflow-hidden rounded-2xl">
        <img
          src={listing.image}
          alt={listing.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 rounded-2xl "
        />
      </div>

      {/* Body */}
      <div className="pt-3 pb-3.5">
        {/* Name + Price */}
        <div className="flex justify-between items-start gap-2 mb-2.5">
          <div>
            <h4 className="text-base font-bold text-[#0F1114] leading-tight">
              {listing.name}
            </h4>
            <p className="text-sm font-medium text-[#0F1114CC] mt-[5px]">
              {listing.address}
            </p>
          </div>
          <span className="text-sm font-extrabold text-[#0F1114] ">
            {listing.price}
          </span>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-2 mt-2 text-base text-[#00091A] font-semibold flex-wrap">
          <span className="flex items-center gap-[6px]">
            <img src={area} alt="area" className="w-5 h-5" /> {listing.sqft}
          </span>
          <span className="text-[#0F111466]">|</span>
          <span className="flex items-center gap-[6px]">
            <img src={bed} alt="bedrooms" className="w-5 h-5" /> {listing.beds}
          </span>
          <span className="text-[#0F111466]">|</span>
          <span className="flex items-center gap-[6px]">
            <img src={bath} alt="bathrooms" className="w-5 h-5" />{" "}
            {listing.baths}
          </span>
        </div>

        {/* Contact chips */}
        <div className="flex gap-2 flex-wrap mt-[19px]">
          <span className="flex items-center gap-1.5 bg-[#F5F5F5] rounded-full px-2.5 py-1 text-xs text-[#0F1114] font-semibold">
            <PhoneIcon />
            {listing.phone}
          </span>
          <span className="flex items-center gap-1.5 bg-[#F5F5F5] rounded-full px-2.5 py-1 text-xs text-[#0F1114] font-semibold">
            <MailIcon />
            {listing.email}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Map Panel ──────────────────────────────────────────── */
function MapPanel() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Dynamically load Leaflet CSS
    if (!document.querySelector('link[href*="leaflet"]')) {
      const leafletStyle = document.createElement("link");
      leafletStyle.rel = "stylesheet";
      leafletStyle.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(leafletStyle);
    }

    // Dynamically import Leaflet and init map
    import("leaflet").then((L) => {
      // Prevent double init (React StrictMode)
      if (mapInstanceRef.current) return;

      const map = L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: false,
      });

      mapInstanceRef.current = map;

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        { maxZoom: 19 },
      ).addTo(map);

      const customIcon = L.divIcon({
        className: "custom-map-marker",
        html: `<div style="background:#CEDAF2;border:1px solid rgba(0,76,229,0.5);border-radius:8px;height:32px;width:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0px 4px 8px -2px rgba(0,76,229,0.3);">
                  <span style="color:#004CE5;font-weight:700;font-size:14px;line-height:1;">$</span>
               </div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const markers = [
        [38.96, -77.34], // Near Sterling/Reston
        [38.64, -77.33], // Near Dale City
        [38.81, -76.75], // Near Upper Marlboro
      ];

      markers.forEach((pos) => {
        L.marker(pos, { icon: customIcon }).addTo(map);
      });

      if (markers.length > 0) {
        const bounds = L.latLngBounds(markers);
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    });

    // Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full bg-white rounded-3xl border border-[#0F11141A] py-[22px] px-[25px]">
      <h3 className="text-sm font-bold text-[#0F1114] mb-3">Map</h3>
      <div className="relative rounded-xl overflow-hidden h-[315px]">
        {/* Leaflet map container */}
        <div ref={mapRef} className="absolute inset-0 z-0 w-full h-full" />

        {/* Badge — sits above the map */}
        <div className="absolute top-2.5 left-2.5 z-50 flex items-center gap-1.5 bg-white rounded-full px-[13px] py-2 text-xs font-bold text-[#374151] shadow-md pointer-events-none hover:cursor-pointer">
          <img src={map} alt="map" className="w-4 h-4" />
          Map displaying rentals
        </div>
        <div className="absolute top-2.5 right-2.5 z-50 flex items-center gap-1.5 bg-[#F3F4F6] rounded-full px-4 py-[9px] text-xs font-bold text-[#0F1114] shadow-md pointer-events-none hover:cursor-pointer">
          3 rentals
        </div>
      </div>
    </div>
  );
}

/* ─── List Panel ─────────────────────────────────────────── */
function ListPanel({ onSelect }) {
  return (
    <div className="w-full bg-white rounded-3xl border border-[#0F11141A] px-[25px] py-[22px] flex flex-col max-h-[700px] ">
      {/* Header */}
      <div className="flex justify-between items-start flex-wrap mb-3.5 flex-shrink-0">
        <div>
          <p className="text-base font-bold text-[#0F1114] mb-4">List view</p>
        </div>
        <div className="w-full flex justify-between items-center gap-3 flex-wrap">
          <div>
            <h4 className="text-base font-extrabold text-[#0F1114]">
              Homes for rent in City
            </h4>
            <p className="text-sm font-bold text-[#0F1114]/40 mt-[5px]">
              3 Rentals Available
            </p>
          </div>
          <button className="px-4 py-3 border border-[#0F11141A] rounded-full text-xs font-bold text-[#374151] bg-white hover:bg-gray-50 transition whitespace-nowrap flex-shrink-0">
            BACK TO SEARCH
          </button>
        </div>
      </div>

      {/* Scrollable cards */}
      <div className="overflow-y-auto flex flex-col gap-6 pb-2">
        {LISTINGS.map((l) => (
          <ListingCard key={l.id} listing={l} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}

/* ─── Listings Page ──────────────────────────────────────── */
export default function ListingsPage() {
  const [searchVal, setSearchVal] = useState("");
  const [selectedListing, setSelectedListing] = useState(null);

  return (
    <DashboardLayout>
      {/* ── Page Header ── */}
      <div className="flex justify-between items-start flex-wrap gap-3 mb-5">
        <div>
          <h1 className="text-xl font-bold text-[#0F1114]">Listings</h1>
          <p className="text-xs font-medium text-[#0F111499] mt-1">
            Discover your new home
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button className="px-5 py-[13px] border border-[#0F1114] rounded-full text-sm font-extrabold text-[#0F1114] bg-white hover:bg-gray-50 transition">
            SHARE
          </button>
          <button className="px-5 py-[13px] rounded-full text-sm font-extrabold text-white bg-[linear-gradient(225.01deg,#3388FF_0%,#004CE6_100%)] shadow-[0px_4px_8px_-2px_#004CE580] hover:opacity-90 transition">
            SAVE
          </button>
        </div>
      </div>

      {/* ── Filters Bar ── */}
      <div className="flex flex-wrap gap-2 items-center mb-5 w-full justify-between">
        {/* Search input */}
        <div className="flex items-center gap-2 bg-white border border-[#E5E7EB] rounded-full px-2 py-2 flex-1 min-w-[180px] max-w-[425px]">
          <SearchIcon color="#9CA3AF" />
          <input
            type="text"
            placeholder="Location, address, neighbourhood..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-[#374151] placeholder-[#0F111466] w-full"
          />
        </div>

        <div className="flex gap-2">
          <FilterPill label="PRICE" />
          <FilterPill label="BEDS/BATHS" />
          <FilterPill label="HOME TYPE" />
          <button className="flex items-center gap-1.5 px-3.5 py-[13px] bg-white border border-[#0F11141A] rounded-full text-xs font-bold text-[#0F1114] hover:bg-gray-50 transition whitespace-nowrap">
            ALL FILTERS
          </button>
          <button className="px-3.5 py-[13px] text-xs font-semibold text[#0F1114] hover:text-[#0F1114] border border-[#0F11141A] rounded-full transition whitespace-nowrap ">
            RESET
          </button>
          <button className="px-3.5 py-[13px] text-xs font-bold text-[#0F1114] hover:text-[#0F1114] border border-[#0F11141A] rounded-full transition whitespace-nowrap uppercase tracking-wide">
            LIST VIEW
          </button>
        </div>
      </div>

      {/* ── Content: Map + List ── */}
      <div className="w-full flex flex-col lg:flex-row gap-4 items-start">
        <MapPanel />
        <ListPanel onSelect={setSelectedListing} />
      </div>

      {/* ── Listing Detail Modal ── */}
      {selectedListing && (
        <ListingDetailModal
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
        />
      )}
    </DashboardLayout>
  );
}
