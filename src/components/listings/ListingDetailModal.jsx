import { useEffect, useRef } from "react";
import area from "../../assets/icons/tape-measure-fitness-ruler.svg";
import bed from "../../assets/icons/Bed.svg";
import bath from "../../assets/icons/bathroom-tub-towel.svg";
import message from "../../assets/icons/Message.svg";

/* ── Icons ─────────────────────────────────────────────── */
function XIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function AreaIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#374151"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3h6M3 3v6M21 3h-6M21 3v6M3 21h6M3 21v-6M21 21h-6M21 21v-6" />
    </svg>
  );
}

function BedIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#374151"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 9V5a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v4" />
      <path d="M2 9h20v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V9z" />
      <line x1="2" y1="14" x2="22" y2="14" />
      <line x1="7" y1="9" x2="7" y2="9.01" />
    </svg>
  );
}

function BathIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#374151"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 6l1-1a1 1 0 0 1 1.42 0l.58.58" />
      <path d="M4 12h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-3z" />
      <line x1="4" y1="12" x2="4" y2="7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="14"
      height="14"
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
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

/* ── Gallery images (Unsplash) ────────────────────────── */
const GALLERY_IMGS = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=500&auto=format&fit=crop&q=80",
];

/* ── Inner Map ─────────────────────────────────────────── */
function DetailMap({ address }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!document.querySelector('link[href*="leaflet"]')) {
      const leafletStyle = document.createElement("link");
      leafletStyle.rel = "stylesheet";
      leafletStyle.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(leafletStyle);
    }

    import("leaflet").then((L) => {
      if (mapInstanceRef.current) return;

      const map = L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
      }).setView([37.8044, -122.2712], 13);

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

      L.marker([37.8044, -122.2712], { icon: customIcon }).addTo(map);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className="w-full rounded-xl overflow-hidden"
      style={{ height: 200 }}
    />
  );
}

