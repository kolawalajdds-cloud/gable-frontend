import thunderImg from "../../assets/images/Thunder.png";
import scienceImg from "../../assets/images/science.png";
import documentImg from "../../assets/images/documet.png";
import toolsImg from "../../assets/images/Tools.png";

const FEATURES = [
  {
    icon: thunderImg,
    title: "Place qualified tenants quickly",
    description: "Streamlined screening + leasing workflow built for speed.",
  },
  {
    icon: scienceImg,
    title: "Automate rent collection and accounting.",
    description: "Recurring payments, receipts, and simple reporting.",
  },
  {
    icon: documentImg,
    title: "Manage the lease effortlessly from signing to renewals.",
    description: "Digital signatures, reminders, and renewal tracking.",
  },
  {
    icon: toolsImg,
    title: "Access fast, reliable repair coordination, day or night.",
    description: "Ticketing + vendor coordination with local support.",
  },
];

export default function FeaturesSection() {
  return (
    <section
      className="w-full bg-white border-b border-[#0F11141A]"
      id="details"
    >
      <div className="max-w-[1268px] mx-auto px-6 py-10 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="flex flex-col justify-between bg-white border border-[#0F11141A] rounded-2xl p-6 lg:min-h-[440px]"
            >
              {/* Top: Title + Description */}
              <div className="border-b ">
                <p className="text-2xl font-bold text-[#00091A] leading-[1.3] mb-[13px]">
                  {f.title}
                </p>
                <p className="text-base text-[#0F1114CC] font-normal leading-6">
                  {f.description}
                </p>
              </div>

              {/* Bottom: Icon aligned right */}
              <div className="flex justify-end mt-6">
                <img
                  src={f.icon}
                  alt=""
                  className="w-[102px] h-[102px] object-contain opacity-80"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
