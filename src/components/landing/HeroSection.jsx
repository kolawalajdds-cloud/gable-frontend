import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/images/heroImage.png";

// Styled progress row matching the design slider style
function MetricRow({ label, value, percent, showValue = true }) {
  return (
    <div className="mb-[38px] last:mb-0">
      <div className="flex items-center justify-between mb-8">
        <span className="text-[13px] font-medium text-[#0F1114]">{label}</span>
        {showValue && (
          <span className="text-[13px] font-semibold text-[#0F1114]">
            {value}
          </span>
        )}
      </div>
      {/* Track */}
      <div className="relative w-full h-2 bg-[#D9E6F7] rounded-full">
        {/* Blue fill */}
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-bl from-[#004CE6] to-[#3388FF]"
          style={{ width: `${percent}%` }}
        />
        {/* Thumb — white circle with dark border */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white"
          style={{
            left: `calc(${percent}% - 7px)`,
            border: "6px solid #0F1114",
            boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
          }}
        />
      </div>
    </div>
  );
}

// Dashboard card on the right
function DashboardCard() {
  return (
    <div className="relative w-full max-w-[340px] md:max-w-[520px]">
      {/* Card */}
      <div className="bg-white rounded-[32px] shadow-[0px_0px_40px_-20px_#0F1B3333] px-8 p-6 pb-10">
        {/* Header */}
        <p className="text-[15px] font-bold text-[#0F1114] mb-1">
          Your Property Dashboard
        </p>
        <p className="text-[11px] text-[#0F1114A0] mb-6 leading-[1.5]">
          A clean command center for leasing, repairs, and rent — all in one
          place.
        </p>

        <MetricRow label="Occupancy" value="72%" percent={72} />
        <MetricRow label="Open Repairs" value="3" percent={30} />
        <MetricRow label="Rent Collected" percent={91} showValue={false} />
      </div>

      {/* heroImage overlapping bottom-right */}
      <div className="hidden md:block absolute -bottom-6 md:-bottom-24 -right-6 md:-right-16 w-[200px] md:w-[288px] pointer-events-none select-none rounded-[32px]">
        <img
          src={heroImage}
          alt="Property illustration"
          className="w-full h-auto drop-shadow-xl"
        />
      </div>
    </div>
  );
}

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-[radial-gradient(55.56%_100%_at_50%_0%,_#FFFFFF_0%,_#EDF3FA_100%)] overflow-hidden">
      <div className="max-w-[1268px] mx-auto px-6 md:px-10 py-16 md:py-24 flex flex-col lg:flex-row items-center gap-12 md:gap-[35px]">
        {/* ── LEFT TEXT ── */}
        <div className="flex-1 text-center md:text-left">
          {/* Label */}
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#004CE51A] bg-white mb-[18px]">
            {/* Gradient Dot */}
            <span className="w-4 h-4 rounded-full bg-[linear-gradient(225.01deg,#3388FF_0%,#004CE6_100%)] flex-shrink-0">
              <span className="w-2 h-2 rounded-full bg-[linear-gradient(225.01deg,#3388FF_0%,#004CE6_100%)] flex-shrink-0" />
            </span>

            {/* Text */}
            <span className="font-[Figtree] font-semibold text-[12px] leading-[100%] tracking-[0.05em] uppercase text-[#0F1114]">
              Software &amp; Management Services
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-[Figtree] font-semibold text-[96px] leading-[96px] tracking-[0%] text-[#0F1114] mb-4">
            Property
            <br />
            Management
            <br />
            <span
              style={{
                fontFamily: '"Playfair Display", serif',
                fontStyle: "italic",
                fontWeight: 400,
                color: "#0F1114",
              }}
            >
              Simplified
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base text-[#0F1114CC] font-normal mb-11 mx-auto md:mx-0">
            Leasing Tools, Repair Coordination, Management Tools, Local Support
          </p>

          {/* CTA */}
          <button
            onClick={() => navigate("/open-account/step-1")}
            className="inline-flex items-center px-7 py-3 text-white font-extrabold text-xs tracking-[0.14em] uppercase rounded-[80px] bg-gradient-to-bl from-[#3388FF] to-[#004CE6] hover:opacity-90 transition shadow-md"
          >
            Try for Free
          </button>
        </div>

        {/* ── RIGHT CARD ── */}
        <div className="flex-shrink-0 flex justify-center w-full md:w-auto pb-10 md:pb-10">
          <DashboardCard />
        </div>
      </div>
    </section>
  );
}
