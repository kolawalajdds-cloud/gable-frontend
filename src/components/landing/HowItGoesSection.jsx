const STEPS = [
  {
    num: "1",
    title: "Set up your property",
    description:
      "Add units, rent details, rules, utilities, and lease documents.",
  },
  {
    num: "2",
    title: "Place tenants + sign digitally",
    description:
      "Collect applications, screen, approve, and sign leases in one flow.",
  },
  {
    num: "3",
    title: "Run daily operations",
    description:
      "Rent collection, maintenance tickets, vendor coordination, and records.",
  },
];

export default function HowItGoesSection() {
  return (
    <section className="w-full bg-[#EEF3FA]  " id="howitworks">
      <div className="max-w-[1268px] mx-auto px-6 py-14 md:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-[100px] items-center">
          {/* ── LEFT — numbered steps ── */}
          <div className="w-full max-w-[600px] flex-1 flex flex-col divide-y divide-[#0F11141A] border-y border-[#0F11141A] py-11">
            {STEPS.map((step, index) => (
              <div
                key={step.num}
                className="flex items-start gap-6 py-6 first:pt-0 last:pb-0 border-none"
              >
                {/* Number */}
                <span className="text-xl font-bold text-[#0F1114CC] w-12 h-12 flex-shrink-0 mt-0.5 border border-[#0F11141A] rounded-full flex items-center justify-center">
                  {step.num}
                </span>
                {/* Content */}
                <div
                  className={` ${
                    index !== STEPS.length - 1
                      ? "border-b pb-11 border-[#0F11141A]"
                      : ""
                  }`}
                >
                  <p className="text-2xl font-bold text-[#00091A] leading-snug mb-1">
                    {step.title}
                  </p>
                  <p className="text-base text-[#0F1114CC] font-normal ">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ── RIGHT — heading + help ── */}
          <div className="flex-1 flex flex-col max-w-[520px]">
            {/* Heading block */}
            <div className="mb-[78px]">
              <h2
                className="font-extrabold text-[#0F1114] leading-[1.0] mb-[15px]"
                style={{ fontSize: "clamp(40px, 5vw, 60px)" }}
              >
                How it goes
              </h2>
              <p className="text-[13px] md:text-sm text-[#0F1114CC] font-normal leading-relaxed ">
                A simple loop that keeps your property running smoothly.
              </p>
            </div>

            {/* Need hands-on help — inline, no card */}
            <div className="mt-10 lg:mt-0">
              <p className="text-xl font-bold text-[#0F1114] mb-5">
                Need hands-on help?
              </p>
              <p className="text-base text-[#0F1114CC] font-normal leading-relaxed  mb-9">
                Use Gable as software-only, or combine it with management
                services depending on your needs.
              </p>
              {/* Arrow button */}
              <button className="w-12 h-12 rounded-full bg-[#004CE51A] flex items-center justify-center text-[#004CE5] hover:bg-gray-50 transition shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
