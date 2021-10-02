import Breadcrumbs from "../../components/layout/Breadcrumbs";
import Footer from "../../components/layout/Footer";
import UserNavbar from "../../components/layout/navbar/UserNavbar";
import {useState} from "react";
import TimePicker from "rc-time-picker";


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

const slots = [
  {
    facilityId:"asd",
    bookingDate: "03/10/2021",
    startTime:"08:00",
    endTime:"09:00"
  },
  {
    facilityId:"asd",
    bookingDate: "03/10/2021",
    startTime:"10:00",
    endTime:"11:00"
  },
  {
    facilityId:"asd",
    bookingDate: "03/10/2021",
    startTime:"12:00",
    endTime:"13:00"
  },
  {
    facilityId:"asd",
    bookingDate: "03/10/2021",
    startTime:"14:00",
    endTime:"15:00"
  },
  {
    facilityId:"asd",
    bookingDate: "03/10/2021",
    startTime:"16:00",
    endTime:"17:00"
  },
  {
    facilityId:"asd",
    bookingDate: "03/10/2021",
    startTime:"18:00",
    endTime:"19:00"
  },
  {
    facilityId:"asd",
    bookingDate: "03/10/2021",
    startTime:"20:00",
    endTime:"21:00"
  }
];

export default function FacilityDetails(props) {

  const facility = props.location.facility;
  const [bookingTime, setBookingTime] = useState("");

  return (
    <div>
      <UserNavbar/>
      <Breadcrumbs />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="flex flex-col md:flex-row -mx-4">
        <div className="md:flex-1 px-4">
          <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
            {facility.name}
          </h2>
          <p className="text-gray-500 text-sm">{facility.address}</p>
          <div className="flex items-center space-x-4 my-4">
            <div>
              <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                <span className="text-indigo-400 mr-1 mt-1">$</span>
                <span className="font-bold text-blue-600 text-3xl">
                  {facility.rate}/hr
                </span>
              </div>
            </div>
          </div>
          <p className="text-gray-500">{facility.description}</p>
          <div className="flex py-4 space-x-4">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="operating-from"
                className="block text-sm font-medium text-gray-700"
              >
                Select Booking Date
              </label>
              <input
                type="time"
                required
                onChange={(e) => setBookingTime(e.target.value)}
                name="booking-time"
                id="booking-time"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              <label
                htmlFor="operating-from"
                className="block text-sm font-medium text-gray-700"
              >
                Select Booking Time
              </label>
              <ul>
                {slots.map(slot => <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded onClick=">
 {slot.startTime}</button>)}

              </ul>
            </div>
            <button
              type="button"
              className="h-14 px-6 py-2 font-semibold rounded-xl bg-blue-600 hover:bg-blue-800 text-white"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
      <Footer />
    </div>
  );
}
