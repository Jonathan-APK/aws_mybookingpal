import Footer from "../../components/layout/Footer";
import UserNavbar from "../../components/layout/navbar/UserNavbar";
import FacilityListItem from "../../components/user/FacilityListItem";
import SearchBox from "../../components/user/SearchBox";
import Pagination from "../../components/layout/Pagination";
import Breadcrumbs from "../../components/layout/Breadcrumbs";
import { useState, useEffect } from "react";
import * as queries from "../../graphql/queries";
import { API } from "@aws-amplify/api";

const facilityList = [
  {
    id: 1,
    name: "EnergyOne (SAFRA Punggol)",
    address: "9 Sentul Cres, Level 4, Singapore 828654",
    opening_hrs: "10am",
    closing_hrs: "10pm",
    description:
      "Offering the best of resistance training equipment and cardio machines, EnergyOne Gyms also come equipped with free weights, personal training and spacious changing rooms. What's more, SAFRA members can cross train in other sports facilityList located within our SAFRA clubs! Ask about fitness assessments & consultations, and corporate services. Our personal training services are also highly effective and our personal trainers are qualified fitness professionals who specialise in various areas, such as weight management, injury rehabilitation, sports specifics and nutrition.",
    rate: "5",
    href: "/facilitydetails",
    imageSrc:
      "https://safra-resources.azureedge.net/media-library/images/default-source/default-album/e1-logoce03035769364db7ac44e7aca458b33f.png?sfvrsn=40354edf_0",
  },
  {
    id: 2,
    name: "EnergyOne (SAFRA Tampines)",
    address: "Singapore",
    opening_hrs: "10am",
    closing_hrs: "10pm",
    description: "Gym",
    rate: "5",
    href: "#",
    imageSrc:
      "https://safra-resources.azureedge.net/media-library/images/default-source/default-album/e1-logoce03035769364db7ac44e7aca458b33f.png?sfvrsn=40354edf_0",
  },
  {
    id: 3,
    name: "EnergyOne (SAFRA Yishun)",
    address: "Singapore",
    opening_hrs: "10am",
    closing_hrs: "10pm",
    description: "Gym",
    rate: "5",
    href: "#",
    imageSrc:
      "https://safra-resources.azureedge.net/media-library/images/default-source/default-album/e1-logoce03035769364db7ac44e7aca458b33f.png?sfvrsn=40354edf_0",
  },
  {
    id: 4,
    name: "Anytime Fitness (Buangkok Green)",
    address: "Singapore",
    opening_hrs: "10am",
    closing_hrs: "10pm",
    description: "Gym",
    rate: "5",
    href: "#",
    imageSrc:
      "https://www.anytimefitness.my/wp-content/uploads/2016/02/AnytimeFitnessLogo-with-Tag.png",
  },
  {
    id: 5,
    name: "Anytime Fitness (Rivervale Mall)",
    address: "Singapore",
    opening_hrs: "10am",
    closing_hrs: "10pm",
    description: "Gym",
    rate: "5",
    href: "#",
    imageSrc:
      "https://www.anytimefitness.my/wp-content/uploads/2016/02/AnytimeFitnessLogo-with-Tag.png",
  },
  // More facilityList...
];

export default function FacilitiesList(props) {
  const category = props.location.category;
  const searchTerm = props.location.searchTerm;

  const [facilityList, setFacilityList] = useState([]);
  const [searchResultsText, setSearchResultText] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [facilitiesPerPage] = useState(3);

  useEffect(() => {
    async function getFacilityList() {
      if (category && !searchTerm) {
        const getFacility = await API.graphql({
          query: queries.listFacilities,
          variables: {
            filter: { type: { eq: category } },
          },
        });
        setFacilityList(getFacility.data.listFacilities.items);
        setSearchResultText(
          getFacility.data.listFacilities.items.length +
            ' facilities found for "' +
            category +
            '"'
        );
      } else if (searchTerm && !category) {
        const getFacility = await API.graphql({
          query: queries.listFacilities,
          variables: {
            filter: { name: { contains: searchTerm } },
          },
        });
        setFacilityList(getFacility.data.listFacilities.items);
        setSearchResultText(
          getFacility.data.listFacilities.items.length +
            ' facilities found for "' +
            searchTerm +
            '"'
        );
      } else if (searchTerm && category) {
        const getFacility = await API.graphql({
          query: queries.listFacilities,
          variables: {
            filter: { name: { contains: searchTerm }, type: { eq: category } },
          },
        });
        setFacilityList(getFacility.data.listFacilities.items);
        setSearchResultText(
          getFacility.data.listFacilities.items.length +
            ' facilities found for "' +
            searchTerm +
            " (" +
            category +
            ')"'
        );
      } else {
        const getFacility = await API.graphql({
          query: queries.listFacilities,
        });
        setFacilityList(getFacility.data.listFacilities.items);
        setSearchResultText(
          getFacility.data.listFacilities.items.length + " facilities found"
        );
      }
    }
    getFacilityList();
  }, [category, searchTerm]);

  // Pagination
  const indexOfLastFacility = currentPage * facilitiesPerPage;
  const indexOfFirstFacility = indexOfLastFacility - facilitiesPerPage;
  const currentFacilityList = facilityList.slice(
    indexOfFirstFacility,
    indexOfLastFacility
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <UserNavbar />
      <Breadcrumbs category={category} searchTerm={searchTerm} />
      <div
        id="overallLayout"
        className="grid grid-cols-5 max-w-7xl mx-auto mt-4 px-4 sm:px-6 lg:px-8"
      >
        <div id="left" className="grid col-span-1 row-span-1 mr-2">
          <SearchBox />
        </div>
        <div id="right" className="grid col-span-4 ml-2">
          <div className="px-4 pb-3 sm:px-6 text-3xl font-semibold">
            {searchResultsText}
          </div>
          <div className="grid auto-rows-auto gap-y-2">
            {currentFacilityList.map((facility) => (
              <FacilityListItem key={facility.id} facility={facility} />
            ))}
          </div>
          <Pagination
            recordsPerPage={facilitiesPerPage}
            totalRecords={facilityList.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
