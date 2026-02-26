import { useState } from "react";
import DashboardLayout, { SearchIcon } from "../components/DashboardLayout";
import UploadModal from "../components/documents/UploadModal";

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

function UploadIcon() {
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
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6B7280"
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

function InfoIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6B7280"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6B7280"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4h6v2" />
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

/* ── Doc File Icon (coloured) ─────────────────────────── */
function DocFileIcon({ type }) {
  const colors = {
    lease: "#2563EB",
    invoice: "#2563EB",
    zip: "#2563EB",
    insurance: "#2563EB",
  };
  const color = colors[type] || "#2563EB";
  return (
    <div
      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
      style={{ background: `${color}18` }}
    >
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
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <polyline points="13 2 13 9 20 9" />
      </svg>
    </div>
  );
}

/* ── Stat Card ───────────────────────────────────────── */
function StatCard({ label, value, sub }) {
  return (
    <div className="bg-white rounded-2xl border border-[#0F11141A] px-5 py-4 flex flex-col gap-1 flex-1 min-w-[150px]">
      <p className="text-[10px] font-extrabold text-[#0F111499] uppercase tracking-wider">
        {label}
      </p>
      <p className="text-2xl font-extrabold text-[#0F1114]">{value}</p>
      <p className="text-xs font-medium text-[#0F111499]">{sub}</p>
    </div>
  );
}

/* ── Sample data ──────────────────────────────────────── */
const TABS = ["ALL", "IMAGES", "DOCUMENTS", "RECEIPTS", "LEASES"];

const DOCUMENTS = [
  {
    id: 1,
    name: "Lease - Unit 4.pdf",
    tags: "lease, 2026",
    type: "lease",
    property: "123 Oak St • Unit 4",
    date: "Jan 12, 2026",
    size: "—",
  },
  {
    id: 2,
    name: "Plumbing Invoice Jan.pdf",
    tags: "invoice, plumbing",
    type: "invoice",
    property: "123 Oak St",
    date: "Jan 11, 2026",
    size: "88 KB",
  },
  {
    id: 3,
    name: "Move-in Photos.zip",
    tags: "move-in, photos",
    type: "zip",
    property: "123 Oak St • Unit 4",
    date: "Jan 8, 2026",
    size: "28.4 MB",
  },
  {
    id: 4,
    name: "Insurance COI.pdf",
    tags: "insurance",
    type: "insurance",
    property: "Portfolio",
    date: "Jan 3, 2026",
    size: "156 KB",
  },
];

/* ── DocumentsPage ───────────────────────────────────── */
export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [search, setSearch] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [propertyFilter, setPropertyFilter] = useState("All Properties");

  const filtered = DOCUMENTS.filter((doc) => {
    const matchSearch =
      !search ||
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.tags.toLowerCase().includes(search.toLowerCase());
    const matchTab =
      activeTab === "ALL" ||
      (activeTab === "LEASES" && doc.type === "lease") ||
      (activeTab === "DOCUMENTS" &&
        (doc.type === "invoice" || doc.type === "insurance")) ||
      (activeTab === "IMAGES" && doc.type === "zip") ||
      activeTab === "RECEIPTS";
    return matchSearch && matchTab;
  });

  return (
    <DashboardLayout>
      {/* ── Page Header ── */}
      <div className="flex flex-wrap justify-between items-start gap-3 mb-5">
        <div>
          <h1 className="text-xl font-bold text-[#0F1114]">Documents</h1>
          <p className="text-xs font-medium text-[#0F111499] mt-1">
            Store property documents, photos, leases, and receipts.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* New Folder */}
          <button className="flex items-center gap-2 px-5 py-[13px] border border-[#0F1114] rounded-full text-xs font-extrabold text-[#0F1114] bg-white hover:bg-gray-50 transition uppercase tracking-wide">
            <PlusIcon />
            New Folder
          </button>

          {/* Upload */}
          <button
            onClick={() => setShowUpload((v) => !v)}
            className="flex items-center gap-2 px-5 py-[13px] rounded-full text-xs font-extrabold text-white bg-[linear-gradient(225.01deg,#3388FF_0%,#004CE6_100%)] shadow-[0px_4px_8px_-2px_#004CE580] hover:opacity-90 transition uppercase tracking-wide"
          >
            <UploadIcon />
            Upload
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
          label="Documents"
          value={String(DOCUMENTS.length)}
          sub="Total files stored"
        />
      </div>

      {/* ── Main Card ── */}
      <div className="bg-white rounded-3xl border border-[#0F11141A]">
        {/* Filter bar */}
        <div className="px-5 py-5 flex flex-wrap items-center justify-between gap-3 border-b border-[#0F11141A]">
          {/* Tabs */}
          <div className="flex items-center gap-1 flex-wrap">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-[9px] border border-[#0F11141A] rounded-full text-xs font-extrabold transition uppercase tracking-wide ${
                  activeTab === tab
                    ? "bg-[#0F1114] text-white border-[#0F1114]"
                    : "text-[#0F1114CC] hover:bg-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Search */}
            <div className="flex items-center gap-2 bg-white border border-[#E5E7EB] rounded-full px-3 py-[9px] min-w-[180px]">
              <SearchIcon color="#9CA3AF" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent border-none outline-none text-xs text-[#374151] placeholder-[#0F111466] w-full"
              />
            </div>

            {/* Property filter */}
            <div className="relative">
              <select
                value={propertyFilter}
                onChange={(e) => setPropertyFilter(e.target.value)}
                className="appearance-none bg-white border border-[#E5E7EB] rounded-full pl-4 pr-8 py-[13px] text-xs font-bold text-[#0F1114] focus:outline-none cursor-pointer"
              >
                <option>All Properties</option>
                <option>123 Oak St • Unit 4</option>
                <option>123 Oak St</option>
                <option>Portfolio</option>
              </select>
              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#0F1114]">
                <ChevDown />
              </span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-[#0F11141A] bg-[#FAFAFA]">
                {["Name", "Type", "Property", "Date", "Size", ""].map((col) => (
                  <th
                    key={col}
                    className="px-5 py-3.5 text-left text-xs font-bold text-[#0F1114] uppercase whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-sm font-medium text-[#0F111466] text-center"
                  >
                    No documents found.
                  </td>
                </tr>
              ) : (
                filtered.map((doc, i) => (
                  <tr
                    key={doc.id}
                    className={`hover:bg-[#F8F9FB] transition cursor-pointer ${
                      i < filtered.length - 1
                        ? "border-b border-[#0F11141A]"
                        : ""
                    }`}
                  >
                    {/* Name */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <DocFileIcon type={doc.type} />
                        <div>
                          <p className="text-sm font-bold text-[#0F1114]">
                            {doc.name}
                          </p>
                          <p className="text-xs font-semibold text-[#0F1114]/50 mt-0.5">
                            {doc.tags}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Type (empty in design, tags used in name col) */}
                    <td className="px-5 py-4 text-sm font-semibold text-[#0F1114]/60">
                      —
                    </td>

                    {/* Property */}
                    <td className="px-5 py-4 text-sm font-semibold text-[#0F1114]/60">
                      {doc.property}
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4 text-sm font-semibold text-[#0F1114]/60 whitespace-nowrap">
                      {doc.date}
                    </td>

                    {/* Size */}
                    <td className="px-5 py-4 text-sm font-semibold text-[#0F1114]/60 whitespace-nowrap">
                      {doc.size}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <button
                          className="p-1.5 rounded-full hover:bg-gray-100 transition text-[#6B7280]"
                          onClick={(e) => e.stopPropagation()}
                          title="Download"
                        >
                          <DownloadIcon />
                        </button>
                        <button
                          className="p-1.5 rounded-full hover:bg-gray-100 transition text-[#6B7280]"
                          onClick={(e) => e.stopPropagation()}
                          title="Info"
                        >
                          <InfoIcon />
                        </button>
                        <button
                          className="p-1.5 rounded-full hover:bg-gray-100 transition text-[#6B7280]"
                          onClick={(e) => e.stopPropagation()}
                          title="Delete"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal */}
      {showUpload && <UploadModal onClose={() => setShowUpload(false)} />}
    </DashboardLayout>
  );
}
