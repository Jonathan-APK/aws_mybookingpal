import Footer from "../../components/layout/Footer";
import UserNavbar from "../../components/layout/navbar/UserNavbar";
import FacilityListItem from "../../components/user/FacilityListItem";
import SearchBox from "../../components/user/SearchBox";
import Pagination from "../../components/layout/Pagination";


const facilities = [
  {
    id: 1,
    venue: "EnergyOne (SAFRA Punggol)",
    address: "9 Sentul Cres, Level 4, Singapore 828654",
    hours: "10am - 10pm",
    description:
      "Offering the best of resistance training equipment and cardio machines, EnergyOne Gyms also come equipped with free weights, personal training and spacious changing rooms. What's more, SAFRA members can cross train in other sports facilities located within our SAFRA clubs! Ask about fitness assessments & consultations, and corporate services. Our personal training services are also highly effective and our personal trainers are qualified fitness professionals who specialise in various areas, such as weight management, injury rehabilitation, sports specifics and nutrition.",
    price: "5",
    href: "/facilitydetails",
    imageSrc:
      "https://safra-resources.azureedge.net/media-library/images/default-source/default-album/e1-logoce03035769364db7ac44e7aca458b33f.png?sfvrsn=40354edf_0",
  },
  {
    id: 2,
    venue: "EnergyOne (SAFRA Tampines)",
    address: "Singapore",
    hours: "10am - 10pm",
    description: "Gym",
    price: "5",
    href: "#",
    imageSrc:
      "https://safra-resources.azureedge.net/media-library/images/default-source/default-album/e1-logoce03035769364db7ac44e7aca458b33f.png?sfvrsn=40354edf_0",
  },
  {
    id: 3,
    venue: "EnergyOne (SAFRA Yishun)",
    address: "Singapore",
    hours: "10am - 10pm",
    description: "Gym",
    price: "5",
    href: "#",
    imageSrc:
      "https://safra-resources.azureedge.net/media-library/images/default-source/default-album/e1-logoce03035769364db7ac44e7aca458b33f.png?sfvrsn=40354edf_0",
  },
  {
    id: 4,
    venue: "Anytime Fitness (Buangkok Green)",
    address: "Singapore",
    hours: "10am - 10pm",
    description: "Gym",
    price: "5",
    href: "#",
    imageSrc:
      "https://www.anytimefitness.my/wp-content/uploads/2016/02/AnytimeFitnessLogo-with-Tag.png",
  },
  {
    id: 5,
    venue: "Anytime Fitness (Rivervale Mall)",
    address: "Singapore",
    hours: "10am - 10pm",
    description: "Gym",
    price: "5",
    href: "#",
    imageSrc:
      "https://www.anytimefitness.my/wp-content/uploads/2016/02/AnytimeFitnessLogo-with-Tag.png",
  },
  // More facilities...
];

export default function FacilitiesList() {

  return (
    <div>
      <UserNavbar/>
      <div id="overallLayout" className="grid grid-cols-5 m-8 mx-20">
        <div id="left" className="grid col-span-1 row-span-1 px-2">
          <SearchBox />
        </div>
        <div id="right" className="grid col-span-4 px-2">
          <div className="grid auto-rows-auto gap-y-2 ">
            {facilities.map((facility) => (
              <FacilityListItem
                key={facility.id}
                imageSrc={facility.imageSrc}
                href={facility.href}
                venue={facility.venue}
                hours={facility.hours}
                address={facility.address}
                description={facility.description}
                price={facility.price}
              />
            ))}
          </div>
          <Pagination />
        </div>
      </div>
      <Footer />
    </div>
  );
}
