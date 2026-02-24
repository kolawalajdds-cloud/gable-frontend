import area from "../../assets/icons/tape-measure-fitness-ruler.svg";
import bed from "../../assets/icons/Bed.svg";
import bath from "../../assets/icons/bathroom-tub-towel.svg";
import home from "../../assets/images/home.png";
import home2 from "../../assets/images/home2.png";
import home3 from "../../assets/images/home3.png";

const LISTINGS = [
  {
    id: 1,
    image: home2,
    price: "$3,245/mo",
    address: "123 Main St, City",
    type: "Modern Home",
    sqft: "1,524 sq ft",
    beds: "3 Bedrooms",
    baths: "3 Bathrooms",
  },
  {
    id: 2,
    image: home,
    price: "$3,245/mo",
    address: "123 Main St, City",
    type: "Modern Home",
    sqft: "1,524 sq ft",
    beds: "3 Bedrooms",
    baths: "3 Bathrooms",
  },
  {
    id: 3,
    image: home3,
    price: "$3,245/mo",
    address: "123 Main St, City",
    type: "Modern Home",
    sqft: "1,524 sq ft",
    beds: "3 Bedrooms",
    baths: "3 Bathrooms",
  },
];

function ListingCard({ listing }) {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden  bg-white hover:shadow-lg transition-shadow duration-200">
      {/* Photo */}
      <div className="w-full min-w-[392px] h-[288px] overflow-hidden bg-gray-100 flex-shrink-0">
        <img
          src={listing.image}
          alt={listing.type}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="pt-[18px] pb-3 flex flex-col gap-[7px]">
        {/* Price */}
        <span className="text-2xl font-extrabold text-[#00091A">
          {listing.price}
        </span>
        {/* Address */}
        <p className="text-base text-[#0F1114CC] font-medium">
          {listing.address}
        </p>
        {/* Name */}
        <p className="text-xl font-bold text-[#00091A]">{listing.type}</p>

        {/* Specs — pipe separated */}
        <div className="flex items-center gap-2 mt-2 text-base text-[#00091A] font-semibold flex-wrap">
          <span className="flex items-center gap-1">
            <img src={area} alt="area" className="w-5 h-5" /> {listing.sqft}
          </span>
          <span className="text-[#0F111466]">|</span>
          <span className="flex items-center gap-1">
            <img src={bed} alt="bedrooms" className="w-5 h-5" /> {listing.beds}
          </span>
          <span className="text-[#0F111466]">|</span>
          <span className="flex items-center gap-1">
            <img src={bath} alt="bathrooms" className="w-5 h-5" />{" "}
            {listing.baths}
          </span>
        </div>
      </div>

      {/* Request Tour Button */}
      <div className=" pb-5 pt-3">
        <button className="w-full py-[17px] text-sm font-extrabold text-[#00091A] border border-[#0F11141A] rounded-[80px] hover:bg-gray-50 transition uppercase">
          Request Tour
        </button>
      </div>
    </div>
  );
}

export default function ExploreListingsSection() {
  return (
    <section className="w-full bg-white " id="listings">
      <div className="max-w-[1268px] mx-auto px-6 py-14 md:py-20">
        {/* Heading — "Explore Listings" with Playfair italic on "Listings" */}
        <h2
          className="font-extrabold text-[#0F1114] text-center mb-10"
          style={{ fontSize: "clamp(32px, 4vw, 48px)" }}
        >
          Explore{" "}
          <span
            style={{
              fontFamily: '"Playfair Display", serif',
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            Listings
          </span>
        </h2>

        {/* Cards — 1 col mobile, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {LISTINGS.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  );
}
