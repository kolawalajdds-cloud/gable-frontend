import { useEffect, useRef, useState } from "react";

/* ── Icons ─────────────────────────────────────────────── */
function XIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0F1114"
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
      stroke="#0F1114"
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
function PlusIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0F1114"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

/* ── Shared data ─────────────────────────────────────────── */
const PROPERTIES = ["123 Oak • Unit 4", "55 Crystal Falls Dr", "Portfolio"];
const LEASE_TYPES = ["Fixed", "Month-to-Month"];
const ALL_TENANTS = [
  "Taylor Green",
  "Jordan Lee",
  "Avery Patel",
  "Morgan Diaz",
];
const DEPOSIT_TYPES = [
  "Security Deposit",
  "Pet Deposit",
  "Key Deposit",
  "Other",
];
const FREQUENCIES = ["One-Time", "Monthly", "Weekly", "Bi-Weekly", "Annually"];
const UTILITIES = ["Electricity", "Gas", "Water", "Internet", "Sewer", "Trash"];
const RESPONSIBLE_PARTIES = ["Tenant", "Owner", "Split"];
const DATE_DUE_OPTIONS = Array.from({ length: 28 }, (_, i) => String(i + 1));

/* ── Reusable primitives ─────────────────────────────────── */
function FieldLabel({ children, className = "" }) {
  return (
    <label
      className={`block text-xs font-bold text-[#0F1114] uppercase mb-[5px] ${className}`}
    >
      {children}
    </label>
  );
}

function SelectField({ value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="w-full border border-[#0F11141A] rounded-full px-5 py-[15px] text-xs font-semibold text-[#0F1114] appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition uppercase"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#0F1114]">
        <ChevDown />
      </span>
    </div>
  );
}

function DateField({ value, onChange }) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full border border-[#0F11141A] rounded-full px-5 py-[14px] pr-11 text-xs font-semibold text-[#0F1114] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      />
      <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ">
        <CalIcon />
      </span>
    </div>
  );
}

function TextInput({ value, onChange, placeholder = "" }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-[#0F11141A] rounded-full px-5 py-[15px] text-xs font-semibold text-[#0F1114] placeholder-[#0F111466] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition uppercase"
    />
  );
}

