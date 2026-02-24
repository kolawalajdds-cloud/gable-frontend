import { Link } from "react-router-dom";
import blackLogo from "../../assets/icons/logo-black.svg";
import IconInstagram from "../../assets/icons/instagram.svg";
import IconFacebook from "../../assets/icons/facebook.svg";
import IconX from "../../assets/icons/x.svg";

const FOOTER_LINKS = {
  Company: [
    { label: "About us", href: "#" },
    { label: "Contact us", href: "#" },
    { label: "Blog", href: "#" },
  ],
  "Type of user": [
    { label: "Landlords", href: "/open-account/step-1" },
    { label: "Tenants", href: "/open-account/step-1" },
    { label: "Service Pros", href: "/open-account/step-1" },
  ],
  Dashboard: [
    { label: "Landlord", href: "/open-account/step-1" },
    { label: "Tenant", href: "/open-account/step-1" },
    { label: "Pro", href: "/open-account/step-1" },
  ],
  Legal: [
    { label: "Terms & Conditions", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ],
};

const SOCIALS = [
  { label: "Instagram", href: "#", icon: IconInstagram },
  { label: "Facebook", href: "#", icon: IconFacebook },
  { label: "X", href: "#", icon: IconX },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#EEF3FA]">
      <div className="max-w-[1268px] mx-auto px-6 py-12 md:py-[61px]">
        {/* Main row */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-60">
          {/* ── Brand column ── */}
          <div className="flex flex-col gap-4 md:max-w-[220px] flex-shrink-0">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-[5px]">
              <img src={blackLogo} alt="Gable" className="w-6 h-6" />
              <span className="text-2xl font-extrabold text-[#00091A]">
                Gable
              </span>
            </Link>

            {/* Description */}
            <p className="text-sm text-[#0F1114CC] font-normal">
              Gable helps landlords, property managers, tenants, and service
              pros work together in one clean system — so leasing, rent,
              maintenance, and documentation stay organized from day one.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 mt-[11px]">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full border border-[#0F11141A] bg-white flex items-center justify-center text-[#0F1114CC] hover:text-[#0F1114] hover:border-[#0F114080] transition"
                >
                  <img src={s.icon} alt={s.label} className="w-10 h-10" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Link columns ── */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(FOOTER_LINKS).map(([col, links]) => (
              <div key={col} className="flex flex-col gap-2.5">
                <p className="text-base font-bold text-[#00091A] mb-1">{col}</p>
                {links.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-sm text-[#00091A] font-normal hover:text-[#0F1114] transition"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
