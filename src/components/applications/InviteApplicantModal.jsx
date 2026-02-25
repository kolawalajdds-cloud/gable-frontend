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

/* ── Shared ─────────────────────────────────────────────── */
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

/* ── InviteApplicantModal ───────────────────────────────── */
export default function InviteApplicantModal({ onClose }) {
  const overlayRef = useRef(null);

  const [property, setProperty] = useState("123 OAK ST • UNIT 4");
  const [unit, setUnit] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(
    "Hi — please complete your rental application using the link below. Let me know if you have any questions.",
  );

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
                Invite applicant
              </h2>
              <p className="text-xs font-medium text-[#0F111499] mt-[3px]">
                Send a link to apply for a specific property (demo).
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
            <div className="relative">
              <select
                value={property}
                onChange={(e) => setProperty(e.target.value)}
                className="w-full border border-[#0F11141A] rounded-xl px-4 py-[13px] text-sm font-semibold text-[#0F1114] appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                <option>123 OAK ST • UNIT 4</option>
                <option>55 CRYSTAL FALLS DR</option>
                <option>PORTFOLIO</option>
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#0F1114]">
                <ChevDown />
              </span>
            </div>
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

          {/* EMAIL */}
          <div>
            <FieldLabel>Email</FieldLabel>
            <TextInput
              placeholder="EMAIL@DOMAIN.COM"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </div>

          {/* MESSAGE */}
          <div>
            <FieldLabel>Message</FieldLabel>
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-[#0F11141A] rounded-xl px-4 py-[13px] text-sm font-semibold text-[#0F1114] placeholder-[#0F111466] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none bg-white"
            />
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
            Send Invite
          </button>
        </div>
      </div>
    </div>
  );
}
