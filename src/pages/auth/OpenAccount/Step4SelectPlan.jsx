import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOpenAccount } from "../../../context/OpenAccountContext";

const PLANS = [
  {
    id: "starter",
    label: "Starter",
    badge: "1-5 properties",
    badgeStyle: "text-[#0F1114] font-bold",
    description: "Great for getting organized with essentials.",
    features: ["Core tools", "Rent + maintenance"],
  },
  {
    id: "growth",
    label: "Growth",
    badge: "Most Popular!",
    badgeStyle: "text-[#004CE5] font-bold",
    description: "For growing portfolios and team workflows.",
    features: ["Team access", "Workflows"],
  },
  {
    id: "pro",
    label: "Pro",
    badge: "Advanced",
    badgeStyle: "text-[#0F1114] font-bold",
    description: "Advanced reporting, approvals, and operations.",
    features: ["Approvals", "Advanced reports"],
  },
];

// Reusable back-arrow SVG
function ArrowLeftIcon() {
  return (
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
  );
}

export default function Step4SelectPlan() {
  const navigate = useNavigate();
  const { formData, updateData } = useOpenAccount();

  const [selected, setSelected] = useState(formData.plan || "starter");
  const [card, setCard] = useState({
    name: "",
    zip: "",
    number: "",
    expiry: "",
    cvc: "",
  });

  const handleCardChange = (e) =>
    setCard((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData({ plan: selected });
    navigate("/sign-in");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-[874px] bg-white border border-[#0F11141A] rounded-[32px] px-5 md:px-8 py-7 md:py-[27px]">
        {/* Header: back arrow + title + subtitle */}
        <div className="mb-1">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate("/open-account/step-3")}
              className="h-10 w-10 flex items-center justify-center text-[#0F1114] hover:opacity-70 transition flex-shrink-0 border border-[#0F11141A] rounded-[10px]"
              aria-label="Go back"
            >
              <ArrowLeftIcon />
            </button>
            <div>
              <h1 className="text-2xl font-extrabold text-[#0F1114]">
                Select plan
              </h1>
              <p className="text-xs text-[#0F1114CC] font-medium mt-[3px]">
                Starter, Growth, or Pro
              </p>
            </div>
          </div>
        </div>

        {/* Progress bar — fully filled */}
        <div className="w-full h-[3px] bg-[#0F11141A] rounded-full mt-5 mb-8">
          <div className="h-full w-full bg-gradient-to-bl from-[#004CE5] to-[#3388FF] rounded-2xl" />
        </div>

        {/* Two-column body */}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* LEFT — Plan selector */}
            <div className="flex flex-col gap-2 flex-1">
              {PLANS.map((plan) => {
                const isSelected = selected === plan.id;
                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setSelected(plan.id)}
                    className={`relative text-left py-5 px-6 rounded-2xl border transition-all duration-150 focus:outline-none
                      ${
                        isSelected
                          ? "border-[#004CE51A] bg-white shadow-sm"
                          : "border-[#0F11141A] bg-white hover:border-[#004CE51A] hover:bg-gray-50"
                      }`}
                  >
                    {/* Plan name + badge row */}
                    <div className="flex items-center justify-between">
                      <p className="text-base font-bold text-[#0F1114]">
                        {plan.label}
                      </p>
                      <span className={`text-xs font-bold ${plan.badgeStyle}`}>
                        {plan.badge}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-[#0F1114CC] font-normal mt-[7px] leading-snug">
                      {plan.description}
                    </p>

                    {/* Feature pills */}
                    <div className="flex flex-wrap gap-2 mt-[10px]">
                      {plan.features.map((f) => (
                        <span
                          key={f}
                          className="text-xs text-[#0F1114] font-bold border border-[#0F11141A] rounded-2xl px-4 py-[9px]"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* RIGHT — Free trial payment panel */}
            <div className="flex flex-col lg:w-[280px] flex-shrink-0">
              <div className="bg-white border border-[#0F11141A] rounded-2xl px-6 py-5  flex flex-col h-full">
                <div>
                  <p className="text-base font-extrabold text-[#0F1114]">
                    Start your free 14-day trial
                  </p>
                  <p className="text-xs text-[#0F1114CC] font-medium mt-[1px]">
                    Enter credit card info (demo UI only).
                  </p>
                </div>

                {/* Card inputs */}
                <div className="flex flex-col gap-2 mt-5">
                  {/* Name on card */}
                  <input
                    name="name"
                    type="text"
                    value={card.name}
                    onChange={handleCardChange}
                    placeholder="NAME ON CARD"
                    className="w-full border border-[#0F11141A] rounded-[80px] px-4 py-3 text-xs text-black font-semibold placeholder-[#0F111466] outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                  />

                  {/* ZIP */}
                  <input
                    name="zip"
                    type="text"
                    value={card.zip}
                    onChange={handleCardChange}
                    placeholder="ZIP"
                    maxLength={10}
                    className="w-full border border-[#0F11141A] rounded-[80px] px-4 py-3 text-xs text-black font-semibold placeholder-[#0F111466] outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                  />

                  {/* Card number */}
                  <input
                    name="number"
                    type="text"
                    value={card.number}
                    onChange={handleCardChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="w-full border border-[#0F11141A] rounded-[80px] px-4 py-3 text-xs text-black font-semibold placeholder-[#0F111466] outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                  />

                  {/* Expiry + CVC */}
                  <div className="flex gap-2">
                    <input
                      name="expiry"
                      type="text"
                      value={card.expiry}
                      onChange={handleCardChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-1/2 border border-[#0F11141A] rounded-[80px] px-4 py-3 text-xs text-black font-semibold placeholder-[#0F111466] outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                    />
                    <input
                      name="cvc"
                      type="text"
                      value={card.cvc}
                      onChange={handleCardChange}
                      placeholder="CVC"
                      maxLength={4}
                      className="w-1/2 border border-[#0F11141A] rounded-[80px] px-4 py-3 text-xs text-black font-semibold placeholder-[#0F111466] outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                    />
                  </div>
                </div>

                {/* CTA button */}
                <button
                  type="submit"
                  className="w-full py-4 text-white font-extrabold text-sm tracking-widest
                   rounded-[80px]
                   bg-gradient-to-bl from-[#3388FF] to-[#004CE6]
                   hover:opacity-90
                   transition mt-[34px]"
                >
                  START MY FREE TRIAL
                </button>

                {/* Disclaimer */}
                <p className="text-center text-xs text-[#0F1114CC] font-medium mt-5">
                  You won't be charged until after the trial ends.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
