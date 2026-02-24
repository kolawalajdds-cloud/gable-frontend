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
function SmallX() {
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
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
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
function CalIcon() {
  return (
    <svg
      width="15"
      height="15"
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
function FileIcon() {
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
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <polyline points="13 2 13 9 20 9" />
    </svg>
  );
}

/* ── Shared field components ───────────────────────────── */
function Label({ children }) {
  return (
    <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
      {children}
    </label>
  );
}
function Input({
  placeholder,
  value,
  onChange,
  type = "text",
  className = "",
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-[#111827] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${className}`}
    />
  );
}
function Select({ value, onChange, children }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-[#111827] appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition"
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
        <ChevDown />
      </span>
    </div>
  );
}

function SectionAddBtn({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 rounded-full text-xs font-bold text-[#111827] hover:bg-gray-50 transition uppercase tracking-wide"
    >
      <PlusIcon /> {label}
    </button>
  );
}

/* ── Divider row ───────────────────────────────────────── */
function SectionRow({ title, subtitle, btnLabel, onAdd }) {
  return (
    <div className="flex items-center justify-between py-1">
      <div>
        <p className="text-[15px] font-bold text-[#111827]">{title}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
      {btnLabel && <SectionAddBtn label={btnLabel} onClick={onAdd} />}
    </div>
  );
}

const PROPERTIES = ["123 Oak St • Unit 4", "55 Crystal Falls Dr", "Portfolio"];
const STATUSES = ["Active", "Past", "Applicant"];

export default function AddTenantModal({ onClose }) {
  const overlayRef = useRef(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [company, setCompany] = useState("No");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [property, setProperty] = useState("123 Oak St • Unit 4");
  const [unit, setUnit] = useState("Unit 4 / Main / ADU");
  const [status, setStatus] = useState("Active");
  const [rent, setRent] = useState("0");
  const [leaseStart, setLeaseStart] = useState("19-02-2026");
  const [leaseEnd, setLeaseEnd] = useState("19-02-2027");
  const [balance, setBalance] = useState("0");
  const [notes, setNotes] = useState("");
  const [docFile, setDocFile] = useState(null);

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
      <div className="relative bg-white h-full w-full max-w-[520px] flex flex-col shadow-2xl animate-slide-in">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-[18px] font-bold text-[#111827]">
                Add tenant
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Create a tenant record and link it to a property/unit.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-100 transition text-gray-500 flex-shrink-0 mt-0.5"
            >
              <XIcon />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Profile photo */}
          <div>
            <Label>Profile Photo</Label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 px-4 py-2 bg-[#111827] rounded-full text-xs font-bold text-white cursor-pointer hover:bg-[#1f2937] transition">
                <FileIcon />
                Choose File
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                />
              </label>
              <span className="text-sm text-gray-400">
                {photoFile ? photoFile.name : "No file chosen"}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1.5">
              Optional (demo: not uploaded anywhere).
            </p>
          </div>

          {/* Display as company */}
          <div>
            <Label>Display as Company?</Label>
            <Select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </Select>
          </div>

          {/* First / Middle name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>First Name</Label>
              <Input
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <Label>Middle Name</Label>
              <Input
                placeholder="Middle Name (Optional)"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
              />
            </div>
          </div>

          {/* Last name / DOB */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Last Name</Label>
              <Input
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <Label>Date of Birth</Label>
              <div className="relative">
                <Input
                  placeholder="DD-MM-YYYY"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <CalIcon />
                </span>
              </div>
            </div>
          </div>

          {/* Email section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-[15px] font-bold text-[#111827]">Email</p>
                <p className="text-xs text-gray-400">
                  Add more than 1 email if needed.
                </p>
              </div>
              <SectionAddBtn label="Add Email" />
            </div>
            <Label>Email</Label>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Input
                  placeholder="EMAIL@DOMAIN.COM"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </div>
              <button className="p-1.5 text-gray-400 hover:text-gray-600 flex-shrink-0">
                <SmallX />
              </button>
            </div>
          </div>

          {/* Phones section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-[15px] font-bold text-[#111827]">Phones</p>
                <p className="text-xs text-gray-400">
                  Add more than 1 phone if needed.
                </p>
              </div>
              <SectionAddBtn label="Add Email" />
            </div>
            <Label>Phone</Label>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Input
                  placeholder="(###) ###-####"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                />
              </div>
              <button className="p-1.5 text-gray-400 hover:text-gray-600 flex-shrink-0">
                <SmallX />
              </button>
            </div>
          </div>

          {/* Property + Unit */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Property</Label>
              <Select
                value={property}
                onChange={(e) => setProperty(e.target.value)}
              >
                {PROPERTIES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label>Unit</Label>
              <Input
                placeholder="Unit 4 / Main / ADU"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
            </div>
          </div>

          {/* Status + Rent */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Status</Label>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label>Rent (Monthly)</Label>
              <Input
                placeholder="0"
                value={rent}
                onChange={(e) => setRent(e.target.value)}
                type="number"
              />
            </div>
          </div>

          {/* Lease Start + Lease End */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Lease Start</Label>
              <div className="relative">
                <Input
                  placeholder="DD-MM-YYYY"
                  value={leaseStart}
                  onChange={(e) => setLeaseStart(e.target.value)}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <CalIcon />
                </span>
              </div>
            </div>
            <div>
              <Label>Lease End</Label>
              <div className="relative">
                <Input
                  placeholder="DD-MM-YYYY"
                  value={leaseEnd}
                  onChange={(e) => setLeaseEnd(e.target.value)}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <CalIcon />
                </span>
              </div>
            </div>
          </div>

          {/* Balance + Notes */}
          <div className="grid grid-cols-2 gap-3 items-start">
            <div>
              <Label>Balance</Label>
              <Input
                placeholder="0"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                type="number"
              />
              <p className="text-xs text-gray-400 mt-1.5">
                Use negative for credit, positive for amount due.
              </p>
            </div>
            <div>
              <Label>Notes</Label>
              <textarea
                rows={3}
                placeholder="Add internal notes (access, preferences, etc.)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-[#111827] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
              />
            </div>
          </div>

          {/* Divider sections */}
          <div className="border-t border-gray-100 pt-4 space-y-4">
            <SectionRow
              title="Forwarding address"
              subtitle="Add forwarding / mailing address for notices."
              btnLabel="Add Address"
            />
            <div className="border-t border-gray-100" />
            <SectionRow
              title="Emergency contacts"
              btnLabel="Add Emergency Contact"
            />
            <div className="border-t border-gray-100" />
            <SectionRow title="Pets" btnLabel="Add a Pet" />
            <div className="border-t border-gray-100" />
            <SectionRow title="Vehicles" btnLabel="Add a Vehicle" />
          </div>

          {/* Store documents */}
          <div className="border-t border-gray-100 pt-4">
            <div className="mb-3">
              <p className="text-[15px] font-bold text-[#111827]">
                Store documents
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Upload leases, insurance, IDs, templates, and more.
              </p>
            </div>
            <Label>Documents</Label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 px-4 py-2 bg-[#111827] rounded-full text-xs font-bold text-white cursor-pointer hover:bg-[#1f2937] transition">
                <FileIcon />
                Choose File
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setDocFile(e.target.files?.[0] || null)}
                />
              </label>
              <span className="text-sm text-gray-400">
                {docFile ? docFile.name : "No file chosen"}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1.5">
              Upload (demo: files are not stored).
            </p>
          </div>
        </div>

        {/* Sticky footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 flex-shrink-0 bg-white">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-300 rounded-full text-sm font-bold text-[#111827] hover:bg-gray-50 transition uppercase tracking-wide"
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
