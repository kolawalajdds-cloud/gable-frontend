import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import InviteModal from "../components/tenants/InviteModal";
import AddTenantModal from "../components/tenants/AddTenantModal";
import MoveInModal from "../components/tenants/MoveInModal";
import InviteIcon from "../assets/icons/Share.svg";
import ChatIcon from "../assets/icons/Chat.svg";
import EditIcon from "../assets/icons/Edit.svg";
import TrashIcon from "../assets/icons/delete.svg";
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
    textColor: "#3B82F6",
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
      className={`${sz} rounded-lg border border-[#004CE51A] flex items-center justify-center font-bold flex-shrink-0`}
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
            <p className="text-sm font-semibold text-[#0F1114] whitespace-nowrap">
              {tenant.name}
            </p>
            <p className="text-xs text-[#0F1114] whitespace-nowrap">
              {tenant.email}
            </p>
          </div>
        </div>
      </td>
      <td className="py-3 px-4 text-sm text-[#0F1114]/60 font-semibold whitespace-nowrap hidden sm:table-cell">
        {tenant.property}
      </td>
      <td className="py-3 px-4 text-sm text-[#0F1114]/60 font-semibold whitespace-nowrap hidden md:table-cell">
        {tenant.unit}
      </td>
      <td className="py-3 px-4 hidden lg:table-cell">
        {tenant.status && (
          <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
            {tenant.status}
          </span>
        )}
      </td>
      <td className="py-3 px-4 text-sm text-[#0F1114]/60 font-semibold whitespace-nowrap hidden xl:table-cell">
        {tenant.leaseStart} → {tenant.leaseEnd}
      </td>
      <td
        className="py-3 px-4 text-sm font-bold whitespace-nowrap"
        style={{ color: tenant.balanceColor }}
      >
        {tenant.balance}
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-1">
          <button
            className="p-2 border border-[#0F11141A] rounded-full hover:bg-gray-100 transition"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={ChatIcon} alt="chat" />
          </button>
          <button
            className="p-2 border border-[#0F11141A] rounded-full hover:bg-gray-100 transition"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={EditIcon} alt="edit" />
          </button>
          <button
            className="p-2 border border-[#0F11141A] rounded-full hover:bg-red-50 transition"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={TrashIcon} alt="trash" />
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
      <div className="bg-white rounded-2xl border border-[#0F11141A] shadow-sm p-5 flex-1">
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

      <div className="border border-[#0F11141A] rounded-xl px-[17px] pt-[17px] pb-[13px]">
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
              <p className="text-sm font-semibold text-[#0F1114]">
                {tenant.name}
              </p>
              <p className="text-xs text-[#0F1114]/60 font-semibold mt-[2px]">
                Portfolio · Past tenant
              </p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button className="px-4 py-[10px] border border-[#0F1114] rounded-full text-xs font-extrabold text-[#0F1114] hover:bg-gray-50 transition uppercase ">
              MESSAGE
            </button>
            <button className="px-4 py-[10px] border border-[#0F1114] rounded-full text-xs font-extrabold text-[#0F1114] hover:bg-gray-50 transition uppercase">
              REQUEST PAYMENT
            </button>
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-gray-100 rounded-xl overflow-hidden border border-gray-100 mb-[9px]">
          <div className="bg-white px-4 py-[14px] border border-[#0F11141A] rounded-lg">
            <p className="text-xs font-semibold text-[#0F111499] uppercase tracking-wider mb-1">
              Lease Term
            </p>
            <p className="text-base font-bold text-[#0F1114]">
              {tenant.leaseStart} to
              <br />
              {tenant.leaseEnd}
            </p>
          </div>
          <div className="bg-white px-4 py-[14px] border border-[#0F11141A] rounded-lg">
            <p className="text-xs font-semibold text-[#0F111499] uppercase tracking-wider mb-1">
              Rent
            </p>
            <p className="text-sm font-bold text-[#111827]">-</p>
          </div>
          <div className="bg-white px-4 py-[14px] border border-[#0F11141A] rounded-lg">
            <p className="text-xs font-semibold text-[#0F111499] uppercase tracking-wider mb-1">
              Phone
            </p>
            <p className="text-sm font-bold text-[#111827]">(510) 555-0199</p>
          </div>
          <div className="bg-white px-4 py-[14px] border border-[#0F11141A] rounded-lg">
            <p className="text-xs font-semibold text-[#0F111499] uppercase tracking-wider mb-1">
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
    </div>
  );
}

