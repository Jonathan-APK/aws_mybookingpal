import Footer from "../../components/layout/Footer";
import UserNavbar from "../../components/layout/navbar/UserNavbar";
import FacilityDetailsItem from "../../components/user/FacilityDetailsItem";
import SearchBox from "../../components/user/SearchBox";

const details = [
  {
    id: 1,
    venue: "EnergyOne (SAFRA Punggol)",
    address: "9 Sentul Cres, Level 4, Singapore 828654",
    hours: "10am - 10pm",
    description:
      "Offering the best of resistance training equipment and cardio machines, EnergyOne Gyms also come equipped with free weights, personal training and spacious changing rooms. What's more, SAFRA members can cross train in other sports facilities located within our SAFRA clubs! Ask about fitness assessments & consultations, and corporate services. Our personal training services are also highly effective and our personal trainers are qualified fitness professionals who specialise in various areas, such as weight management, injury rehabilitation, sports specifics and nutrition.",
    price: "5",
    imageSrc:
      "https://safra-resources.azureedge.net/media-library/images/default-source/default-album/e1-logoce03035769364db7ac44e7aca458b33f.png?sfvrsn=40354edf_0",
  },
  // More facilities...
];

export default function FacilityDetails() {
  return (
    <div>
      <UserNavbar />
      <div id="overallLayout" className="grid grid-cols-5 m-8 mx-20">
        <div id="left" className="grid col-span-1 row-span-1 px-2">
          <SearchBox />
        </div>
        <div id="right" className="grid col-span-4 px-2">
          <div className="container flex relative">
            {details.map((detail) => (
              <FacilityDetailsItem
                key={detail.id}
                imageSrc={detail.imageSrc}
                href={detail.href}
                venue={detail.venue}
                hours={detail.hours}
                address={detail.address}
                description={detail.description}
                price={detail.price}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
