import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOpenAccount } from "../../../context/OpenAccountContext";
import logo from "../../../assets/icons/logo.svg";

const ACCOUNT_TYPES = [
  {
    id: "landlord",
    label: "Landlord",
    description: "Self-manage or hire a property manager.",
  },
  {
    id: "property_manager",
    label: "Property Manager",
    description: "Manage multiple owners and properties.",
  },
  {
    id: "teammate",
    label: "Teammate",
    description: "Join a landlord/PM team and collaborate.",
  },
  {
    id: "tenant",
    label: "Tenant",
    description: "Pay rent, request repairs, view documents.",
  },
  {
    id: "service_pro",
    label: "Service Pro",
    description: "Receive work orders and submit invoices.",
  },
];

export default function Step2AccountType() {
  const navigate = useNavigate();
  const { formData, updateData } = useOpenAccount();
  const [selected, setSelected] = useState(formData.accountType || "landlord");

  const handleNext = (e) => {
    e.preventDefault();
    updateData({ accountType: selected });
    navigate("/open-account/step-3");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-[874px] bg-white border border-[#0F11141A] rounded-[32px] px-5 md:px-8 py-7 md:py-[27px]">
        {/* Header row: back arrow + title */}
        <div className="mb-1">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate("/open-account/step-1")}
              className=" h-10 w-10 flex items-center justify-center text-[#0F1114] hover:opacity-70 transition flex-shrink-0 border border-[#0F11141A] rounded-[10px]"
              aria-label="Go back"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l14 0" />
                <path d="M5 12l6 6" />
                <path d="M5 12l6 -6" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-extrabold text-[#0F1114]">
                Account type
              </h1>
              <p className="text-xs text-[#0F111480] font-medium mt-1">
                What best describes you?
              </p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-[3px] bg-[#0F11141A] rounded-full mt-5 mb-8">
          <div className="h-full w-2/4 bg-gradient-to-bl from-[#004CE5] to-[#3388FF] rounded-2xl" />
        </div>

        {/* Account type grid */}
        <form onSubmit={handleNext}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ACCOUNT_TYPES.map((type) => {
              const isSelected = selected === type.id;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setSelected(type.id)}
                  className={`relative text-left py-5 px-[25px] rounded-2xl border transition-all duration-150 focus:outline-none
                    ${
                      isSelected
                        ? "border-[#0F1114] bg-white shadow-sm"
                        : "border-[#0F11141A] bg-white hover:border-[#0F114080] hover:bg-gray-50"
                    }`}
                >
                  {/* Checkmark badge when selected */}
                  {isSelected && (
                    <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#0F1114] flex items-center justify-center flex-shrink-0">
                      <svg
                        width="10"
                        height="8"
                        viewBox="0 0 10 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 4L3.5 6.5L9 1"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  )}
                  <p className="text-base font-bold text-[#0F1114] pr-6">
                    {type.label}
                  </p>
                  <p className="text-xs text-[#0F1114CC] font-normal mt-[7px] leading-snug">
                    {type.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* CONTINUE button */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={!selected}
              className="px-8 py-3.5 text-white font-extrabold text-sm tracking-widest
               rounded-[80px]
               bg-gradient-to-bl from-[#3388FF] to-[#004CE6]
               hover:opacity-90
               transition
               disabled:opacity-40 disabled:cursor-not-allowed"
            >
              CONTINUE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
