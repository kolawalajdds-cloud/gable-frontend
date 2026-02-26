import { useState } from "react";
import DashboardLayout, { SearchIcon } from "../components/DashboardLayout";
import AddTransactionModal from "../components/accounting/AddTransactionModal";

/* ── Icons ───────────────────────────────────────────── */
function PlusIcon() {
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
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function ChevDown() {
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
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function CalIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6B7280"
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

/* ── Stat Card ───────────────────────────────────────── */
function StatCard({ label, value, sub }) {
  return (
    <div className="bg-white rounded-2xl border border-[#0F11141A] px-5 py-4 flex flex-col gap-1 flex-1 min-w-[160px]">
      <p className="text-[10px] font-extrabold text-[#0F111499] uppercase tracking-wider">
        {label}
      </p>
      <p className="text-2xl font-extrabold text-[#0F1114]">{value}</p>
      <p className="text-xs font-medium text-[#0F111499]">{sub}</p>
    </div>
  );
}

/* ── Filter Select ───────────────────────────────────── */
function FilterSelect({ value, onChange, children }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="appearance-none bg-white border border-[#E5E7EB] rounded-full pl-3 pr-7 py-[7px] text-xs font-bold text-[#0F1114] focus:outline-none cursor-pointer whitespace-nowrap"
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#0F1114]">
        <ChevDown />
      </span>
    </div>
  );
}

/* ── Quick Action Card ───────────────────────────────── */
function QuickActionCard({ title, subtitle, btnLabel }) {
  return (
    <div className="border border-[#0F11141A] rounded-2xl p-5 flex flex-col gap-3">
      <div>
        <p className="text-sm font-bold text-[#0F1114]">{title}</p>
        <p className="text-xs font-medium text-[#0F111499] mt-0.5">
          {subtitle}
        </p>
      </div>
      <button className="flex items-center gap-1.5 px-4 py-[10px] border border-[#0F1114] rounded-full text-xs font-extrabold text-[#0F1114] hover:bg-gray-50 transition uppercase tracking-wide w-fit">
        <PlusIcon />
        {btnLabel}
      </button>
    </div>
  );
}

/* ── Accounting Page ─────────────────────────────────── */
export default function AccountingPage() {
  const [search, setSearch] = useState("");
  const [propertyFilter, setPropertyFilter] = useState("ALL PROPERTIES");
  const [typeFilter, setTypeFilter] = useState("ALL TYPES");
  const [fromDate, setFromDate] = useState("01-02-2026");
  const [toDate, setToDate] = useState("28-02-2026");
  const [showAddTx, setShowAddTx] = useState(false);

  return (
    <DashboardLayout>
      {/* ── Page Header ── */}
      <div className="flex flex-wrap justify-between items-start gap-3 mb-5">
        <div>
          <h1 className="text-xl font-bold text-[#0F1114]">Accounting</h1>
          <p className="text-xs font-medium text-[#0F111499] mt-1">
            Track rent, expenses, payouts, and owner statements.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button className="px-5 py-[13px] border border-[#0F1114] rounded-full text-xs font-extrabold text-[#0F1114] bg-white hover:bg-gray-50 transition uppercase tracking-wide">
            Export
          </button>
          <button className="px-5 py-[13px] border border-[#0F1114] rounded-full text-xs font-extrabold text-[#0F1114] bg-white hover:bg-gray-50 transition uppercase tracking-wide">
            Owner Statement
          </button>
          <button
            onClick={() => setShowAddTx(true)}
            className="flex items-center gap-2 px-5 py-[13px] rounded-full text-xs font-extrabold text-white bg-[linear-gradient(225.01deg,#3388FF_0%,#004CE6_100%)] shadow-[0px_4px_8px_-2px_#004CE580] hover:opacity-90 transition uppercase tracking-wide"
          >
            <PlusIcon />
            Add Transaction
          </button>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="flex flex-wrap gap-3 mb-5">
        <StatCard label="Income" value="$0.00" sub="Rent + fees collected" />
        <StatCard
          label="Expenses"
          value="$0.00"
          sub="Maintenance + operating costs"
        />
        <StatCard label="Net" value="$0.00" sub="Income minus expenses" />
        <StatCard
          label="Transactions"
          value="0"
          sub="0 paid + 0 pending/scheduled"
        />
      </div>

      {/* ── Transactions Card ── */}
      <div className="bg-white rounded-3xl border border-[#0F11141A] mb-4">
        {/* Filter bar */}
        <div className="px-5 pt-5 pb-4 flex flex-wrap items-center gap-3 border-b border-[#0F11141A]">
          <p className="text-base font-bold text-[#0F1114] flex-shrink-0">
            Transactions
          </p>

          {/* Search */}
          <div className="flex items-center gap-2 bg-white border border-[#E5E7EB] rounded-full px-3 py-[7px] flex-1 min-w-[180px] max-w-[260px]">
            <SearchIcon color="#9CA3AF" />
            <input
              type="text"
              placeholder="Search: tenant, property, n..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none text-xs text-[#374151] placeholder-[#0F111466] w-full"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <FilterSelect
              value={propertyFilter}
              onChange={(e) => setPropertyFilter(e.target.value)}
            >
              <option>ALL PROPERTIES</option>
              <option>123 OAK ST • UNIT 4</option>
              <option>55 CRYSTAL FALLS DR</option>
              <option>PORTFOLIO</option>
            </FilterSelect>

            <FilterSelect
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option>ALL TYPES</option>
              <option>RENT</option>
              <option>EXPENSE</option>
              <option>PAYOUT</option>
            </FilterSelect>

            {/* From Date */}
            <div className="relative">
              <input
                type="text"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border border-[#E5E7EB] rounded-full pl-3 pr-8 py-[7px] text-xs font-bold text-[#0F1114] focus:outline-none w-[120px]"
              />
              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2">
                <CalIcon />
              </span>
            </div>

            {/* To Date */}
            <div className="relative">
              <input
                type="text"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="border border-[#E5E7EB] rounded-full pl-3 pr-8 py-[7px] text-xs font-bold text-[#0F1114] focus:outline-none w-[120px]"
              />
              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2">
                <CalIcon />
              </span>
            </div>

            <button className="px-4 py-[7px] border border-[#0F11141A] rounded-full text-xs font-extrabold text-[#0F1114] hover:bg-gray-50 transition uppercase tracking-wide">
              Clear
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-[#0F11141A]">
                {[
                  "Date",
                  "Type",
                  "Property",
                  "Party",
                  "Memo",
                  "Amount",
                  "Status",
                  "Actions",
                ].map((col) => (
                  <th
                    key={col}
                    className="px-5 py-3.5 text-left text-sm font-bold text-[#0F1114] uppercase whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  colSpan={8}
                  className="px-5 py-8 text-sm font-medium text-[#0F111466] text-center"
                >
                  No transactions found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Bottom: Recent Activity + Quick Actions ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Activity */}
        <div className="bg-white rounded-3xl border border-[#0F11141A] p-6">
          <h3 className="text-base font-bold text-[#0F1114] mb-4">
            Recent activity
          </h3>
          <div className="border border-[#0F11141A] rounded-2xl px-5 py-5">
            <p className="text-sm font-bold text-[#0F1114]">No activity</p>
            <p className="text-xs font-medium text-[#0F111499] mt-1">
              Add a transaction to get started.
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-3xl border border-[#0F11141A] p-6">
          <h3 className="text-base font-bold text-[#0F1114] mb-4">
            Quick actions
          </h3>
          <div className="flex flex-col gap-3">
            <QuickActionCard
              title="Record rent"
              subtitle="Add a rent payment for a tenant."
              btnLabel="Add Rent"
            />
            <QuickActionCard
              title="Log expense"
              subtitle="Track maintenance and operating expenses."
              btnLabel="Add Expense"
            />
            <QuickActionCard
              title="Add payout"
              subtitle="Record payouts to owners or entities."
              btnLabel="Add Payout"
            />
          </div>
        </div>
      </div>
      {showAddTx && <AddTransactionModal onClose={() => setShowAddTx(false)} />}
    </DashboardLayout>
  );
}
