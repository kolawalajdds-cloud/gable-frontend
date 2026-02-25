import { useEffect, useRef, useState } from "react";
import documentFile from "../../assets/icons/document-file.svg";

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

/* ── Shared components ──────────────────────────────────── */
function FieldLabel({ children }) {
  return (
    <label className="block text-xs font-bold text-[#0F1114] uppercase tracking-wide mb-[6px]">
      {children}
    </label>
  );
}

function TextInput({ placeholder, value, onChange, type = "text" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full border border-[#0F11141A] rounded-xl px-4 py-[13px] text-sm font-semibold text-[#0F1114] placeholder-[#0F111466] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
    />
  );
}

function SelectInput({ value, onChange, children }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="w-full border border-[#0F11141A] rounded-xl px-4 py-[13px] text-sm font-semibold text-[#0F1114] appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#0F1114]">
        <ChevDown />
      </span>
    </div>
  );
}

/* ── Screening steps ────────────────────────────────────── */
const SCREENING_STEPS = ["ID", "INCOME", "CREDIT", "BACKGROUND", "REFERENCES"];

/* ── Main Modal ─────────────────────────────────────────── */
export default function NewApplicationModal({ onClose }) {
  const overlayRef = useRef(null);

  /* form state */
  const [property, setProperty] = useState("123 OAK ST • UNIT 4");
  const [unit, setUnit] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [moveInDate, setMoveInDate] = useState("23-02-2026");
  const [income, setIncome] = useState("0");
  const [status, setStatus] = useState("New");
  const [checks, setChecks] = useState({});
  const [notes, setNotes] = useState("");
  const [attachFile, setAttachFile] = useState(null);

  function toggleCheck(step) {
    setChecks((prev) => ({ ...prev, [step]: !prev[step] }));
  }

  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) onClose();
  }

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex justify-end"
      style={{ background: "rgba(15,17,20,0.45)" }}
    >
      {/* Panel */}
      <div className="relative bg-white h-full w-full max-w-[544px] flex flex-col shadow-2xl animate-slide-in rounded-l-[32px]">
        {/* ── Header ── */}
        <div className="px-6 pt-5 pb-[22px] border-b border-[#0F11141A] flex-shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#0F1114]">
                New Application
              </h2>
              <p className="text-xs font-medium text-[#0F111499] mt-[3px]">
                Capture applicant info, property, and screening status.
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
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {/* PROPERTY */}
          <div>
            <FieldLabel>Property</FieldLabel>
            <SelectInput
              value={property}
              onChange={(e) => setProperty(e.target.value)}
            >
              <option>123 OAK ST • UNIT 4</option>
              <option>55 CRYSTAL FALLS DR</option>
              <option>PORTFOLIO</option>
            </SelectInput>
          </div>

          {/* UNIT */}
          <div>
            <FieldLabel>Unit</FieldLabel>
            <TextInput
              placeholder="UNIT 4 / MAIN / ADU"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            />
          </div>

          {/* FIRST NAME + LAST NAME */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FieldLabel>First Name</FieldLabel>
              <TextInput
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <FieldLabel>Applicant Last Name</FieldLabel>
              <TextInput
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          {/* EMAIL + PHONE */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FieldLabel>Email</FieldLabel>
              <TextInput
                placeholder="EMAIL@DOMAIN.COM"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </div>
            <div>
              <FieldLabel>Phone</FieldLabel>
              <TextInput
                placeholder="(###) ####-####"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
              />
            </div>
          </div>

          {/* DESIRED MOVE-IN DATE + HOUSEHOLD MONTHLY INCOME */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FieldLabel>Desired Move-In Date</FieldLabel>
              <div className="relative">
                <input
                  type="text"
                  value={moveInDate}
                  onChange={(e) => setMoveInDate(e.target.value)}
                  placeholder="DD-MM-YYYY"
                  className="w-full border border-[#0F11141A] rounded-xl px-4 py-[13px] pr-11 text-sm font-semibold text-[#0F1114] placeholder-[#0F111466] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <CalIcon />
                </span>
              </div>
            </div>
            <div>
              <FieldLabel>Household Monthly Income</FieldLabel>
              <TextInput
                placeholder="0"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                type="number"
              />
            </div>
          </div>

          {/* STATUS */}
          <div>
            <FieldLabel>Status</FieldLabel>
            <SelectInput
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="New">New</option>
              <option value="Screening">Screening</option>
              <option value="Approved">Approved</option>
              <option value="Denied">Denied</option>
            </SelectInput>
          </div>

          {/* SCREENING STEPS CHECKBOXES */}
          <div>
            <FieldLabel>Status</FieldLabel>
            <div className="flex flex-wrap gap-3">
              {SCREENING_STEPS.map((step) => (
                <label
                  key={step}
                  className="flex items-center gap-2 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={!!checks[step]}
                    onChange={() => toggleCheck(step)}
                    className="w-[15px] h-[15px] rounded border-[#0F11141A] accent-[#0F1114] cursor-pointer flex-shrink-0"
                  />
                  <span className="text-xs font-bold text-[#0F1114] uppercase tracking-wide">
                    {step}
                  </span>
                </label>
              ))}
            </div>
            <p className="text-xs font-medium text-[#0F111499] mt-1.5">
              Toggle steps as completed (demo).
            </p>
          </div>

          {/* INTERNAL NOTES */}
          <div>
            <FieldLabel>Internal Notes</FieldLabel>
            <textarea
              rows={4}
              placeholder="Add notes about the applicant..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border border-[#0F11141A] rounded-xl px-4 py-[13px] text-sm font-semibold text-[#0F1114] placeholder-[#0F111466] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none bg-white"
            />
          </div>

          {/* ATTACHMENTS */}
          <div>
            <FieldLabel>Attachments</FieldLabel>
            <div className="flex items-center gap-3 border border-[#0F11141A] rounded-xl py-3 px-4">
              <label className="flex items-center gap-2 px-4 py-2 bg-[#0F1114] rounded-full text-xs font-bold text-white cursor-pointer hover:bg-[#1f2937] transition flex-shrink-0">
                <img src={documentFile} alt="file" className="w-4 h-4" />
                Choose File
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setAttachFile(e.target.files?.[0] || null)}
                />
              </label>
              <span className="text-xs font-bold text-[#0F111499]">
                {attachFile ? attachFile.name : "No file chosen"}
              </span>
            </div>
            <p className="text-xs font-medium text-[#0F111499] mt-1.5">
              Upload paystubs, IDs, documents (demo only).
            </p>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="px-6 py-4 border-t border-[#0F11141A] flex items-center justify-end gap-3 flex-shrink-0 bg-white">
          <button
            onClick={onClose}
            className="px-6 py-[11px] border border-[#0F1114] rounded-full text-sm font-extrabold text-[#0F1114] hover:bg-gray-50 transition uppercase tracking-wide"
          >
            Cancel
          </button>
          <button className="px-6 py-[11px] bg-[linear-gradient(225.01deg,#3388FF_0%,#004CE6_100%)] rounded-full text-sm font-extrabold text-white hover:opacity-90 transition uppercase tracking-wide shadow-[0px_4px_8px_-2px_#004CE580]">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
