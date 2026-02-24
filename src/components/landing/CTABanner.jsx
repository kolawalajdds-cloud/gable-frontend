import { useNavigate } from "react-router-dom";
import getStartedImg from "../../assets/images/getStarted.png";

export default function CTABanner() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-white border-b border-[#0F11141A] mb-16">
      <div
        className="max-w-[1268px] mx-auto  
      bg-[radial-gradient(55.56%_100%_at_50%_0%,#FFFFFF_0%,#EDF3FA_100%)] "
      >
        {/* Two-panel card */}
        <div className="rounded-3xl overflow-hidden flex flex-col md:flex-row min-h-[280px]">
          {/* ── LEFT — light gradient panel ── */}
          <div className="flex-1  flex flex-col justify-center px-10 md:px-20 py-12 md:py-16">
            {/* Heading */}
            <h2 className="font-semibold text-[#0F1114] leading-[1.1] mb-3 text-[64px]">
              Ready to
              <br />
              <span
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontStyle: "italic",
                  fontWeight: 400,
                }}
              >
                get started?
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-base text-[#0F1114CC] font-normal mb-9">
              Get immediate access to your property dashboard.
            </p>

            {/* CTA button */}
            <div>
              <button
                onClick={() => navigate("/open-account/step-1")}
                className="inline-flex items-center gap-3 px-8 py-4 text-white font-extrabold text-sm uppercase rounded-[80px] bg-gradient-to-bl from-[#3388FF] to-[#004CE6] hover:opacity-90 transition shadow-md"
              >
                GET STARTED NOW
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>

          {/* ── RIGHT — photo panel ── */}
          <div className="w-full md:w-[55%] flex-shrink-0 min-h-[220px] md:min-h-0">
            <img
              src={getStartedImg}
              alt="Modern property"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
