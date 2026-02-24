/* ─────────────────────────────────────────────────────────────
   src/components/FormComponents.jsx
   Reusable primitives for the Add / Edit Property forms.
───────────────────────────────────────────────────────────── */

/* ── Section card wrapper ──────────────────────────────────── */
export function FormSection({ id, title, children }) {
  return (
    <div id={id} className="border border-[#0F11141A] rounded-3xl">
      <p className="text-base font-bold text-[#0F1114] py-5 pl-[25px] border-b border-[#0F11141A]">
        {title}
      </p>
      {children}
    </div>
  );
}

/* ── Standard padding wrapper inside a section ─────────────── */
export function FormBody({ children, className = "" }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

/* ── Field label ───────────────────────────────────────────── */
export function FieldLabel({ children }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0F1114] mb-[5px]">
      {children}
    </p>
  );
}

/* ── Shared input class string (exported for reuse) ────────── */
export const inputCls =
  "w-full border border-[#0F11141A] rounded-full px-5 py-[15px] text-sm text-[#0F1114] placeholder-[#0F111466] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition bg-white";

/* ── Text / number input ───────────────────────────────────── */
export function FieldInput({
  type = "text",
  placeholder,
  className = "",
  ...rest
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`${inputCls} ${className}`}
      {...rest}
    />
  );
}

/* ── Select / dropdown ─────────────────────────────────────── */
export function FieldSelect({ children, value, onChange, className = "" }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className={`${inputCls} appearance-none pr-10 text-[#0F111466] ${className}`}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
          <path
            d="M1 1l5 5 5-5"
            stroke="#0F1114"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
}

/* ── Labelled field (label + input) ────────────────────────── */
export function Field({ label, children }) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      {children}
    </div>
  );
}

/* ── Responsive grid (2-col or 3-col) ─────────────────────── */
export function FormGrid({ cols = 2, children, className = "" }) {
  const colCls =
    cols === 3
      ? "grid-cols-1 sm:grid-cols-3"
      : cols === 1
        ? "grid-cols-1"
        : "grid-cols-1 sm:grid-cols-2";
  return (
    <div className={`grid ${colCls} gap-x-5 gap-y-5 p-6 ${className}`}>
      {children}
    </div>
  );
}

/* ── Chevron SVG (shared) ──────────────────────────────────── */
export function Chevron() {
  return (
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
      <path
        d="M1 1l5 5 5-5"
        stroke="#0F1114"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Radio pill (circle indicator) ────────────────────────── */
export function RadioPill({ label, name, checked, onChange }) {
  return (
    <label
      className={`flex items-center gap-2 px-4 py-2.5 rounded-full border cursor-pointer select-none transition
        ${checked ? "border-[#0F1114]" : "border-[#0F11141A] hover:border-[#0F114080]"} bg-white`}
    >
      <input
        type="radio"
        name={name}
        className="hidden"
        checked={checked}
        onChange={onChange}
      />
      <span className="w-4 h-4 rounded-full border-2 border-[#0F1114] flex items-center justify-center flex-shrink-0 transition">
        {checked && (
          <span className="w-2 h-2 rounded-full bg-[#0F1114] block" />
        )}
      </span>
      <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#0F1114] whitespace-nowrap">
        {label}
      </span>
    </label>
  );
}

/* ── Checkbox pill (square indicator) ─────────────────────── */
export function CheckboxPill({ label, checked, onChange }) {
  return (
    <label
      className={`flex items-center gap-2 px-4 py-2.5 rounded-full border cursor-pointer select-none transition
        ${checked ? "border-[#0F1114]" : "border-[#0F11141A] hover:border-[#0F114080]"} bg-white`}
    >
      <input
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={onChange}
      />
      <span
        className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center flex-shrink-0 transition
          ${checked ? "border-[#0F1114] bg-[#0F1114]" : "border-[#0F1114] bg-white"}`}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4l3 3 5-6"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#0F1114] whitespace-nowrap">
        {label}
      </span>
    </label>
  );
}

/* ── Pill group wrapper ─────────────────────────────────────── */
export function PillGroup({ children, className = "" }) {
  return (
    <div className={`flex flex-wrap gap-3 p-6 ${className}`}>{children}</div>
  );
}

/* ── Tag-input field (type + enter to add) ─────────────────── */
export function TagInput({
  label,
  value,
  onChange,
  onKeyDown,
  placeholder,
  tags,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
      <div>
        <FieldLabel>{label}</FieldLabel>
        <FieldInput
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className="uppercase"
        />
        <p className="text-xs text-[#0F111499] mt-2 font-semibold">
          Press Enter to add
        </p>
      </div>
      <div>
        <FieldLabel>Selected</FieldLabel>
        <div className={`${inputCls} min-h-[50px] flex items-center`}>
          <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#0F111466]">
            {tags.length > 0 ? tags.join(", ") : "None yet"}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Pet policy block (dogs or cats) ───────────────────────── */
export function PetPolicyFields({ petLabel }) {
  return (
    <FormGrid cols={2}>
      <Field label={`${petLabel} Allowed`}>
        <FieldSelect>
          <option value="">Select</option>
          <option>Yes</option>
          <option>No</option>
          <option>Case by Case</option>
        </FieldSelect>
      </Field>

      <Field label={`How Many ${petLabel} Allowed`}>
        <FieldInput type="number" placeholder="1" />
      </Field>

      <Field label={`One-Time ${petLabel} Deposit Amount`}>
        <FieldInput type="number" placeholder="300" />
      </Field>

      <Field label="Monthly Fee Amount">
        <FieldSelect>
          <option value="0">0 (None)</option>
          <option>$25 / month</option>
          <option>$50 / month</option>
          <option>$75 / month</option>
          <option>$100 / month</option>
        </FieldSelect>
      </Field>
    </FormGrid>
  );
}

/* ── Occupancy radio button (bordered pill style) ──────────── */
export function OccupancyRadio({ label, value, current, onChange }) {
  const checked = current === value;
  return (
    <label className="flex items-center gap-2.5 cursor-pointer select-none border border-[#0F11141A] rounded-full py-[9px] px-[15px]">
      <input
        type="radio"
        name="occupancyStatus"
        className="hidden"
        checked={checked}
        onChange={() => onChange(value)}
      />
      <span className="w-4 h-4 rounded-full border-2 border-[#0F1114] flex items-center justify-center flex-shrink-0">
        {checked && (
          <span className="w-2 h-2 rounded-full bg-[#0F1114] block" />
        )}
      </span>
      <span className="text-sm font-semibold text-[#0F1114]">{label}</span>
    </label>
  );
}
