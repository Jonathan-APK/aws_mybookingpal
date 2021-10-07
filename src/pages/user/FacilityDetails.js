import Breadcrumbs from "../../components/layout/Breadcrumbs";
import Footer from "../../components/layout/Footer";
import UserNavbar from "../../components/layout/navbar/UserNavbar";
import {useState} from "react";
import TimePicker from "rc-time-picker";
import { useEffect } from "react";
import { API } from "@aws-amplify/api";
import * as queries from "../../graphql/queries";
import moment from "moment";
import { Link } from "react-router-dom";


export default function FacilityDetails(props) {

  const facility = props.location.facility;
  //console.log(facility);
  const [bookingTime, setBookingTime] = useState("");
  const [slotDate, setSlotDate] = useState(new Date());
  const [filteredSlots, setFilteredSlots] = useState([]);
  const [buttons,setButtons] = useState("Please select a date.");
  const [existingBookings, setExistingBookings] = useState([]);
  const [checkoutButton, setCheckoutButton] = useState([]);
  useEffect(() => {
    async function getBookingList() {
      let slotDateString = slotDate.getFullYear() + "-" + ("0"+(slotDate.getMonth()+1)).slice(-2) + "-" + ("0" + slotDate.getDate()).slice(-2);
      console.log("Get booking list with :" + facility.id + " " + slotDateString);
      const getBooking = await API.graphql({
        query: queries.listBookings,
        variables: {
          filter: {
            facility_id: {
              eq: facility.id
            },
            booking_date:{
              eq: slotDateString,
            }
          },
        },
      });

      setExistingBookings(getBooking.data.listBookings.items)
      console.log("List of bookings done on this date: ", getBooking);
    };
    getBookingList();
  },[slotDate]);
  useEffect(()=> {
    function fetchSlots(){
      //console.log("fetch slots List of bookings done on this date: ", existingBookings);
      //console.log("Date entered: " + slotDate);
      let results = [];
      let weekday = slotDate.toLocaleString('en-us', {  weekday: 'long' }).substring(0,3);
      //console.log(weekday);
      //console.log("Facility operatin days.", facility.operating_days);
      for(const operatingDay of facility.operating_days){
        if (weekday == operatingDay){
          results = generateSlots(facility.opening_hrs,facility.closing_hrs);
          break;
        }
        
      }
      
      //console.log("Results:");
      //console.log(results);
      setFilteredSlots(results);
    };
    function generateSlots(){
      let startTime = new Date(slotDate);
      setTime(startTime, facility.opening_hrs);
      //console.log(startTime.toLocaleString());
      let endTime = new Date(slotDate);
      setTime(endTime, facility.closing_hrs);
      //console.log(endTime.toLocaleString());
      
      if( endTime.getHours() < startTime.getHours() ){
        return [];
      }
      //console.log(startTime);
      let timeStops = [];
      let count = 0;
      let tempStartTime = startTime;
      let tempEndTime = new Date(startTime.toLocaleString());
      let currentDateTime = new Date();
      //console.log("CUrrent Date: " + currentDateTime.toLocaleString());
      tempEndTime.setHours(tempEndTime.getHours() + 1);
      while(tempStartTime.getHours() < endTime.getHours()){
        // console.log(tempStartTime.toLocaleString(),tempEndTime.toLocaleString());
        let isAvailable = true;
        
        for(const existingBooking of existingBookings){
          let existingBookingStart = new Date(slotDate);
          setTime(existingBookingStart, existingBooking.slot.start_time);
          let existingBookinEnd = new Date(slotDate);
          setTime(existingBookinEnd, existingBooking.slot.end_time);
          // console.log(existingBookinEnd,existingBookinEnd);
          if(tempStartTime >= existingBookingStart && tempStartTime < existingBookinEnd){
            // console.log("Is not available");
            isAvailable=false;
          }else if(tempEndTime > existingBookingStart && tempEndTime <= existingBookinEnd){
            // console.log("Is not available");
            isAvailable=false;
          }else if(tempStartTime < new Date()){
            // console.log("Cannot book past timings.");
            isAvailable=false;
          }
        }

        let tempSlot = {
          id:count,
          startTime:tempStartTime.toLocaleDateString("en-US",{hour:"2-digit",minute:"2-digit"}).split(',')[1].trim(),
          enTime:tempEndTime.toLocaleDateString("en-US",{hour:"2-digit",minute:"2-digit"}).split(',')[1].trim(),
          duration:1,
          selected:false,
          available:isAvailable
        };
        timeStops.push(tempSlot);
        count++;
        tempStartTime.setHours(tempStartTime.getHours() + 1);
        tempEndTime.setHours(tempEndTime.getHours() + 1);
      }
      return timeStops;
    }
    
    fetchSlots();
  },[existingBookings]);

  useEffect(() => {
    console.log("filtered slots changed");
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
 
    
    let buttonsTemp = 'Please Select a date.';
    if (filteredSlots== null || filteredSlots.length == 0) {
      buttonsTemp = <p>Sorry. There are no slots available.</p>;
    } else {
      buttonsTemp = <ul>{filteredSlots.map((slot,i) => <button disabled={!slot.available} onClick={function(e) {toggleSlotSelection(slot.id);}} className={getSlotButtonClass(slot.selected, slot.available)}>
        {slot.startTime}
      </button>)}</ul>;
    }
    function renderCheckoutButton(){
      let tempjsx = <div></div>;
     if(checkDisableCheckout()){
       tempjsx =
       <button type="button" className="h-14 px-6 py-2 font-semibold rounded-xl bg-gray-600 text-white">
        <a>
            <span aria-hidden="true" />
              Checkout
          </a>
        </button>
        }else{
       tempjsx = 
       <button type="button" className="h-14 px-6 py-2 font-semibold rounded-xl bg-blue-600 hover:bg-blue-800 text-white">
        <Link to={{
        pathname: "/payment",
        totalAmt: facility.rate,
        token: null,
        facility_id: facility.id,
        facility_name: facility.name,
        rate: facility.rate,
        address: facility.address,
        area: facility.area,
        cust_id: sessionStorage.getItem("username"),
        facilityowner_id: facility.userID,
        start_time: getSelectedSlot().startTime,
        end_time: getSelectedSlot().endTime,
        duration: 1,
        }}>
          <a>
            <span aria-hidden="true" />
              Checkout
          </a>
        </Link></button>
        };
        //console.log(tempjsx);
        setCheckoutButton(tempjsx);
    };
    function checkDisableCheckout(){
      console.log("Check Disable Checkout");
      for(const tempSlot of filteredSlots){
        console.log(tempSlot);
        if(tempSlot.selected){
          return false;
        }
      }
      return true;
    }
    renderCheckoutButton();
    setButtons(buttonsTemp)
  },[filteredSlots])

  function setTime(date,timeString) {
    date.setHours(timeString.substring(0, 2));
    date.setMinutes(timeString.substring(3, 5));
  }
  function toggleSlotSelection(slotId){
    // console.log("Toggle Slot Selection")
    // console.log("slot selected: ");
    let tempFilteredSlots = [];
    for(const slot of filteredSlots){
      if(slot.id == slotId){
        if(slot.selected == true){
          slot.selected = false;
        }else{
          slot.selected = true;
        }
      }else{
        slot.selected = false;
      }
      tempFilteredSlots.push(slot);
    }
    
    
    setFilteredSlots(tempFilteredSlots);
    // console.log(filteredSlots);
    

  }

  function getSelectedSlot(){
    let selectedSlot = [];
    for(const tempSlot of filteredSlots){
      if(tempSlot.selected){
        return tempSlot;
      }
    }
    return {Message : "No Slot Selected"};
  };
  
  

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
              
              {checkoutButton}
                  
            
            </div>
            
          </div>
        </div>
      </div>
    </div>
      <Footer />
    </div>
  );


}


