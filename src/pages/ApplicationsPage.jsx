import { useState } from "react";
import DashboardLayout, { SearchIcon } from "../components/DashboardLayout";
import NewApplicationModal from "../components/applications/NewApplicationModal";
import InviteApplicantModal from "../components/applications/InviteApplicantModal";

/* ── Sample Data ──────────────────────────────────────── */
const APPLICANTS = [
  {
    id: 1,
    name: "Morgan Diaz",
    email: "morgan@email.com",
    property: "123 Oak St • Unit 4",
    unit: "Unit 4",
    moveIn: "Jan 20, 2026",
    income: "$9,200",
    score: "",
    status: "",
    phone: "(415) 555-0101",
    notes: "Waiting on references.",
    checks: ["ID", "INCOME", "CREDIT", "BACKGROUND", "REFERENCES"],
    checksDone: ["ID", "INCOME"],
  },
  {
    id: 2,
    name: "Jordan Lee",
    email: "jordan@email.com",
    property: "55 Crystal Falls Dr",
    unit: "Main",
    moveIn: "Mar 1, 2026",
    income: "$11,200",
    score: "792",
    status: "Screening",
    phone: "(415) 555-0142",
    notes: "Waiting of credit check.",
    checks: ["ID", "INCOME", "CREDIT", "BACKGROUND", "REFERENCES"],
    checksDone: ["ID", "INCOME"],
  },
  {
    id: 3,
    name: "Avery Patel",
    email: "avery@email.com",
    property: "123 Oak St • Unit 4",
    unit: "Unit 4",
    moveIn: "Feb 15, 2026",
    income: "$7,800",
    score: "",
    status: "",
    phone: "(415) 555-0123",
    notes: "Background check pending.",
    checks: ["ID", "INCOME", "CREDIT", "BACKGROUND", "REFERENCES"],
    checksDone: ["ID"],
  },
  {
    id: 4,
    name: "Sam Rivera",
    email: "sam@email.com",
    property: "Portfolio",
    unit: "-",
    moveIn: "Feb 5, 2026",
    income: "$6,400",
    score: "",
    status: "",
    phone: "(415) 555-0199",
    notes: "Awaiting documents.",
    checks: ["ID", "INCOME", "CREDIT", "BACKGROUND", "REFERENCES"],
    checksDone: [],
  },
];

const TABS = ["ALL", "NEW", "SCREENING", "APPROVED", "DENIED"];

