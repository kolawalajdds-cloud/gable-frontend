import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import InviteModal from "../components/tenants/InviteModal";
import AddTenantModal from "../components/tenants/AddTenantModal";

/* ─── Inline SVG icons ────────────────────────────────────── */
function SearchIcon() {
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
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function ChevronDown({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
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
function ChatIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6B7280"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function EditIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6B7280"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
function TrashIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6B7280"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}
function ImportIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
function InviteIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.77 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.7 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l1-1.03a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16l.19.92z" />
    </svg>
  );
}

/* ─── Tenant data ─────────────────────────────────────────── */
const TENANTS = [
  {
    id: 1,
    initials: "JL",
    color: "#EFF6FF",
    textColor: "#3B82F6",
    name: "Jordan Lee",
    email: "jordan@email.com",
    property: "55 Crystal Falls Dr",
    unit: "Main",
    status: "",
    leaseStart: "Nov 1, 2025",
    leaseEnd: "Oct 31, 2026",
    balance: "$125 due",
    balanceColor: "#EF4444",
  },
  {
    id: 2,
    initials: "TG",
    color: "#F0FDF4",
    textColor: "#16A34A",
    name: "Taylor Green",
    email: "taylor@email.com",
    property: "123 Oak St • Unit 4",
    unit: "Unit 4",
    status: "",
    leaseStart: "Aug 1, 2025",
    leaseEnd: "Jul 31, 2026",
    balance: "$0",
    balanceColor: "#374151",
  },
  {
    id: 3,
    initials: "AP",
    color: "#FEF3C7",
    textColor: "#D97706",
    name: "Avery Patel",
    email: "avery@email.com",
    property: "123 Oak St • Unit 4",
    unit: "Unit 4",
    status: "",
    leaseStart: "Feb 15, 2026",
    leaseEnd: "Feb 14, 2027",
    balance: "$0",
    balanceColor: "#374151",
  },
  {
    id: 4,
    initials: "MD",
    color: "#F5F3FF",
    textColor: "#7C3AED",
    name: "Morgan Diaz",
    email: "morgan@email.com",
    property: "Portfolio",
    unit: "-",
    status: "",
    leaseStart: "Jan 1, 2024",
    leaseEnd: "Dec 31, 2024",
    balance: "$50 credit",
    balanceColor: "#16A34A",
  },
];

/* ─── Avatar ──────────────────────────────────────────────── */
function Avatar({ initials, color, textColor, size = "md" }) {
  const sz = size === "sm" ? "w-8 h-8 text-xs" : "w-9 h-9 text-sm";
  return (
    <div
      className={`${sz} rounded-full flex items-center justify-center font-bold flex-shrink-0`}
      style={{ backgroundColor: color, color: textColor }}
    >
      {initials}
    </div>
  );
}

/* ─── Tenant Row ──────────────────────────────────────────── */
function TenantRow({ tenant, isSelected, onClick }) {
  return (
    <tr
      className={`border-b border-gray-100 cursor-pointer transition-colors ${isSelected ? "bg-blue-50/40" : "hover:bg-gray-50"}`}
      onClick={onClick}
    >
      <td className="py-3 px-4">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar
            initials={tenant.initials}
            color={tenant.color}
            textColor={tenant.textColor}
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#111827] whitespace-nowrap">
              {tenant.name}
            </p>
            <p className="text-xs text-gray-400 whitespace-nowrap">
              {tenant.email}
            </p>
          </div>
        </div>
      </td>
      <td className="py-3 px-4 text-sm text-[#374151] whitespace-nowrap hidden sm:table-cell">
        {tenant.property}
      </td>
      <td className="py-3 px-4 text-sm text-[#374151] whitespace-nowrap hidden md:table-cell">
        {tenant.unit}
      </td>
      <td className="py-3 px-4 hidden lg:table-cell">
        {tenant.status && (
          <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
            {tenant.status}
          </span>
        )}
      </td>
      <td className="py-3 px-4 text-sm text-[#374151] whitespace-nowrap hidden xl:table-cell">
        {tenant.leaseStart} → {tenant.leaseEnd}
      </td>
      <td
        className="py-3 px-4 text-sm font-semibold whitespace-nowrap"
        style={{ color: tenant.balanceColor }}
      >
        {tenant.balance}
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <button
            className="p-1.5 rounded-md hover:bg-gray-100 transition"
            onClick={(e) => e.stopPropagation()}
          >
            <ChatIcon />
          </button>
          <button
            className="p-1.5 rounded-md hover:bg-gray-100 transition"
            onClick={(e) => e.stopPropagation()}
          >
            <EditIcon />
          </button>
          <button
            className="p-1.5 rounded-md hover:bg-red-50 transition"
            onClick={(e) => e.stopPropagation()}
          >
            <TrashIcon />
          </button>
        </div>
      </td>
    </tr>
  );
}

/* ─── Overview panel ──────────────────────────────────────── */
function OverviewPanel({ tenant }) {
  if (!tenant) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex-1">
        <h2 className="text-base font-bold text-[#111827] mb-3">Overview</h2>
        <p className="text-sm text-gray-400">
          Select a tenant to view details.
        </p>
        <p className="text-xs text-gray-400 mt-4">
          Tip: Use Invite tenant to send a signup link, or Add tenant for manual
          entry.
        </p>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex-1">
      <h2 className="text-base font-bold text-[#111827] mb-4">Overview</h2>

      {/* Tenant header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <Avatar
            initials={tenant.initials}
            color={tenant.color}
            textColor={tenant.textColor}
            size="sm"
          />
          <div>
            <p className="text-sm font-bold text-[#111827]">{tenant.name}</p>
            <p className="text-xs text-gray-400">Portfolio · Past tenant</p>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button className="px-4 py-1.5 border border-gray-300 rounded-full text-xs font-bold text-[#111827] hover:bg-gray-50 transition uppercase tracking-wide">
            MESSAGE
          </button>
          <button className="px-4 py-1.5 border border-gray-300 rounded-full text-xs font-bold text-[#111827] hover:bg-gray-50 transition uppercase tracking-wide">
            REQUEST PAYMENT
          </button>
        </div>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-2 gap-px bg-gray-100 rounded-xl overflow-hidden border border-gray-100 mb-4">
        <div className="bg-white px-4 py-3">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
            Lease Term
          </p>
          <p className="text-sm font-bold text-[#111827] leading-snug">
            {tenant.leaseStart} to
            <br />
            {tenant.leaseEnd}
          </p>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
            Rent
          </p>
          <p className="text-sm font-bold text-[#111827]">-</p>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
            Phone
          </p>
          <p className="text-sm font-bold text-[#111827]">(510) 555-0199</p>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
            Email
          </p>
          <p className="text-sm font-bold text-[#111827] break-all">
            {tenant.email}
          </p>
        </div>
      </div>

      <p className="text-xs text-gray-400">
        Tip: Use Invite tenant to send a signup link, or Add tenant for manual
        entry.
      </p>
    </div>
  );
}

/* ─── Tasks & Reminders panel ─────────────────────────────── */
function TasksPanel() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex-1">
      <h2 className="text-base font-bold text-[#111827] mb-4">
        Tasks &amp; reminders
      </h2>
      <div className="bg-blue-50 rounded-lg px-4 py-3 mb-3">
        <p className="text-sm text-blue-600 font-medium leading-snug">
          Coming soon: lease renewals, move-in/out checklists, and automated
          reminders.
        </p>
      </div>
      <p className="text-xs text-gray-400">
        Tip: Use Invite tenant to send a signup link, or Add tenant for manual
        entry.
      </p>
    </div>
  );
}

/* ─── Tenants Page ────────────────────────────────────────── */
export default function TenantsPage() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(TENANTS[TENANTS.length - 1].id);
  const [showInvite, setShowInvite] = useState(false);
  const [showAddTenant, setShowAddTenant] = useState(false);

  const filtered = TENANTS.filter((t) => {
    const q = search.toLowerCase();
    return (
      t.name.toLowerCase().includes(q) ||
      t.email.toLowerCase().includes(q) ||
      t.property.toLowerCase().includes(q)
    );
  });

  const selectedTenant = TENANTS.find((t) => t.id === selectedId) || null;

  return (
    <DashboardLayout>
      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-[#0F1114]">Tenants</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage leases, contacts, balances, and tenant communication.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {/* IMPORT */}
          <button className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 rounded-full text-sm font-semibold text-[#111827] hover:bg-gray-50 transition uppercase tracking-wide">
            <ImportIcon />
            Import
          </button>
          {/* INVITE */}
          <button
            onClick={() => setShowInvite(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#111827] rounded-full text-sm font-semibold text-white hover:bg-[#1f2937] transition uppercase tracking-wide"
          >
            <InviteIcon />
            Invite
          </button>
          {/* MOVE IN */}
          <button className="flex items-center gap-1.5 px-4 py-2 bg-[#111827] rounded-full text-sm font-semibold text-white hover:bg-[#1f2937] transition uppercase tracking-wide">
            Move In
          </button>
          {/* ADD TENANT */}
          <button
            onClick={() => setShowAddTenant(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#2563EB] rounded-full text-sm font-semibold text-white hover:bg-[#1d4ed8] transition"
          >
            <svg
              width="15"
              height="15"
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
            Add Tenant
          </button>
        </div>
      </div>

      {/* ── Table card ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4">
        {/* Filters row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 pt-4 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2 bg-[#F9FAFB] border border-gray-200 rounded-full px-3 py-2 w-full sm:w-[280px]">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search: name, unit, property, phone, email..."
              className="bg-transparent border-none outline-none text-xs text-gray-600 placeholder-gray-400 w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-full text-xs font-semibold text-[#374151] hover:bg-gray-50 transition">
              All Balances <ChevronDown />
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-full text-xs font-semibold text-[#374151] hover:bg-gray-50 transition">
              All Status <ChevronDown />
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-full text-xs font-semibold text-[#374151] hover:bg-gray-50 transition">
              All Properties <ChevronDown />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2.5 px-4 text-xs font-semibold text-gray-500">
                  Tenant
                </th>
                <th className="text-left py-2.5 px-4 text-xs font-semibold text-gray-500 hidden sm:table-cell">
                  Property
                </th>
                <th className="text-left py-2.5 px-4 text-xs font-semibold text-gray-500 hidden md:table-cell">
                  Unit
                </th>
                <th className="text-left py-2.5 px-4 text-xs font-semibold text-gray-500 hidden lg:table-cell">
                  Status
                </th>
                <th className="text-left py-2.5 px-4 text-xs font-semibold text-gray-500 hidden xl:table-cell">
                  Lease
                </th>
                <th className="text-left py-2.5 px-4 text-xs font-semibold text-gray-500">
                  Balance
                </th>
                <th className="text-left py-2.5 px-4 text-xs font-semibold text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-8 text-sm text-gray-400"
                  >
                    No tenants found.
                  </td>
                </tr>
              ) : (
                filtered.map((t) => (
                  <TenantRow
                    key={t.id}
                    tenant={t}
                    isSelected={selectedId === t.id}
                    onClick={() => setSelectedId(t.id)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Bottom panels ── */}
      <div className="flex flex-col lg:flex-row gap-4">
        <OverviewPanel tenant={selectedTenant} />
        <TasksPanel />
      </div>
      {showInvite && <InviteModal onClose={() => setShowInvite(false)} />}
      {showAddTenant && (
        <AddTenantModal onClose={() => setShowAddTenant(false)} />
      )}
    </DashboardLayout>
  );
}