/* ─── Tasks & Reminders panel ─────────────────────────────── */
function TasksPanel() {
  return (
    <div className="bg-white rounded-2xl border border-[#0F11141A] px-[25px] py-[21px] flex-1">
      <h2 className="text-base font-bold text-[#111827] mb-4">
        Tasks &amp; reminders
      </h2>
      <div className="bg-[#004CE51A] rounded-xl px-[17px] py-[13px] mb-3 ">
        <p className="text-sm text-[#004CE5] font-bold ">
          Coming soon: lease renewals, move-in/out checklists, and automated
          reminders.
        </p>
      </div>
      <p className="text-xs text-[#0F111499] font-semibold">
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
  const [showMoveIn, setShowMoveIn] = useState(false);

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
          <p className="text-sm text-[#0F111499] mt-0.5">
            Manage leases, contacts, balances, and tenant communication.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {/* IMPORT */}
          <button className="flex items-center gap-1.5 px-4 py-[13px] border border-[#0F1114] rounded-full text-xs font-extrabold text-[#0F1114] hover:bg-gray-50 transition uppercase tracking-wide">
            Import
          </button>
          {/* INVITE */}
          <button
            onClick={() => setShowInvite(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#111827] rounded-full text-sm font-semibold text-white hover:bg-[#1f2937] transition uppercase"
          >
            <img src={InviteIcon} alt="Invite" className="w-5 h-5" />
            Invite
          </button>
          {/* MOVE IN */}
          <button
            onClick={() => setShowMoveIn(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#111827] rounded-full text-sm font-semibold text-white hover:bg-[#1f2937] transition uppercase"
          >
            Move In
          </button>
          {/* ADD TENANT */}
          <button
            onClick={() => setShowAddTenant(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#2563EB] rounded-full text-sm font-semibold text-white hover:bg-[#1d4ed8] transition"
          >
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
            Add Tenant
          </button>
        </div>
      </div>

      {/* ── Table card ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4">
        {/* Filters row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-6 border-b border-gray-100">
          <div className="flex items-center gap-2 bg-[#F9FAFB] border border-gray-200 rounded-full px-3 py-3 w-full sm:w-[280px]">
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
            <button className="flex items-center gap-[14px] pl-5 pr-[15px] py-3 border border-[#0F11141A] rounded-full text-xs font-semibold text-[#0F1114] hover:bg-gray-50 transition">
              All Balances <ChevronDown />
            </button>
            <button className="flex items-center gap-[14px] pl-5 pr-[15px] py-3 border border-[#0F11141A] rounded-full text-xs font-semibold text-[#0F1114] hover:bg-gray-50 transition">
              All Status <ChevronDown />
            </button>
            <button className="flex items-center gap-[14px] pl-5 pr-[15px] py-3 border border-[#0F11141A] rounded-full text-xs font-semibold text-[#0F1114] hover:bg-gray-50 transition">
              All Properties <ChevronDown />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2.5 px-4 text-sm font-bold text-[#0F1114]">
                  Tenant
                </th>
                <th className="text-left py-2.5 px-4 text-sm font-bold text-[#0F1114] hidden sm:table-cell">
                  Property
                </th>
                <th className="text-left py-2.5 px-4 text-sm font-bold text-[#0F1114] hidden md:table-cell">
                  Unit
                </th>
                <th className="text-left py-2.5 px-4 text-sm font-bold text-[#0F1114] hidden lg:table-cell">
                  Status
                </th>
                <th className="text-left py-2.5 px-4 text-sm font-bold text-[#0F1114] hidden xl:table-cell">
                  Lease
                </th>
                <th className="text-left py-2.5 px-4 text-sm font-bold text-[#0F1114]">
                  Balance
                </th>
                <th className="text-left py-2.5 px-4 text-sm font-bold text-[#0F1114]">
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
      {showMoveIn && <MoveInModal onClose={() => setShowMoveIn(false)} />}
      {showAddTenant && (
        <AddTenantModal onClose={() => setShowAddTenant(false)} />
      )}
    </DashboardLayout>
  );
}
