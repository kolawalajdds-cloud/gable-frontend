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

/* ── Reusable field components ──────────────────────────── */
function FieldLabel({ children }) {
  return (
    <label className="block text-xs font-bold text-[#0F1114] uppercase tracking-wide mb-[6px]">
      {children}
    </label>
  );
}

function SelectField({ value, onChange, children }) {
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

/* ── AddTransactionModal ────────────────────────────────── */
export default function AddTransactionModal({ onClose }) {
  const overlayRef = useRef(null);

  const [type, setType] = useState("Rent");
  const [date, setDate] = useState("23-02-2026");
  const [status, setStatus] = useState("Paid");
  const [property, setProperty] = useState("123 OAK ST • UNIT 4");
  const [party, setParty] = useState("");
  const [amount, setAmount] = useState("83.00");
  const [category, setCategory] = useState("Rent");
  const [paymentMethod, setPaymentMethod] = useState("ACH");
  const [memo, setMemo] = useState("");
  const [notes, setNotes] = useState("");

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
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(15,17,20,0.45)" }}
    >
      {/* Modal box */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-[648px] flex flex-col max-h-[90vh] overflow-hidden">
        {/* ── Header ── */}
        <div className="px-6 pt-6 pb-5 flex items-start justify-between gap-4 flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold text-[#0F1114]">
              Add transaction
            </h2>
            <p className="text-xs font-medium text-[#0F111499] mt-[3px]">
              Capture applicant info, property, and screening status.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 border border-[#0F11141A] rounded-full hover:bg-gray-100 transition text-gray-500 flex-shrink-0"
          >
            <XIcon />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="flex-1 overflow-y-auto px-6 pb-2 space-y-4">
          {/* TYPE + DATE + STATUS */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <FieldLabel>Type</FieldLabel>
              <SelectField
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="Rent">Rent</option>
                <option value="Expense">Expense</option>
                <option value="Payout">Payout</option>
                <option value="Deposit">Deposit</option>
              </SelectField>
            </div>
            <div>
              <FieldLabel>Date</FieldLabel>
              <div className="relative">
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="DD-MM-YYYY"
                  className="w-full border border-[#0F11141A] rounded-xl px-3 py-[13px] pr-9 text-sm font-semibold text-[#0F1114] placeholder-[#0F111466] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                  <CalIcon />
                </span>
              </div>
            </div>
            <div>
              <FieldLabel>Status</FieldLabel>
              <SelectField
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Scheduled">Scheduled</option>
              </SelectField>
            </div>
          </div>

          {/* PROPERTY + PARTY */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FieldLabel>Property</FieldLabel>
              <SelectField
                value={property}
                onChange={(e) => setProperty(e.target.value)}
              >
                <option>123 OAK ST • UNIT 4</option>
                <option>55 CRYSTAL FALLS DR</option>
                <option>PORTFOLIO</option>
              </SelectField>
            </div>
            <div>
              <FieldLabel>Party (Tenant/Vendor/Owner)</FieldLabel>
              <TextInput
                placeholder="Jordan Tenant"
                value={party}
                onChange={(e) => setParty(e.target.value)}
              />
            </div>
          </div>

          {/* AMOUNT + CATEGORY + PAYMENT METHOD */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <FieldLabel>Amount</FieldLabel>
              <TextInput
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
              />
            </div>
            <div>
              <FieldLabel>Category</FieldLabel>
              <SelectField
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Rent">Rent</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Utilities">Utilities</option>
                <option value="Insurance">Insurance</option>
                <option value="Other">Other</option>
              </SelectField>
            </div>
            <div>
              <FieldLabel>Payment Method</FieldLabel>
              <SelectField
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="ACH">ACH</option>
                <option value="Check">Check</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="Zelle">Zelle</option>
              </SelectField>
            </div>
          </div>

          {/* MEMO */}
          <div>
            <FieldLabel>Memo</FieldLabel>
            <TextInput
              placeholder="JANUARY RENT • UNIT 4"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
          </div>

          {/* NOTES */}
          <div className="pb-2">
            <FieldLabel>Notes</FieldLabel>
            <textarea
              rows={4}
              placeholder="Optional notes for your records..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
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
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