/* ── Main Modal ────────────────────────────────────────── */
export default function ListingDetailModal({ listing, onClose }) {
  const overlayRef = useRef(null);

  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) onClose();
  }

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    // Prevent body scroll while modal open
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!listing) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex justify-end"
      style={{ background: "rgba(15,17,20,0.45)" }}
    >
      <div className="relative bg-white h-full w-full max-w-[544px] flex flex-col shadow-2xl animate-slide-in rounded-l-[32px]">
        {/* ── Header ── */}
        <div className="px-6 pt-5 pb-[27px] border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-[#0F1114]">Listing Detail</h2>
            <div className="flex items-center gap-2">
              <button className="px-4 py-[13px] border border-[#0F1114] rounded-full text-xs font-extrabold text-[#0F1114] hover:bg-gray-50 transition uppercase tracking-wide">
                Share
              </button>
              <button className="px-4 py-[13px] rounded-full text-xs font-extrabold text-white bg-[linear-gradient(225.01deg,#3388FF_0%,#004CE6_100%)] shadow-[0px_4px_8px_-2px_#004CE580] hover:opacity-90 transition uppercase tracking-wide">
                Save
              </button>
              <button
                onClick={onClose}
                className="p-1.5 border border-[#0F11141A] rounded-full hover:bg-gray-100 transition text-gray-500 flex-shrink-0"
              >
                <XIcon />
              </button>
            </div>
          </div>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="flex-1 overflow-y-auto">
          {/* Photo Gallery */}
          <div className="px-6 pt-5">
            <div
              className="grid grid-cols-3 gap-2"
              style={{ gridTemplateRows: "auto auto" }}
            >
              {/* Large left image */}
              <div
                className="row-span-2 col-span-1 rounded-xl overflow-hidden"
                style={{ height: 200 }}
              >
                <img
                  src={listing.image || GALLERY_IMGS[0]}
                  alt="main"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Top right */}
              <div
                className="rounded-xl overflow-hidden"
                style={{ height: 96 }}
              >
                <img
                  src={GALLERY_IMGS[1]}
                  alt="room"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Top far right */}
              <div
                className="rounded-xl overflow-hidden"
                style={{ height: 96 }}
              >
                <img
                  src={GALLERY_IMGS[2]}
                  alt="room"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Bottom right */}
              <div
                className="rounded-xl overflow-hidden"
                style={{ height: 96 }}
              >
                <img
                  src={GALLERY_IMGS[3]}
                  alt="room"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Bottom far right with "View more" overlay */}
              <div
                className="relative rounded-xl overflow-hidden"
                style={{ height: 96 }}
              >
                {/* <img
                  src={GALLERY_IMGS[4]}
                  alt="room"
                  className="w-full h-full object-cover"
                /> */}
                <div className="absolute inset-0 bg-white/50 flex items-center justify-center p-2">
                  <span className="text-black text-xs font-bold cursor-pointer">
                    View more
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Address + Stats */}
          <div className="px-6 pt-5 pb-4 border-b border-gray-100">
            <h3 className="text-base font-bold text-[#0F1114] leading-tight">
              {listing.name}
            </h3>
            <p className="text-sm font-medium text-[#0F1114CC] mt-1">
              {listing.address}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-2 mt-2 text-base text-[#00091A] font-semibold flex-wrap">
              <span className="flex items-center gap-[6px]">
                <img src={area} alt="area" className="w-5 h-5" /> {listing.sqft}
              </span>
              <span className="text-[#0F111466]">|</span>
              <span className="flex items-center gap-[6px]">
                <img src={bed} alt="bedrooms" className="w-5 h-5" />{" "}
                {listing.beds}
              </span>
              <span className="text-[#0F111466]">|</span>
              <span className="flex items-center gap-[6px]">
                <img src={bath} alt="bathrooms" className="w-5 h-5" />{" "}
                {listing.baths}
              </span>
            </div>

            {/* Price */}
            <p className="text-xl font-extrabold text-[#0F1114] mt-[22px]">
              {listing.price}
            </p>
          </div>

          {/* Property Overview */}
          <div className="px-6 py-7 border-y border-[#0F11141A]">
            <h4 className="text-base font-bold text-[#0F1114] mb-1">
              Property Overview
            </h4>
            <p className="text-xs text-[#0F1114CC] font-medium mb-[5px]">
              Bright, modern home with open layout and great natural light.
            </p>

            {/* Highlights + Fees grid */}
            <div className="grid grid-cols-2 gap-3 mt-[21px] mb-1">
              <div className="border border-[#0F11141A] rounded-xl py-[14px] px-4">
                <p className="text-xs font-semibold text-[#0F111499] uppercase tracking-wider mb-[5px]">
                  Highlights
                </p>
                <p className="text-sm font-bold text-[#0F1114]">
                  In-unit laundry • Private yard • Updated kitchen
                </p>
              </div>
              <div className="border border-[#0F11141A] rounded-xl py-[14px] px-4">
                <p className="text-xs font-semibold text-[#0F111499] uppercase tracking-wider mb-[5px]">
                  Fees &amp; Policies
                </p>
                <p className="text-sm font-semibold text-[#0F1114] leading-relaxed">
                  Deposit: 1x rent • Application fee: $55 • Move-in fees may
                  apply
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="px-6 py-7 border-b border-gray-100">
            <h4 className="text-base font-bold text-[#0F1114] mb-[5px]">
              Description
            </h4>
            <p className="text-xs text-[#0F1114CC] font-medium leading-relaxed">
              Welcome home to a charming 2 bed / 2 bath with updated kitchen,
              in-unit laundry, and a spacious yard. Close to local shops and
              transit.
            </p>
          </div>

          {/* Fees & Policies */}
          <div className="px-6 py-7 border-b border-[#0F11141A]">
            <h4 className="text-base font-bold text-[#0F1114] mb-5">
              Fees &amp; policies
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-[#0F11141A] rounded-xl py-[14px] px-4">
                <p className="text-xs font-semibold text-[#0F1114CC] uppercase tracking-wider mb-[5px]">
                  Pets
                </p>
                <p className="text-sm font-bold text-[#0F1114]">
                  Cats allowed • Dogs allowed
                </p>
              </div>
              <div className="border border-[#0F11141A] rounded-xl py-[14px] px-4">
                <p className="text-xs font-semibold text-[#0F1114CC] uppercase tracking-wider mb-[5px]">
                  Amenities
                </p>
                <p className="text-sm font-bold text-[#0F1114] leading-relaxed">
                  Hardwood floors • Dishwasher • Parking • Dual-pane windows
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="px-6 py-7 border-b border-[#0F11141A] mb-1">
            <h4 className="text-base font-bold text-[#0F1114] mb-5">Contact</h4>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold bg-[#F5F5F5] text-[#0F1114]">
                <PhoneIcon />
                {listing.phone}
              </span>
              <span className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold bg-[#F5F5F5] text-[#0F1114]">
                <MailIcon />
                {listing.email}
              </span>
            </div>
            <button className="flex items-center gap-2 px-5 py-3 bg-[#0F1114] rounded-full text-xs font-extrabold text-white hover:bg-[#1f2937] transition">
              <img src={message} alt="message" className="w-5 h-5" />
              ASK A QUESTION
            </button>
          </div>

          {/* Address */}
          <div className="px-6 py-7 border-b border-[#0F11141A]">
            <h4 className="text-base font-bold text-[#0F1114] mb-1">Address</h4>
            <p className="text-sm font-medium text-[#0F1114CC]">
              {listing.address}
            </p>
          </div>

          {/* Map */}
          <div className="px-6 py-7 pb-8">
            <h4 className="text-base font-bold text-[#0F1114] mb-3">Map</h4>
            <DetailMap address={listing.address} />
          </div>
        </div>
      </div>
    </div>
  );
}
