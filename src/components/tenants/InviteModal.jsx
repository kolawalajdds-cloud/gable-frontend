import { useEffect, useRef, useState } from "react";

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

const PROPERTIES = ["123 Oak St • Unit 4", "55 Crystal Falls Dr", "Portfolio"];

export default function InviteModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [property, setProperty] = useState("123 Oak St • Unit 4");
  const [unit, setUnit] = useState("Unit 4 / Main / ADU");
  const [message, setMessage] = useState(
    "You've been invited to join Gable to manage rent, maintenance, and communication.",
  );
  const overlayRef = useRef(null);

  // Close on overlay click
  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) onClose();
  }

  // Close on Escape
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
      <div className="relative bg-white h-full w-full max-w-[480px] flex flex-col shadow-2xl animate-slide-in overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-[18px] font-bold text-[#111827]">
                Invite Tenants
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Send an invite so the tenant can create an account and connect.
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

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Email */}
          <div>
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Email
            </label>
            <input
              type="email"
              placeholder="TENANT@DOMAIN.COM"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-[#111827] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Property + Unit */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Property
              </label>
              <div className="relative">
                <select
                  value={property}
                  onChange={(e) => setProperty(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-[#111827] appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition"
                >
                  {PROPERTIES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <ChevDown />
                </span>
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Unit
              </label>
              <input
                type="text"
                placeholder="UNIT 4 / MAIN / ADU"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-[#111827] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Message
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
            />
          </div>

          {/* Demo info box */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3">
            <p className="text-sm text-blue-600 font-medium leading-snug">
              Demo: This does not send email. In production, this would deliver
              a secure invite link.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 flex-shrink-0">
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
