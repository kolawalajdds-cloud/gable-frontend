import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import {
  FormSection,
  FormBody,
  FormGrid,
  Field,
  FieldInput,
  FieldSelect,
  FieldLabel,
  PillGroup,
  RadioPill,
  CheckboxPill,
  TagInput,
  PetPolicyFields,
  OccupancyRadio,
  inputCls,
} from "../components/Formcomponents";

/* ─── Main page ──────────────────────────────────────────── */
export default function AddPropertyPage() {
  const navigate = useNavigate();

  /* ── property type ── */
  const [propTypes, setPropTypes] = useState({ selectedType: "" });

  /* ── parking ── */
  const [parking, setParking] = useState({
    attachedGarage: false,
    carport: false,
    valetParking: false,
    offStreet: false,
    streetParking: false,
    noParking: false,
  });
  const toggleParking = (key) => setParking((p) => ({ ...p, [key]: !p[key] }));

  /* ── appliances ── */
  const [appliances, setAppliances] = useState({
    stove: false,
    oven: false,
    refrigerator: false,
    dishwasher: false,
    washer: false,
    dryer: false,
  });
  const toggleAppliance = (key) =>
    setAppliances((p) => ({ ...p, [key]: !p[key] }));

  /* ── laundry ── */
  const [laundry, setLaundry] = useState("");

  /* ── occupancy ── */
  const [occupancy, setOccupancy] = useState("vacant");

  /* ── amenity tag inputs ── */
  const [unitAmenities, setUnitAmenities] = useState([]);
  const [unitInput, setUnitInput] = useState("");
  const [buildingAmenities, setBuildingAmenities] = useState([]);
  const [buildingInput, setBuildingInput] = useState("");
  const [groundsAmenities, setGroundsAmenities] = useState([]);
  const [groundsInput, setGroundsInput] = useState("");

  /* ── services ── */
  const [conciergeService, setConciergeService] = useState("");

  /* ── tag-input handlers ── */
  const makeTagHandler = (list, setList, setInput) => (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      const val = e.target.value.trim();
      if (!list.includes(val)) setList([...list, val]);
      setInput("");
    }
  };

  return (
    <DashboardLayout>
      {/* ── Page header ── */}
      <div className="flex justify-between gap-4 mb-6">
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/portfolio")}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-[#0F11141A] bg-white hover:bg-gray-50 transition flex-shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 12l14 0" />
              <path d="M5 12l6 6" />
              <path d="M5 12l6 -6" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-bold text-[#0F1114] leading-tight">
              Add Property
            </h1>
            <p className="text-sm text-[#0F1114CC] mt-0.5">
              Create a new rental listing for your portfolio.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-5 py-[13px] border border-[#0F1114] rounded-full text-sm font-extrabold text-[#0F1114] hover:bg-gray-50 transition uppercase">
            Save Draft
          </button>
          <button className="px-5 py-[13px] bg-[linear-gradient(225.01deg,#3388FF_0%,#004CE6_100%)] shadow-[0px_4px_8px_-2px_#004CE580] rounded-full text-sm font-extrabold text-white hover:opacity-90 transition uppercase">
            Add Property
          </button>
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div className="flex gap-6 items-start">
        {/* ════ MAIN FORM ════ */}
        <div className="flex-1 min-w-0 flex flex-col gap-[26px]">
          {/* 1. Address */}
          <FormSection id="address" title="Rental Property Address">
            <FormGrid cols={2}>
              <Field label="Street Address">
                <FieldInput placeholder="123 Oak St" />
              </Field>
              <Field label="Unit Number">
                <FieldInput placeholder="Unit 4 (Optional)" />
              </Field>
              <Field label="City">
                <FieldInput placeholder="Oakland" />
              </Field>
              <Field label="Zipcode">
                <FieldInput placeholder="94610" />
              </Field>
            </FormGrid>
          </FormSection>

          {/* 2. Type of Property */}
          <FormSection id="legal" title="Type of Property">
            <PillGroup>
              {[
                "Single Individual",
                "Condo",
                "Apartment",
                "Town Home",
                "Mobile Home",
              ].map((type) => (
                <RadioPill
                  key={type}
                  label={type}
                  name="propertyType"
                  checked={propTypes.selectedType === type}
                  onChange={() =>
                    setPropTypes((p) => ({ ...p, selectedType: type }))
                  }
                />
              ))}
            </PillGroup>
          </FormSection>

          {/* 3. Bedrooms / Bathrooms / Size */}
          <FormSection id="rooms" title="Bedrooms, Bathrooms & Size">
            <FormGrid cols={3}>
              <Field label="No of Bedrooms">
                <FieldInput type="number" placeholder="3" />
              </Field>
              <Field label="No of Bathrooms">
                <FieldInput type="number" placeholder="2" />
              </Field>
              <Field label="Property Sqft">
                <FieldInput type="number" placeholder="1450" />
              </Field>
            </FormGrid>
          </FormSection>

          {/* 4. Appliances */}
          <FormSection id="appliances" title="Appliances">
            <PillGroup>
              {[
                { key: "stove", label: "Stove" },
                { key: "oven", label: "Oven" },
                { key: "refrigerator", label: "Refrigerator" },
                { key: "dishwasher", label: "Dishwasher" },
                { key: "washer", label: "Washer" },
                { key: "dryer", label: "Dryer" },
              ].map(({ key, label }) => (
                <RadioPill
                  key={key}
                  label={label}
                  name={`appliance-${key}`}
                  checked={appliances[key]}
                  onChange={() => toggleAppliance(key)}
                />
              ))}
            </PillGroup>
          </FormSection>

          {/* 5. Laundry */}
          <FormSection id="laundry" title="Laundry Included">
            <PillGroup>
              {[
                { val: "in-unit", label: "In-Unit" },
                { val: "shared", label: "Shared" },
                { val: "hookups", label: "Hookups" },
                { val: "none", label: "None" },
              ].map(({ val, label }) => (
                <RadioPill
                  key={val}
                  label={label}
                  name="laundry"
                  checked={laundry === val}
                  onChange={() => setLaundry(val)}
                />
              ))}
            </PillGroup>
          </FormSection>

          {/* 6. Parking */}
          <FormSection id="parking" title="Parking">
            <div className="flex flex-col">
              <PillGroup className="border-b border-[#0F11141A]">
                {[
                  { key: "attachedGarage", label: "Attached Garage" },
                  { key: "carport", label: "Carport" },
                  { key: "valetParking", label: "Valet Parking" },
                  { key: "offStreet", label: "Off-Street Parking" },
                  { key: "streetParking", label: "Street Parking" },
                  { key: "noParking", label: "No Parking" },
                ].map(({ key, label }) => (
                  <CheckboxPill
                    key={key}
                    label={label}
                    checked={parking[key]}
                    onChange={() => toggleParking(key)}
                  />
                ))}
              </PillGroup>
              <div className="max-w-[290px] p-6">
                <Field label="Monthly Parking Fee">
                  <FieldSelect>
                    <option value="">Select</option>
                    <option>$50 / month</option>
                    <option>$100 / month</option>
                    <option>$150 / month</option>
                    <option>$200 / month</option>
                    <option>Included in rent</option>
                  </FieldSelect>
                </Field>
              </div>
            </div>
          </FormSection>

          {/* 7. Rent & Security Deposit */}
          <FormSection id="rent" title="Rent & Security Deposit">
            <FormGrid cols={2}>
              <Field label="Monthly Rent Amount">
                <FieldInput type="number" placeholder="2500" />
              </Field>
              <Field label="Security Deposit Amount">
                <FieldInput type="number" placeholder="2500" />
              </Field>
            </FormGrid>
          </FormSection>

          {/* 8. Late Fees Policy */}
          <FormSection id="late-fees" title="Late Fees Policy">
            <FormGrid cols={2}>
              <Field label="Days Before Late Fee">
                <FieldInput type="number" placeholder="3" />
              </Field>
              <Field label="Late Fee Type">
                <FieldSelect>
                  <option value="">Select</option>
                  <option>Flat Fee</option>
                  <option>Percentage of Rent</option>
                  <option>No Late Fee</option>
                </FieldSelect>
              </Field>
            </FormGrid>
          </FormSection>

          {/* 9. Utilities Responsibility */}
          <FormSection id="utilities" title="Utilities Responsibility">
            <FormGrid cols={2}>
              {["Electric", "Gas", "Water", "Garbage", "Sewage"].map((util) => (
                <Field key={util} label={util}>
                  <FieldSelect>
                    <option value="">Select</option>
                    <option>Landlord</option>
                    <option>Tenant</option>
                    <option>Split</option>
                  </FieldSelect>
                </Field>
              ))}
            </FormGrid>
          </FormSection>

          {/* 10. Dogs Policy */}
          <FormSection id="dogs-policy" title="Dogs Policy">
            <PetPolicyFields petLabel="Dogs" />
          </FormSection>

          {/* 11. Cats Policy */}
          <FormSection id="cats-policy" title="Cats Policy">
            <PetPolicyFields petLabel="Cats" />
          </FormSection>

          {/* 12. Unit Amenities */}
          <FormSection id="unit-amenities" title="Unit Amenities">
            <FormBody>
              <TagInput
                label="Add Amenity"
                value={unitInput}
                onChange={(e) => setUnitInput(e.target.value)}
                onKeyDown={makeTagHandler(
                  unitAmenities,
                  setUnitAmenities,
                  setUnitInput,
                )}
                placeholder="E.G., HARDWOOD FLOORS"
                tags={unitAmenities}
              />
            </FormBody>
          </FormSection>

          {/* 13. Building Amenities */}
          <FormSection id="building-amenities" title="Building Amenities">
            <FormBody>
              <TagInput
                label="Add Amenity"
                value={buildingInput}
                onChange={(e) => setBuildingInput(e.target.value)}
                onKeyDown={makeTagHandler(
                  buildingAmenities,
                  setBuildingAmenities,
                  setBuildingInput,
                )}
                placeholder="E.G., FITNESS CENTER"
                tags={buildingAmenities}
              />
              <div className="mt-3">
                <button className="px-8 py-2.5 border border-[#0F1114] rounded-full text-xs font-bold uppercase tracking-[0.12em] text-[#0F1114] hover:bg-gray-50 transition">
                  SKIP
                </button>
              </div>
            </FormBody>
          </FormSection>

          {/* 14. Grounds */}
          <FormSection id="grounds" title="Grounds">
            <FormBody>
              <TagInput
                label="Add Amenity"
                value={groundsInput}
                onChange={(e) => setGroundsInput(e.target.value)}
                onKeyDown={makeTagHandler(
                  groundsAmenities,
                  setGroundsAmenities,
                  setGroundsInput,
                )}
                placeholder="E.G., EV CHARGING"
                tags={groundsAmenities}
              />
              <div className="mt-3">
                <button className="px-8 py-2.5 border border-[#0F1114] rounded-full text-xs font-bold uppercase tracking-[0.12em] text-[#0F1114] hover:bg-gray-50 transition">
                  SKIP
                </button>
              </div>
            </FormBody>
          </FormSection>

          {/* 15. Services */}
          <FormSection id="services" title="Services">
            <FormBody>
              <div className="max-w-[342px]">
                <Field label="Concierge Service">
                  <FieldSelect
                    value={conciergeService}
                    onChange={(e) => setConciergeService(e.target.value)}
                  >
                    <option value="">SELECT</option>
                    <option value="yes">YES</option>
                    <option value="no">NO</option>
                  </FieldSelect>
                </Field>
              </div>
            </FormBody>
          </FormSection>

          {/* 16. Smoking Policy */}
          <FormSection id="smoking-policy" title="Smoking Policy">
            <FormGrid cols={2}>
              <Field label="Smoking Permitted in Unit">
                <FieldSelect>
                  <option value="">Select</option>
                  <option>Yes</option>
                  <option>No</option>
                  <option>Outside Only</option>
                </FieldSelect>
              </Field>
              <Field label="Smoking Permitted in Building">
                <FieldSelect>
                  <option value="">Select</option>
                  <option>Yes</option>
                  <option>No</option>
                  <option>Designated Areas Only</option>
                </FieldSelect>
              </Field>
            </FormGrid>
          </FormSection>

          {/* 17. Property Photos */}
          <FormSection id="property-photos" title="Property Photos">
            <FormBody>
              <FieldLabel>Upload Photos of the Unit and building</FieldLabel>
              <label className="flex items-center gap-4 w-full border border-dashed border-[#0F11141A] rounded-2xl px-5 py-5 cursor-pointer hover:bg-gray-50 transition bg-white">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                />
                <span className="flex items-center gap-2 px-4 py-2 bg-[#0F1114] text-white rounded-full text-xs font-bold uppercase tracking-[0.08em] whitespace-nowrap flex-shrink-0">
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
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  Choose File
                </span>
                <span className="text-sm text-[#0F111466]">No file chosen</span>
              </label>
              <p className="text-xs text-[#0F111499] mt-2 font-semibold">
                Tip: You can select multiple photos.
              </p>
            </FormBody>
          </FormSection>

          {/* 18. Property Description */}
          <FormSection id="property-description" title="Property Description">
            <FormBody>
              <FieldLabel>Written Description of the Unit</FieldLabel>
              <textarea
                rows={5}
                placeholder="Describe the unit, upgrades, neighborhood, and highlights..."
                className="w-full border border-[#0F11141A] rounded-2xl px-5 py-4 text-sm text-[#0F1114] placeholder-[#0F111466] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition bg-white resize-none"
              />
            </FormBody>
          </FormSection>

          {/* 19. Property Availability */}
          <FormSection id="property-availability" title="Property Availability">
            <FormGrid cols={2}>
              <Field label="Available Date">
                <FieldInput type="date" className="text-[#0F111466]" />
              </Field>
              <Field label="Lease Term">
                <FieldSelect>
                  <option value="">Select</option>
                  <option>Month-to-Month</option>
                  <option>6 Months</option>
                  <option>1 Year</option>
                  <option>2 Years</option>
                </FieldSelect>
              </Field>
            </FormGrid>
          </FormSection>

          {/* 20. Occupancy Status */}
          <FormSection id="occupancy-status" title="Occupancy Status">
            <FormBody>
              <div className="flex flex-col sm:flex-row gap-4">
                <OccupancyRadio
                  label="Unit is Occupied - Add Property"
                  value="occupied"
                  current={occupancy}
                  onChange={setOccupancy}
                />
                <OccupancyRadio
                  label="Unit is Vacant - Publish Property"
                  value="vacant"
                  current={occupancy}
                  onChange={setOccupancy}
                />
              </div>
              <p className="text-xs text-[#0F111499] mt-3 font-bold">
                If you publish, your property will be visible publicly and
                shared on your public listing.
              </p>
            </FormBody>
          </FormSection>
        </div>

        {/* ════ SUMMARY PANEL ════ */}
        <aside className="hidden xl:block w-[368px] flex-shrink-0 sticky top-[79px] self-start">
          <div className="bg-white border border-[#0F11141A] rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-[25px] py-[21px] border-b border-[#0F11141A]">
              <span className="text-base font-bold text-[#0F1114]">
                Summary
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-[#004CE5]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#004CE5] inline-block" />
                Live
              </span>
            </div>
            {["Address", "Type", "Rent", "Deposit", "Occupancy"].map(
              (label, i, arr) => (
                <div
                  key={label}
                  className={`flex items-center justify-between px-6 py-5 ${i < arr.length - 1 ? "border-b border-[#0F11141A]" : ""}`}
                >
                  <span className="text-sm font-semibold text-[#0F1114]">
                    {label}
                  </span>
                  <span className="text-sm text-[#0F1114CC]">-</span>
                </div>
              ),
            )}
            <div className="px-4 py-3 border-t border-[#0F11141A]">
              <div className="flex items-center gap-1.5 bg-[#E599171A] p-4 max-w-fit py-[6px]">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <span className="text-xs font-semibold text-[#A16600]">
                  Complete required fields
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </DashboardLayout>
  );
}
