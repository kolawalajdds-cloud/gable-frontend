import { useEffect, useRef, useState } from "react";

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
function ChevDown() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
function CalIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#9CA3AF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg
      width="13"
      height="13"
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

/* ── Shared ─────────────────────────────────────────────── */
const PROPERTIES = ["123 Oak • Unit 4", "55 Crystal Falls Dr", "Portfolio"];
const LEASE_TYPES = ["Fixed", "Month-to-Month"];
const ALL_TENANTS = [
  "Taylor Green",
  "Jordan Lee",
  "Avery Patel",
  "Morgan Diaz",
];

/* ── Field label ─────────────────────────────────────────── */
function FieldLabel({ children, className = "" }) {
  return (
    <label
      className={`block text-xs font-bold text-[#0F1114] uppercase mb-[5px] ${className}`}
    >
      {children}
    </label>
  );
}

/* ── Select ──────────────────────────────────────────────── */
function SelectField({ value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="w-full border border-[#0F11141A] rounded-full px-5 py-[14px] text-xs font-semibold text-[#0F1114] appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#0F1114]">
        <ChevDown />
      </span>
    </div>
  );
}

/* ── Date input ──────────────────────────────────────────── */
function DateField({ value, onChange }) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full border border-[#0F11141A] rounded-full px-5 py-[14px] pr-11 text-xs font-semibold text-[#0F1114] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      />
      <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <CalIcon />
      </span>
    </div>
  );
}

/* ── Section header ──────────────────────────────────────── */
function SectionHeader({ title, subtitle }) {
  return (
    <div className="mt-[16px] mb-3">
      <h3 className="text-base font-bold text-[#0F1114]">{title}</h3>
      {subtitle && (
        <p className="text-xs text-[#0F111499] font-medium mt-0.5">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ── Tenant checkbox ─────────────────────────────────────── */
function TenantCheckbox({ name, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 border border-[#0F11141A] rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-50 transition select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded border-gray-300 accent-[#2563EB] cursor-pointer flex-shrink-0"
      />
      <span className="text-xs font-bold text-[#0F1114] uppercase tracking-wide whitespace-nowrap">
        {name}
      </span>
    </label>
  );
}

/* ── MoveInModal ─────────────────────────────────────────── */
export default function MoveInModal({ onClose }) {
  const overlayRef = useRef(null);
  const [property, setProperty] = useState("123 Oak • Unit 4");
  const [leaseType, setLeaseType] = useState("Fixed");
  const [leaseNo, setLeaseNo] = useState("");
  const [startsOn, setStartsOn] = useState("24-02-2026");
  const [endsOn, setEndsOn] = useState("24-02-2027");
  const [selectedTenants, setSelectedTenants] = useState({});
  const [insuranceRequired, setInsuranceRequired] = useState(false);

  function toggleTenant(name) {
    setSelectedTenants((prev) => ({ ...prev, [name]: !prev[name] }));
  }

  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) onClose();
  }

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex justify-end"
      style={{ background: "rgba(15,17,20,0.45)" }}
    >
      {/* Panel */}
      <div className="relative bg-white h-full w-full max-w-[544px] flex flex-col shadow-2xl animate-slide-in overflow-hidden rounded-l-[32px]">
        {/* ── Header ── */}
        <div className="px-6 pt-5 pb-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#0F1114]">Move in</h2>
              <p className="text-xs font-medium text-[#0F111499] mt-[3px]">
                Set up lease, tenants, payments, deposits, and utilities.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 border border-[#0F11141A] rounded-full hover:bg-gray-100 transition text-gray-500 flex-shrink-0 mt-0.5"
            >
              <XIcon />
            </button>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto px-6 pb-4">
          {/* SELECT PROPERTY */}
          <div className="">
            <FieldLabel>Select Property</FieldLabel>
            <SelectField
              value={property}
              onChange={(e) => setProperty(e.target.value)}
              options={PROPERTIES}
            />
            <p className="text-xs text-[#0F111499] font-bold mt-[5px]">
              Select a property dropdown
            </p>
          </div>

          {/* LEASE TERMS */}
          <SectionHeader
            title="Lease Terms"
            subtitle="Select the lease type, start and end dates"
          />

          {/* Lease type + Lease # */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <FieldLabel>Select Fixed or Month-to-Month</FieldLabel>
              <SelectField
                value={leaseType}
                onChange={(e) => setLeaseType(e.target.value)}
                options={LEASE_TYPES}
              />
            </div>
            <div>
              <FieldLabel>Lease #</FieldLabel>
              <input
                type="text"
                placeholder="Optional"
                value={leaseNo}
                onChange={(e) => setLeaseNo(e.target.value)}
                className="w-full border border-[#0F11141A] rounded-full px-5 py-[14px] text-xs text-[#0F1114] placeholder-[#0F111466] font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Starts on + Ends on */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FieldLabel>Starts On</FieldLabel>
              <DateField
                value={startsOn}
                onChange={(e) => setStartsOn(e.target.value)}
              />
            </div>
            <div>
              <FieldLabel>Ends On</FieldLabel>
              <DateField
                value={endsOn}
                onChange={(e) => setEndsOn(e.target.value)}
              />
            </div>
          </div>

          {/* TENANTS */}
          <SectionHeader
            title="Tenants"
            subtitle="If your tenant is connected with you, the lease will be automatically shared with them"
          />
          <FieldLabel>Choose Tenants</FieldLabel>
          <div className="grid grid-cols-2 gap-2">
            {ALL_TENANTS.map((name) => (
              <TenantCheckbox
                key={name}
                name={name}
                checked={!!selectedTenants[name]}
                onChange={() => toggleTenant(name)}
              />
            ))}
          </div>

          {/* RENTERS INSURANCE */}
          <SectionHeader
            title="Renters Insurance"
            subtitle="Require renters insurance or allow tenants to submit proof of an existing policy."
          />
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={insuranceRequired}
              onChange={() => setInsuranceRequired((v) => !v)}
              className="w-4 h-4 rounded border-gray-300 accent-[#2563EB] cursor-pointer flex-shrink-0"
            />
            <span className="text-xs font-bold text-[#0F1114] uppercase tracking-wide">
              Insurance Required Before Signing
            </span>
          </label>

          {/* DEPENDENTS */}
          <div className="mt-6 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-[#0F1114]">Dependents</h3>
              <p className="text-xs text-[#0F111480] font-medium mt-0.5 max-w-[260px]">
                Dependents live with the property but do not have access to
                Tenant Portal or online payments.
              </p>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 border border-[#0F11141A] rounded-full text-xs font-bold text-[#0F1114] hover:bg-gray-50 transition whitespace-nowrap flex-shrink-0 mt-0.5 uppercase">
              <PlusIcon /> Add Dependent
            </button>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 flex-shrink-0 bg-white">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-[#0F1114] rounded-full text-sm font-bold text-[#0F1114] hover:bg-gray-50 transition uppercase tracking-wide"
          >
            Cancel
          </button>
          <button className="px-6 py-2.5 bg-[#2563EB] rounded-full text-sm font-bold text-white hover:bg-[#1d4ed8] transition uppercase tracking-wide">
            Send Invite
          </button>
        </div>
      </div>
    </div>
  );
}
