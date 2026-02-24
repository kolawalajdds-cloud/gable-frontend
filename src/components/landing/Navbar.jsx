import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/icons/logo.svg";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  const navLinks = [
    { label: "Home", href: "#" },
    { label: "Pricing", href: "#pricing" },
    { label: "How it works", href: "#howitworks" },
    { label: "Listings", href: "#listings" },
    { label: "Tenant Placement", href: "#tenantplacement" },
  ];

  return (
    <nav className="w-full bg-transparent sticky top-0 z-50">
      <div className="max-w-[1268px] mx-auto px-4 md:px-6 h-[60px] flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-[5px] flex-shrink-0">
          <img src={logo} alt="Gable" className="w-6 h-6" />
          <span className="text-base font-extrabold text-[#0F1114]">Gable</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1 bg-white p-1 rounded-full">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setActiveLink(link.label)}
              className={`px-3 py-1.5 text-xs font-bold rounded-full uppercase transition
                ${
                  activeLink === link.label
                    ? "bg-[#004CE6] text-white"
                    : "text-[#00091A] hover:text-[#0F1114] hover:bg-gray-100"
                }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Sign In + mobile toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/sign-in")}
            className="hidden md:block bg-white text-xs font-extrabold text-[#004CE5] border border-[#004CE5] rounded-[80px] px-5 py-2 hover:bg-gray-50 transition"
          >
            SIGN IN
          </button>
          {/* Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg border border-[#0F11141A] text-[#0F1114]"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#0F11141A] px-4 py-3 flex flex-col gap-1 bg-white">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition
                ${activeLink === link.label ? "bg-[#004CE6] text-white" : "text-[#0F1114CC] hover:bg-gray-100"}`}
              onClick={() => {
                setActiveLink(link.label);
                setMenuOpen(false);
              }}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              navigate("/sign-in");
              setMenuOpen(false);
            }}
            className="mt-2 text-sm font-bold text-[#0F1114] border border-[#0F11141A] rounded-[80px] px-5 py-2 hover:bg-gray-50 transition text-left"
          >
            Sign in
          </button>
        </div>
      )}
    </nav>
  );
}
