import Breadcrumbs from "../../components/layout/Breadcrumbs";
import Footer from "../../components/layout/Footer";
import UserNavbar from "../../components/layout/navbar/UserNavbar";
import {useState} from "react";
import TimePicker from "rc-time-picker";
import { useEffect } from "react";
import { API } from "@aws-amplify/api";
import * as queries from "../../graphql/queries";

let slots = [
  {
    id:"1",
    facilityId:"e4ef9825-2b1a-435b-88c3-65d0e767b394",
    slotDate: new Date("2021-10-3"),
    startTime:"08:00",
    endTime:"09:00",
    selected: true,
    available: true
  },
  {
    id:"2",
    facilityId:"e4ef9825-2b1a-435b-88c3-65d0e767b394",
    slotDate: new Date("2021-10-3"),
    startTime:"12:00",
    endTime:"13:00",
    selected: false,
    available: false
  },
  {
    id:"3",
    facilityId:"e4ef9825-2b1a-435b-88c3-65d0e767b394",
    slotDate: new Date("2021-10-3"),
    startTime:"14:00",
    endTime:"15:00",
    selected: false,
    available: true
  },
  {
    id:"4",
    facilityId:"e4ef9825-2b1a-435b-88c3-65d0e767b394",
    slotDate: new Date("2021-10-3"),
    startTime:"16:00",
    endTime:"17:00",
    selected: false,
    available: true
  },
  {
    id:"5",
    facilityId:"e4ef9825-2b1a-435b-88c3-65d0e767b394",
    slotDate: new Date("2021-10-3"),
    startTime:"18:00",
    endTime:"19:00",
    selected: false,
    available: true
  },
  {
    id:"6",
    facilityId:"e4ef9825-2b1a-435b-88c3-65d0e767b394",
    slotDate: new Date("2021-10-3"),
    startTime:"20:00",
    endTime:"21:00",
    selected: false,
    available: true
  },
  {
    id:"6",
    facilityId:"e4ef9825-2b1a-435b-88c3-65d0e767b394",
    slotDate: new Date("2021-10-4"),
    startTime:"08:00",
    endTime:"09:00",
    selected: true,
    available: true
  },
  {
    id:"7",
    facilityId:"e4ef9825-2b1a-435b-88c3-65d0e767b394",
    slotDate: new Date("2021-10-4"),
    startTime:"10:00",
    endTime:"11:00",
    selected: false,
    available: true
  },
  {
    id:"8",
    facilityId:"e4ef9825-2b1a-435b-88c3-65d0e767b394",
    slotDate: new Date("2021-10-4"),
    startTime:"12:00",
    endTime:"13:00",
    selected: false,
    available: true
  },
  {
    id:"9",
    facilityId:"e4ef9825-2b1a-435b-88c3-65d0e767b394",
    slotDate: new Date("2021-10-4"),
    startTime:"14:00",
    endTime:"15:00",
    selected: false,
    available: true
  },
  {
    id:"10",
    facilityId:"e4ef9825-2b1a-435b-88c3-65d0e767b394",
    slotDate: new Date("2021-10-4"),
    startTime:"16:00",
    endTime:"17:00",
    selected: false,
    available: false
  },
  {
    id:"11",
    facilityId:"e4ef9825-2b1a-435b-88c3-65d0e767b394",
    slotDate: new Date("2021-10-4"),
    startTime:"18:00",
    endTime:"19:00",
    selected: false,
    available: true
  }
];