function NumberInput({ value, onChange, placeholder = "0" }) {
  return (
    <input
      type="number"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-[#0F11141A] rounded-full px-5 py-[14px] text-xs font-semibold text-[#0F1114] placeholder-[#0F111466] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
    />
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="mt-4 mb-[18px]">
      <h3 className="text-base font-bold text-[#0F1114]">{title}</h3>
      {subtitle && (
        <p className="text-xs text-[#0F111499] font-medium mt-0.5">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function SectionHeaderWithAction({ title, subtitle, btnLabel, onBtnClick }) {
  return (
    <div className="mt-6 mb-3 flex items-start justify-between gap-4">
      <div>
        <h3 className="text-base font-bold text-[#0F1114]">{title}</h3>
        {subtitle && (
          <p className="text-xs text-[#0F111499] font-medium mt-1 ">
            {subtitle}
          </p>
        )}
      </div>
      <button
        onClick={onBtnClick}
        className="flex items-center gap-1.5 px-[18px] py-3 border border-[#0F1114] rounded-full text-xs font-extrabold text-[#0F1114] hover:bg-gray-50 transition whitespace-nowrap flex-shrink-0 mt-[7px] uppercase"
      >
        <PlusIcon /> {btnLabel}
      </button>
    </div>
  );
}

function TenantCheckbox({ name, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 border border-[#0F11141A] rounded-full px-3 py-2 cursor-pointer hover:bg-gray-50 transition select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded border-gray-300 accent-[#2563EB] cursor-pointer flex-shrink-0"
      />
      <span className="text-xs font-bold text-[#0F1114] uppercase tracking-wide whitespace-nowrap">
        {name}
      </span>
    </label>
  );
}

function RemoveBtn({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-[#9CA3AF] hover:text-red-500 transition flex-shrink-0 self-end pb-[14px]"
    >
      <XIcon />
    </button>
  );
}

/* ── MoveInModal ─────────────────────────────────────────── */
export default function MoveInModal({ onClose }) {
  const overlayRef = useRef(null);

  /* Property & Lease */
  const [property, setProperty] = useState("123 Oak • Unit 4");
  const [leaseType, setLeaseType] = useState("Fixed");
  const [leaseNo, setLeaseNo] = useState("");
  const [startsOn, setStartsOn] = useState("24-02-2026");
  const [endsOn, setEndsOn] = useState("24-02-2027");

  /* Tenants */
  const [selectedTenants, setSelectedTenants] = useState({});

  /* Renters Insurance */
  const [insuranceRequired, setInsuranceRequired] = useState(false);

  /* Dependents */
  const [dependents, setDependents] = useState([
    { name: "", relationship: "" },
    { name: "", relationship: "" },
  ]);

  /* Rent Payments */
  const [rentEnabled, setRentEnabled] = useState(false);
  const [firstRentDate, setFirstRentDate] = useState("24-02-2026");
  const [dateDue, setDateDue] = useState("25");
  const [frequency, setFrequency] = useState("Monthly");
  const [totalAmount, setTotalAmount] = useState("");
  const [markAllPaid, setMarkAllPaid] = useState(false);

  /* Deposits */
  const [deposits, setDeposits] = useState([
    { type: "Security Deposit", amount: "" },
    { type: "Security Deposit", amount: "" },
  ]);

  /* Other Lease Transactions */
  const [transactions, setTransactions] = useState([
    { name: "", amount: "", frequency: "One-Time", startDate: "25-02-2027" },
  ]);

  /* Late Fees */
  const [oneTimeFee, setOneTimeFee] = useState(false);
  const [dailyFee, setDailyFee] = useState(false);

  /* Responsibilities */
  const [responsibilities, setResponsibilities] = useState([
    { utility: "Electricity", party: "Tenant" },
  ]);

  /* Utility Settings */
  const [utilitySettings, setUtilitySettings] = useState({});

  /* Handlers */
  function toggleTenant(name) {
    setSelectedTenants((prev) => ({ ...prev, [name]: !prev[name] }));
  }
  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) onClose();
  }
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  /* Dependent helpers */
  const addDependent = () =>
    setDependents((p) => [...p, { name: "", relationship: "" }]);
  const removeDependent = (i) =>
    setDependents((p) => p.filter((_, j) => j !== i));
  const updateDependent = (i, f, v) =>
    setDependents((p) => p.map((d, j) => (j === i ? { ...d, [f]: v } : d)));

  /* Deposit helpers */
  const addDeposit = () =>
    setDeposits((p) => [...p, { type: "Security Deposit", amount: "" }]);
  const removeDeposit = (i) => setDeposits((p) => p.filter((_, j) => j !== i));
  const updateDeposit = (i, f, v) =>
    setDeposits((p) => p.map((d, j) => (j === i ? { ...d, [f]: v } : d)));

  /* Transaction helpers */
  const addTransaction = () =>
    setTransactions((p) => [
      ...p,
      { name: "", amount: "", frequency: "One-Time", startDate: "25-02-2027" },
    ]);
  const removeTransaction = (i) =>
    setTransactions((p) => p.filter((_, j) => j !== i));
  const updateTransaction = (i, f, v) =>
    setTransactions((p) => p.map((t, j) => (j === i ? { ...t, [f]: v } : t)));

  /* Responsibility helpers */
  const addResponsibility = () =>
    setResponsibilities((p) => [
      ...p,
      { utility: "Electricity", party: "Tenant" },
    ]);
  const removeResponsibility = (i) =>
    setResponsibilities((p) => p.filter((_, j) => j !== i));
  const updateResponsibility = (i, f, v) =>
    setResponsibilities((p) =>
      p.map((r, j) => (j === i ? { ...r, [f]: v } : r)),
    );

  const toggleUtility = (name) =>
    setUtilitySettings((p) => ({ ...p, [name]: !p[name] }));

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex justify-end"
      style={{ background: "rgba(15,17,20,0.45)" }}
    >
      <div className="relative bg-white h-full w-full max-w-[544px] flex flex-col shadow-2xl animate-slide-in overflow-hidden rounded-l-[32px]">
        {/* ── Header ── */}
        <div className="px-6 pt-5 pb-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#0F1114]">Move in</h2>
              <p className="text-xs font-medium text-[#0F111499] mt-[3px]">
                Set up lease, tenants, payments, deposits, and utilities.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 border border-[#0F11141A] rounded-full hover:bg-gray-100 transition text-[#0F1114] flex-shrink-0 mt-0.5"
            >
              <XIcon />
            </button>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {/* SELECT PROPERTY */}
          <div className="mt-[2px]">
            <FieldLabel>Select Property</FieldLabel>
            <SelectField
              value={property}
              onChange={(e) => setProperty(e.target.value)}
              options={PROPERTIES}
            />
            <p className="text-xs text-[#0F111499] font-bold mt-[5px]">
              Select a property dropdown
            </p>
          </div>

          {/* LEASE TERMS */}
          <SectionHeader
            title="Lease Terms"
            subtitle="Select the lease type, start and end dates"
          />
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <FieldLabel>Select Fixed or Month-to-Month</FieldLabel>
              <SelectField
                value={leaseType}
                onChange={(e) => setLeaseType(e.target.value)}
                options={LEASE_TYPES}
              />
            </div>
            <div>
              <FieldLabel>Lease #</FieldLabel>
              <input
                type="text"
                placeholder="Optional"
                value={leaseNo}
                onChange={(e) => setLeaseNo(e.target.value)}
                className="w-full border border-[#0F11141A] rounded-full px-5 py-[14px] text-xs text-[#0F1114] placeholder-[#0F111466] font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FieldLabel>Starts On</FieldLabel>
              <DateField
                value={startsOn}
                onChange={(e) => setStartsOn(e.target.value)}
              />
            </div>
            <div>
              <FieldLabel>Ends On</FieldLabel>
              <DateField
                value={endsOn}
                onChange={(e) => setEndsOn(e.target.value)}
              />
            </div>
          </div>

          {/* TENANTS */}
          <SectionHeader
            title="Tenants"
            subtitle="If your tenant is connected with you, the lease will be automatically shared with them"
          />
          <FieldLabel>Choose Tenants</FieldLabel>
          <div className="grid grid-cols-2 gap-2">
            {ALL_TENANTS.map((name) => (
              <TenantCheckbox
                key={name}
                name={name}
                checked={!!selectedTenants[name]}
                onChange={() => toggleTenant(name)}
              />
            ))}
          </div>

          {/* RENTERS INSURANCE */}
          <SectionHeader
            title="Renters Insurance"
            subtitle="Require renters insurance or allow tenants to submit proof of an existing policy."
          />
          <label className="flex items-center gap-3 cursor-pointer select-none border border-[#0F11141A] py-[9px] px-4 rounded-full w-fit">
            <input
              type="checkbox"
              checked={insuranceRequired}
              onChange={() => setInsuranceRequired((v) => !v)}
              className="w-4 h-4 rounded border-gray-300 accent-[#2563EB] cursor-pointer flex-shrink-0"
            />
            <span className="text-xs font-semibold text-[#0F1114] uppercase tracking-wide">
              Insurance Required Before Signing
            </span>
          </label>

          {/* DEPENDENTS */}
          <SectionHeaderWithAction
            title="Dependents"
            subtitle="Dependents live with the property but do not have access to Tenant Portal or online payments."
            btnLabel="Add Dependent"
            onBtnClick={addDependent}
          />
          <div className="flex flex-col gap-3">
            {dependents.map((dep, i) => (
              <div key={i} className="flex items-end gap-2">
                <div className="flex-1">
                  <FieldLabel>Name</FieldLabel>
                  <TextInput
                    value={dep.name}
                    onChange={(e) => updateDependent(i, "name", e.target.value)}
                    placeholder="Full Name"
                  />
                </div>
                <div className="flex-1">
                  <FieldLabel>Relationship</FieldLabel>
                  <TextInput
                    value={dep.relationship}
                    onChange={(e) =>
                      updateDependent(i, "relationship", e.target.value)
                    }
                    placeholder="Child, Spouse, Roommate..."
                  />
                </div>
                <RemoveBtn onClick={() => removeDependent(i)} />
              </div>
            ))}
          </div>

          {/* RENT PAYMENTS */}
          <SectionHeader
            title="Rent Payments"
            subtitle="Enter the rent amount, payment frequency, and start date."
          />
          <label className="flex items-center gap-3 cursor-pointer select-none mb-4">
            <input
              type="checkbox"
              checked={rentEnabled}
              onChange={() => setRentEnabled((v) => !v)}
              className="w-4 h-4 rounded border-gray-300 accent-[#2563EB] cursor-pointer flex-shrink-0"
            />
            <span className="text-xs font-semibold text-[#0F1114] uppercase tracking-wide">
              Enable Recurring Rent Invoicing
            </span>
          </label>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <FieldLabel>First Rent Date</FieldLabel>
              <DateField
                value={firstRentDate}
                onChange={(e) => setFirstRentDate(e.target.value)}
              />
            </div>
            <div>
              <FieldLabel>Date Due (Day)</FieldLabel>
              <SelectField
                value={dateDue}
                onChange={(e) => setDateDue(e.target.value)}
                options={DATE_DUE_OPTIONS}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <FieldLabel>Frequency</FieldLabel>
              <SelectField
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                options={FREQUENCIES}
              />
            </div>
            <div>
              <FieldLabel>Total Amount</FieldLabel>
              <NumberInput
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
              />
            </div>
          </div>
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={markAllPaid}
              onChange={() => setMarkAllPaid((v) => !v)}
              className="w-4 h-4 rounded border-gray-300 accent-[#2563EB] cursor-pointer flex-shrink-0"
            />
            <span className="text-xs font-semibold text-[#0F1114] uppercase tracking-wide">
              Mark All Past Invoice As Paid
            </span>
          </label>

          {/* DEPOSITS */}
          <SectionHeaderWithAction
            title="Deposits"
            subtitle="Include any additional deposits for your lease here."
            btnLabel="Add Deposit"
            onBtnClick={addDeposit}
          />
          <div className="flex flex-col gap-3">
            {deposits.map((dep, i) => (
              <div key={i} className="flex items-end gap-2">
                <div className="flex-1">
                  <FieldLabel>Type</FieldLabel>
                  <SelectField
                    value={dep.type}
                    onChange={(e) => updateDeposit(i, "type", e.target.value)}
                    options={DEPOSIT_TYPES}
                  />
                </div>
                <div className="flex-1">
                  <FieldLabel>Amount</FieldLabel>
                  <NumberInput
                    value={dep.amount}
                    onChange={(e) => updateDeposit(i, "amount", e.target.value)}
                  />
                </div>
                <RemoveBtn onClick={() => removeDeposit(i)} />
              </div>
            ))}
          </div>

          {/* OTHER LEASE TRANSACTIONS */}
          <SectionHeaderWithAction
            title="Other Lease Transactions"
            subtitle="Add one-time or recurring invoice charges included in the lease."
            btnLabel="Add Transaction"
            onBtnClick={addTransaction}
          />
          <div className="flex flex-col gap-4">
            {transactions.map((txn, i) => (
              <div key={i}>
                <div className="flex items-end gap-2 mb-3">
                  <div className="flex-1">
                    <FieldLabel>Name</FieldLabel>
                    <TextInput
                      value={txn.name}
                      onChange={(e) =>
                        updateTransaction(i, "name", e.target.value)
                      }
                      placeholder="Example: Move-in Fee"
                    />
                  </div>
                  <div className="flex-1">
                    <FieldLabel>Amount</FieldLabel>
                    <NumberInput
                      value={txn.amount}
                      onChange={(e) =>
                        updateTransaction(i, "amount", e.target.value)
                      }
                    />
                  </div>
                  <RemoveBtn onClick={() => removeTransaction(i)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <FieldLabel>Frequency</FieldLabel>
                    <SelectField
                      value={txn.frequency}
                      onChange={(e) =>
                        updateTransaction(i, "frequency", e.target.value)
                      }
                      options={FREQUENCIES}
                    />
                  </div>
                  <div>
                    <FieldLabel>Start Date</FieldLabel>
                    <DateField
                      value={txn.startDate}
                      onChange={(e) =>
                        updateTransaction(i, "startDate", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* LATE FEES */}
          <SectionHeader
            title="Late Fees"
            subtitle="Enable both fees; daily fee begins the day after the one-time fee is applied."
          />
          <div className="flex flex-wrap gap-2">
            <label className="flex items-center gap-2 cursor-pointer select-none border border-[#0F11141A] py-[9px] px-4 rounded-full ">
              <input
                type="checkbox"
                checked={oneTimeFee}
                onChange={() => setOneTimeFee((v) => !v)}
                className="w-4 h-4 rounded border-gray-300 accent-[#2563EB] cursor-pointer flex-shrink-0"
              />
              <span className="text-xs font-semibold text-[#0F1114] uppercase tracking-wide whitespace-nowrap">
                One Time Rent Late Fee
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none border border-[#0F11141A] py-[9px] px-4 rounded-full">
              <input
                type="checkbox"
                checked={dailyFee}
                onChange={() => setDailyFee((v) => !v)}
                className="w-4 h-4 rounded border-gray-300 accent-[#2563EB] cursor-pointer flex-shrink-0"
              />
              <span className="text-xs font-semibold text-[#0F1114] uppercase tracking-wide whitespace-nowrap">
                Daily Rent Late Fee
              </span>
            </label>
          </div>

          {/* RESPONSIBILITIES & PROVIDERS */}
          <SectionHeaderWithAction
            title="Responsibilities & Providers"
            subtitle="Choose who is responsible for utilities each month."
            btnLabel="Responsibility"
            onBtnClick={addResponsibility}
          />
          <div className="flex flex-col gap-3">
            {responsibilities.map((r, i) => (
              <div key={i} className="flex items-end gap-2">
                <div className="flex-1">
                  <FieldLabel>Utility</FieldLabel>
                  <SelectField
                    value={r.utility}
                    onChange={(e) =>
                      updateResponsibility(i, "utility", e.target.value)
                    }
                    options={UTILITIES}
                  />
                </div>
                <div className="flex-1">
                  <FieldLabel>Responsible Party</FieldLabel>
                  <SelectField
                    value={r.party}
                    onChange={(e) =>
                      updateResponsibility(i, "party", e.target.value)
                    }
                    options={RESPONSIBLE_PARTIES}
                  />
                </div>
                <RemoveBtn onClick={() => removeResponsibility(i)} />
              </div>
            ))}
          </div>

          {/* UTILITY PROVIDERS SETTINGS */}
          <SectionHeader
            title="Utility Providers Settings"
            subtitle="Select which services tenants must set up."
          />
          <div className="flex flex-wrap gap-1">
            {UTILITIES.map((u) => (
              <label
                key={u}
                className="flex items-center gap-2 cursor-pointer select-none border border-[#0F11141A] bg-[#0F111405] px-[16px] py-4 rounded-full w-fit"
              >
                <input
                  type="checkbox"
                  checked={!!utilitySettings[u]}
                  onChange={() => toggleUtility(u)}
                  className="w-4 h-4 rounded border-gray-300 accent-[#2563EB] cursor-pointer flex-shrink-0"
                />
                <span className="text-xs font-semibold text-[#0F1114] uppercase ">
                  {u}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 flex-shrink-0 bg-white">
          <button
            onClick={onClose}
            className="px-6 py-[13px] border border-[#0F1114] rounded-full text-xs font-extrabold text-[#0F1114] hover:bg-gray-50 transition uppercase tracking-wide"
          >
            Cancel
          </button>
          <button className="px-6 py-[13px] bg-gradient-to-r from-[#004CE5] to-[#3388FF] rounded-full text-xs font-extrabold text-white hover:bg-[#1d4ed8] transition uppercase tracking-wide">
            Send Invite
          </button>
        </div>
      </div>
    </div>
  );
}
