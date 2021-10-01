import Breadcrumbs from "../../components/layout/Breadcrumbs";
import Footer from "../../components/layout/Footer";
import UserNavbar from "../../components/layout/navbar/UserNavbar";
import FacilityDetailsItem from "../../components/user/FacilityDetailsItem";
import {useState} from "react";
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
    href: "/facilitydetails",
    imageSrc:
      "https://safra-resources.azureedge.net/media-library/images/default-source/default-album/e1-logoce03035769364db7ac44e7aca458b33f.png?sfvrsn=40354edf_0",
  },
  // More facilities...
];

export default function FacilityDetails() {

  
  return (
    <div>
      <UserNavbar/>
      <Breadcrumbs />
      {/* ./ Breadcrumbs */}
      {details.map((details) => (
        <FacilityDetailsItem
          key={details.id}
          imageSrc={details.imageSrc}
          href={details.href}
          venue={details.venue}
          hours={details.hours}
          address={details.address}
          description={details.description}
          price={details.price}
        />
      ))}
      <Footer />
    </div>
  );
}