export default function FacilityDetails(props) {

  const facility = props.location.facility;
  console.log(facility);
  const [bookingTime, setBookingTime] = useState("");
  const [slotDate, setSlotDate] = useState(new Date());
  const [filteredSlots, setFilteredSlots] = useState([]);
  const [buttons,setButtons] = useState("Please select a date.");
  const [existingBookings, setExistingBookings] = useState([]);
  //renderSlotOptions();
  useEffect(() => {
    async function getBookingList() {
      
      console.log("Get booking list :" + facility.id + " " + slotDate.toLocaleDateString());
      const getBooking = await API.graphql({
        query: queries.listBookings,
        variables: {
          filter: {
            facility_id: {
              eq: facility.id
            },
            booking_date:{
              eq: slotDate
            }
          },
        },
      });

      //setExistingBookings(getBooking.data.listBookings.items);

      console.log("List of bookings done on this date: ", getBooking);
      //setExistingBookings([{"fake":123}]);
    };
    getBookingList();
  },[slotDate]);
  useEffect(()=> {
    function fetchSlots(){
      console.log(existingBookings);
      console.log("fetch slots List of bookings done on this date: ", existingBookings);
      console.log("Date entered: " + slotDate);
      let results = [];
      for (const x of slots) {
        if (x.slotDate.toDateString() == slotDate.toDateString() && x.facilityId == facility.id) {
          results.push(x);
        }
      }
      console.log("Results:");
      console.log(results);
      setFilteredSlots(results);
    };
    fetchSlots();
  },[existingBookings]);

  useEffect(() => {
    function getSlotButtonClass(slotSelected, slotAvailable){

      if(!slotAvailable){
        return "bg-gray-400 text-gray-700 font-semibold py-2 px-4 border border-gray-500  rounded margin-top-100px"
      }
      else if(slotSelected){
        return "bg-blue-200 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded margin-top-100px"
      }else{
        return "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded margin-top-100px"
      }
  
    }
 
    function toggleSlotSelection(slot){
      console.log("Toggle Slot Selection")
      console.log("slot selected: ");
  
      let results = [];
      for (const x of slots) {
        if (x.slotDate.toDateString() == slot.slotDate.toDateString() && x.facilityId == slot.facilityId && slot.startTime == x.startTime) {
          console.log(x)
        }
      }
  
    }
    let buttonsTemp = 'Please Select a date.';
    if (filteredSlots== null || filteredSlots.length == 0) {
      buttonsTemp = <p>Sorry. There are no slots available.</p>;
    } else {
      buttonsTemp = <ul>{filteredSlots.map((slot,i) => <button disabled={!slot.available} onClick={function(e) {toggleSlotSelection(slot);}} className={getSlotButtonClass(slot.selected, slot.available)}>
        {slot.startTime}
      </button>)}</ul>;
    }
    setButtons(buttonsTemp)
  },[filteredSlots])
  // function renderSlotOptions () {
  //   let results = fetchSlots("e4ef9825-2b1a-435b-88c3-65d0e767b394",slotDate);
  //   setFilteredSlots(results);
  //   console.log("Filtered:");
  //   console.log(filteredSlots);
  //   let buttonsTemp = 'Please Select a date.';
  //   if (filteredSlots== null || filteredSlots.length == 0) {
  //     buttonsTemp = <p>Sorry. There are no slots available.</p>;
  //   } else {
  //     buttonsTemp = <ul>{filteredSlots.map((slot,i) => <button onClick={function(e) {toggleSlotSelection(slot);}} className={getSlotButtonClass(slot.selected, slot.available)}>
  //       {slot.startTime}
  //     </button>)}</ul>;
  //   }
  //   setButtons(buttonsTemp)
  // }
  // function fetchSlots(facilityId, date){
  //   let results = [];
  //   for (const x of slots) {
  //     if (x.slotDate.toDateString() == date.toDateString() && x.facilityId == facilityId) {
  //       results.push(x);
  //     }
  //   }
  //   console.log("Results:");
  //   console.log(results);
  //   return results;
  // }
  // function getSlotButtonClass(slotSelected, slotAvailable){
  //   console.log("is slot selected?");
  //   console.log(slotSelected, slotAvailable);
  //   if(!slotAvailable){
  //     return "bg-gray-500 text-gray-700 font-semibold py-2 px-4 border border-blue-500  rounded margin-top-100px"
  //   }
  //   else if(slotSelected){
  //     return "bg-blue-200 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded margin-top-100px"
  //   }else{
  //     return "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded margin-top-100px"
  //   }

  // }
  // function toggleSlotSelection(slot){
  //   console.log("Toggle Slot Selection")
  //   console.log("slot selected: ");

  //   let results = [];
  //   for (const x of slots) {
  //     if (x.slotDate.toDateString() == slot.slotDate.toDateString() && x.facilityId == slot.facilityId && slot.startTime == x.startTime) {
  //       console.log(x)
  //     }
  //   }

  // }
  
  

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
                Select Booking Date {/*<p onClick={(e) => setSlotDate(new Date(e.target.value))}>Click Here</p>*/}
              </label>
              <input
                  type="date"
                  required
                  onChange={(e) => setSlotDate(new Date(e.target.value))}
                  name="booking-date"
                  id="booking-date"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              <label
                htmlFor="operating-from"
                className="block text-sm font-medium text-gray-700 margin-200"
              >
                Select Booking Time
              </label>
              <ul>
                {buttons}
              </ul>
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
    </div>
      <Footer />
    </div>
  );
}