/* ── Icons ───────────────────────────────────────────── */
function CheckCircleIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="12" fill="#0F1114" />
      <path
        d="M7 12.5l3.5 3.5 6.5-7"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function XSmallIcon() {
  return (
    <svg
      width="12"
      height="12"
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

function PencilIcon() {
  return (
    <svg
      width="14"
      height="14"
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

function MailOutIcon() {
  return (
    <svg
      width="16"
      height="16"
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

function ExportIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function PlusIcon() {
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

/* ── Application Details Panel ───────────────────────── */
function ApplicationDetails({ applicant }) {
  if (!applicant) return null;
  return (
    <div className="bg-white rounded-3xl border border-[#0F11141A] p-6 flex flex-col">
      <h3 className="text-base font-bold text-[#0F1114] mb-5">
        Application Details
      </h3>

      {/* Info banner */}
      <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl px-4 py-3 text-sm font-bold text-[#1D4ED8] bg-[#004CE51A] mb-4">
        Demo page: screening steps and attachments are placeholders (UI-only).
      </div>

      {/* Applicant summary */}
      <div className="border border-[#0F11141A] rounded-xl p-4">
        <p className="text-[10px] font-extrabold text-[#0F111499] uppercase tracking-wider mb-2">
          Selected Applicant
        </p>
        <p className="text-base font-extrabold text-[#0F1114]">
          {applicant.name} • {applicant.property}
          {applicant.unit !== "-" ? ` • ${applicant.unit}` : ""}
        </p>
        <p className="text-xs font-medium text-[#0F1114CC] mt-1">
          {applicant.moveIn} move-in
          {applicant.score ? ` • Score ${applicant.score}` : ""}
          {applicant.status ? ` • ${applicant.status}` : ""}
        </p>

        {/* Screening check badges */}
        <div className="flex flex-wrap gap-2 mt-3">
          {applicant.checks.map((c) => {
            const done = applicant.checksDone.includes(c);
            return (
              <span
                key={c}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold border ${
                  done
                    ? "border-[#0F1114] text-[#0F1114] bg-white"
                    : "border-[#0F11141A] text-[#0F111499] bg-white"
                }`}
              >
                {c}
                {done && (
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </span>
            );
          })}
        </div>
      </div>

      {/* Contact + Notes */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-[10px] font-extrabold text-[#0F111499] uppercase tracking-wider mb-2">
            Contact
          </p>
          <p className="text-base font-bold text-[#0F1114]">
            {applicant.phone}
          </p>
          <p className="text-xs font-medium text-[#0F1114CC] mt-0.5">
            {applicant.email}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-extrabold text-[#0F111499] uppercase tracking-wider mb-2">
            Notes
          </p>
          <p className="text-base font-bold text-[#0F1114]">
            {applicant.notes}
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <button className="px-5 py-3 border border-[#0F1114] rounded-full text-xs font-extrabold text-[#0F1114] hover:bg-gray-50 transition uppercase tracking-wide">
          Request Docs
        </button>
        <button className="px-5 py-3 border border-[#0F1114] rounded-full text-xs font-extrabold text-[#0F1114] hover:bg-gray-50 transition uppercase tracking-wide">
          Run Screening
        </button>
        <button className="px-5 py-3 rounded-full text-xs font-extrabold text-white bg-[#0F1114] hover:bg-[#1f2937] transition uppercase tracking-wide">
          Invite Applicant
        </button>
      </div>
    </div>
  );
}

/* ── Next Actions Panel ──────────────────────────────── */
function NextActions() {
  return (
    <div className="bg-white rounded-3xl border border-[#0F11141A] p-6 flex flex-col gap-5">
      <h3 className="text-base font-bold text-[#0F1114]">Next actions</h3>

      {/* Today card */}
      <div className="border border-[#0F11141A] rounded-xl p-4">
        <p className="text-[10px] font-extrabold text-[#0F111499] uppercase tracking-wider mb-2">
          Today
        </p>
        <p className="text-xl font-extrabold text-[#0F1114]">2 pending</p>
        <p className="text-xs font-medium text-[#0F1114CC] mt-1">
          Use the drawer to update status and screening steps.
        </p>
      </div>

      {/* Recommended checks */}
      <div>
        <p className="text-base font-bold text-[#0F1114] mb-3">
          Recommended checks
        </p>
        <ul className="flex flex-col gap-2">
          {[
            "Verify income (pay stubs / bank statements)",
            "Employment verification",
            "Credit & background screening",
            "Rental history / landlord reference",
            "Confirm move-in timeline",
          ].map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm font-medium text-[#0F1114CC]"
            >
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#0F1114CC] flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── Main Page ───────────────────────────────────────── */
export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(2);
  const [showNewApp, setShowNewApp] = useState(false);
  const [showInvite, setShowInvite] = useState(false);

  const selectedApplicant = APPLICANTS.find((a) => a.id === selectedId) || null;

  return (
    <DashboardLayout>
      {/* ── Page Header ── */}
      <div className="flex flex-wrap justify-between items-start gap-3 mb-5">
        <div>
          <h1 className="text-xl font-bold text-[#0F1114]">Applications</h1>
          <p className="text-xs font-medium text-[#0F111499] mt-1">
            Track applicants, screening steps, and approvals.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button className="px-5 py-[13px] border border-[#0F1114] rounded-full text-xs font-extrabold text-[#0F1114] bg-white hover:bg-gray-50 transition uppercase tracking-wide">
            Import
          </button>
          <button
            onClick={() => setShowInvite(true)}
            className="px-5 py-[13px] border border-[#0F1114] rounded-full text-xs font-extrabold text-[#0F1114] bg-white hover:bg-gray-50 transition uppercase tracking-wide"
          >
            Invite Applicant
          </button>
          <button
            onClick={() => setShowNewApp(true)}
            className="flex items-center gap-2 px-5 py-[13px] rounded-full text-xs font-extrabold text-white bg-[linear-gradient(225.01deg,#3388FF_0%,#004CE6_100%)] shadow-[0px_4px_8px_-2px_#004CE580] hover:opacity-90 transition uppercase tracking-wide"
          >
            <PlusIcon />
            New Application
          </button>
        </div>
      </div>

      {/* ── Main Card ── */}
      <div className="bg-white rounded-3xl border border-[#0F11141A] mb-4">
        {/* Filter row */}
        <div className="px-5 pt-5 pb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#0F11141A]">
          {/* Tabs */}
          <div className="flex items-center gap-1 flex-wrap">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-xs font-extrabold transition uppercase tracking-wide ${
                  activeTab === tab
                    ? "bg-[#0F1114] text-white"
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
            <div className="flex items-center gap-2 bg-white border border-[#E5E7EB] rounded-full px-3 py-2 min-w-[200px]">
              <SearchIcon color="#9CA3AF" />
              <input
                type="text"
                placeholder="Search: applicant, property, email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent border-none outline-none text-xs text-[#374151] placeholder-[#0F111466] w-full"
              />
            </div>
            {/* All Properties */}
            <div className="relative">
              <select className="appearance-none bg-white border border-[#E5E7EB] rounded-full pl-4 pr-8 py-2 text-xs font-bold text-[#0F1114] focus:outline-none cursor-pointer">
                <option>All Properties</option>
                <option>123 Oak St • Unit 4</option>
                <option>55 Crystal Falls Dr</option>
                <option>Portfolio</option>
              </select>
              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#0F1114]">
                <ChevDown />
              </span>
            </div>
            {/* All Status */}
            <div className="relative">
              <select className="appearance-none bg-white border border-[#E5E7EB] rounded-full pl-4 pr-8 py-2 text-xs font-bold text-[#0F1114] focus:outline-none cursor-pointer">
                <option>All Status</option>
                <option>New</option>
                <option>Screening</option>
                <option>Approved</option>
                <option>Denied</option>
              </select>
              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#0F1114]">
                <ChevDown />
              </span>
            </div>
            {/* Icon buttons */}
            <button className="p-2.5 border border-[#0F11141A] rounded-full hover:bg-gray-50 transition text-[#0F1114]">
              <MailOutIcon />
            </button>
            <button className="p-2.5 border border-[#0F11141A] rounded-full hover:bg-gray-50 transition text-[#0F1114]">
              <ExportIcon />
            </button>
          </div>
        </div>

        {/* ── Table ── */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-[#0F11141A]">
                {[
                  "Applicant",
                  "Property",
                  "Unit",
                  "Move-in",
                  "Income",
                  "Score",
                  "Status",
                  "Actions",
                ].map((col) => (
                  <th
                    key={col}
                    className="px-5 py-3.5 text-left text-xs font-bold text-[#0F1114CC] uppercase tracking-wide whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {APPLICANTS.map((a) => (
                <tr
                  key={a.id}
                  onClick={() => setSelectedId(a.id)}
                  className={`border-b border-[#0F11141A] cursor-pointer transition ${
                    selectedId === a.id ? "bg-[#F8F9FE]" : "hover:bg-gray-50"
                  }`}
                >
                  {/* Applicant */}
                  <td className="px-5 py-4">
                    <p className="text-sm font-bold text-[#0F1114]">{a.name}</p>
                    <p className="text-xs font-medium text-[#0F1114CC] mt-0.5">
                      {a.email}
                    </p>
                  </td>
                  {/* Property */}
                  <td className="px-5 py-4 text-sm font-medium text-[#0F1114]">
                    {a.property}
                  </td>
                  {/* Unit */}
                  <td className="px-5 py-4 text-sm font-medium text-[#0F1114]">
                    {a.unit}
                  </td>
                  {/* Move-in */}
                  <td className="px-5 py-4 text-sm font-medium text-[#0F1114]">
                    {a.moveIn}
                  </td>
                  {/* Income */}
                  <td className="px-5 py-4 text-sm font-medium text-[#0F1114]">
                    {a.income}
                  </td>
                  {/* Score */}
                  <td className="px-5 py-4 text-sm font-medium text-[#0F1114]">
                    {a.score || "—"}
                  </td>
                  {/* Status */}
                  <td className="px-5 py-4">
                    {a.status ? (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#EFF6FF] text-[#1D4ED8]">
                        {a.status}
                      </span>
                    ) : (
                      <span className="text-sm font-medium text-[#0F111466]">
                        —
                      </span>
                    )}
                  </td>
                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-1.5 rounded-full bg-[#0F1114] text-white hover:opacity-80 transition"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </button>
                      <button
                        className="p-1.5 rounded-full border border-[#0F11141A] text-[#6B7280] hover:bg-gray-100 transition"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <XSmallIcon />
                      </button>
                      <button
                        className="p-1.5 text-[#6B7280] hover:text-[#374151] transition"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <PencilIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Bottom: Details + Next Actions ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ApplicationDetails applicant={selectedApplicant} />
        <NextActions />
      </div>
      {/* ── New Application Modal ── */}
      {showNewApp && (
        <NewApplicationModal onClose={() => setShowNewApp(false)} />
      )}
      {showInvite && (
        <InviteApplicantModal onClose={() => setShowInvite(false)} />
      )}
    </DashboardLayout>
  );
}
