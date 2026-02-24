import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoSvg from "../assets/icons/logo.svg";
import icoDashboard from "../assets/icons/dashboard.svg";
import icoPortfolio from "../assets/icons/portfolio.svg";
import icoTenants from "../assets/icons/tenants.svg";
import icoListings from "../assets/icons/listing.svg";
import icoApplications from "../assets/icons/Notepad.svg";
import icoAccounting from "../assets/icons/Accounting.svg";
import icoDocuments from "../assets/icons/Documents.svg";
import icoMaintenance from "../assets/icons/maintenance.svg";
import icoInspections from "../assets/icons/inspection.svg";
import icoCalendar from "../assets/icons/calendar.svg";
import icoContacts from "../assets/icons/contacts.svg";
import icoMessages from "../assets/icons/Messages.svg";
import icoSettings from "../assets/icons/Settings.svg";

/* ─── Nav items (no hardcoded active) ───────────────────── */
export const NAV_ITEMS = [
  { label: "Dashboard", icon: icoDashboard, href: "/dashboard" },
  { label: "Portfolio", icon: icoPortfolio, href: "/portfolio" },
  { label: "Tenants", icon: icoTenants, href: "/tenants" },
  { label: "Listings", icon: icoListings, href: "#" },
  { label: "Applications", icon: icoApplications, href: "#" },
  { label: "Accounting", icon: icoAccounting, href: "#" },
  { label: "Documents", icon: icoDocuments, href: "#" },
  { label: "Maintenance", icon: icoMaintenance, href: "#" },
  { label: "Inspections", icon: icoInspections, href: "#" },
  { label: "Calendar", icon: icoCalendar, href: "#" },
  { label: "Contacts", icon: icoContacts, href: "#" },
  { label: "Messages", icon: icoMessages, href: "#" },
  { label: "Settings", icon: icoSettings, href: "#" },
];

/* ════════════════════ UTILITY ICONS ═══════════════════════ */
export function BellIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0F1114"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}
export function ChevronDownIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0F1114"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
export function MenuIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
export function DotsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="5" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="12" cy="19" r="1.5" />
    </svg>
  );
}
export function SearchIcon({ color = "#9CA3AF" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
export function UserIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#004CE5"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
export function PlusIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

/* ════════════════════ PROPERTY CARD ═══════════════════════ */
export function PropertyCard({ property }) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
      <div className="relative h-[180px] overflow-hidden">
        <img
          src={property.image}
          alt={property.address}
          className="w-full h-full object-cover"
        />
        <button className="absolute bottom-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-gray-500 hover:bg-white shadow-sm">
          <DotsIcon />
        </button>
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div>
          <h4 className="text-base font-extrabold text-[#0F1114]">
            {property.address}
          </h4>
          <p className="text-xs font-medium text-[#0F1114CC] mt-0.5">
            {property.location} •{" "}
            <span className="font-bold text-[#0F1114CC]">{property.type}</span>
          </p>
        </div>
        <div className="flex gap-4 mt-1">
          <StatItem label="Tenants" value={property.tenants} />
          <StatItem label="Open Tickets" value={property.tickets} />
          <StatItem label="Balance" value={property.balance} />
        </div>
        <div className="flex gap-2 mt-2">
          <ActionBtn label="OPEN" />
          <ActionBtn label="LEDGER" />
          <ActionBtn label="MAINT..." />
        </div>
      </div>
    </div>
  );
}

export function StatItem({ label, value }) {
  return (
    <div className="flex flex-col items-center w-full">
      <span className="text-sm font-bold text-[#0F1114]">{value}</span>
      <span className="text-[10px] font-medium text-[#0F1114] whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

export function ActionBtn({ label }) {
  return (
    <button className="flex-1 py-1.5 bg-[#F5F5F5] rounded-[80px] text-[10px] sm:text-xs font-semibold text-[#0F1114] hover:bg-gray-100 transition uppercase tracking-wide">
      {label}
    </button>
  );
}

/* ════════════════════ SIDEBAR ══════════════════════════════ */
function Sidebar({ isOpen, onClose }) {
  const { pathname } = useLocation();
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`
        fixed top-0 left-0 h-full w-[220px] bg-white z-40
        flex flex-col transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto
      `}
      >
        <nav className="flex-1 overflow-y-auto py-3 px-6 border-r border-[#0F11141A]">
          {NAV_ITEMS.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.label}
                to={item.href}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-3 py-[11px] rounded-[80px] text-sm font-medium mb-2
                  transition-colors duration-150
                  ${
                    active
                      ? "bg-[linear-gradient(225.01deg,#3388FF_0%,#004CE6_100%)] shadow-[0px_4px_8px_-2px_#004CE580] text-white font-bold"
                      : "text-[#4B5563] hover:bg-gray-100 hover:text-[#111827]"
                  }
                `}
              >
                <img
                  src={item.icon}
                  alt={item.label}
                  className={`w-5 h-5 flex-shrink-0 ${active ? "brightness-0 invert" : "opacity-60"}`}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

/* ════════════════════ TOPBAR ═══════════════════════════════ */
function Topbar({ onMenuClick }) {
  return (
    <header className="h-[60px] bg-white border-b border-[#0F11141A] flex items-center px-4 gap-4 sticky top-0 z-20">
      <button
        onClick={onMenuClick}
        className="text-gray-500 hover:text-gray-700 lg:hidden flex-shrink-0"
      >
        <MenuIcon />
      </button>
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-1.5 flex-shrink-0">
            <img src={logoSvg} alt="Gable" className="w-5 h-5" />
            <span className="text-lg font-extrabold text-[#00091A]">Gable</span>
          </Link>
          <div className="flex items-center bg-[#F9FAFB] border border-gray-200 rounded-full px-4 py-2 gap-2 w-[463px] max-w-[calc(100vw-300px)]">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent border-none outline-none text-sm text-gray-600 placeholder-gray-400 w-full"
            />
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button className="text-gray-500 hover:text-gray-700 relative border border-[#0F11141A] rounded-[80px] p-[10px]">
            <BellIcon />
          </button>
          <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 border border-[#0F11141A] rounded-[80px] p-[7px]">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500">
              <UserIcon />
            </div>
            <div className="hidden sm:flex flex-col items-start leading-tight">
              <span className="text-sm font-semibold text-[#111827]">
                Username
              </span>
              <span className="text-xs text-gray-400">Landlord</span>
            </div>
            <ChevronDownIcon />
          </button>
        </div>
      </div>
    </header>
  );
}

/* ════════════════════ DASHBOARD LAYOUT ════════════════════ */
export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen bg-[#F8F9FB] overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-[19px]">
          {children}
        </main>
      </div>
    </div>
  );
}
