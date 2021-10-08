import React from "react";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import * as queries from "../../graphql/queries";
import { API } from "@aws-amplify/api";
import moment from "moment";

export const LineChart = () => {
  const [bookingList, setBookingList] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  //Retrieve user's booking list when page onload
  useEffect(() => {
    async function getBookingList() {
      //get start and end date of the week in AWSDateTime format
      const startOfYear = moment().year() + "-01-01T00:00:00.000Z";
      const endOfYear = moment().year() + "-12-31T12:59:59.000Z";

      //get list of booking based on owner ID and booking date must be made this week
      const getBooking = await API.graphql({
        query: queries.listBookings,
        variables: {
          filter: {
            facilityowner_id: {
              eq: sessionStorage.getItem("username"),
            },
            booking_date: {
              //between: ["2021-09-27T00:00:00.000Z", "2021-10-01T00:00:00.000Z"],
              between: [startOfYear, endOfYear],
            },
          },
        },
      });
      const freqArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      getBooking.data.listBookings.items.map((data) => {
        freqArr[data.booking_date.substr(5,2)-1]++;
      });
      setBookingList(freqArr);
    }
    getBookingList();
  }, []);

  return (
    <div>
      <Line
        data={{
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "July",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "No. of Bookings",
              data: bookingList,
              backgroundColor: "rgba(255, 99, 71, 1.0)",
              borderColor: "rgba(255, 99, 71, 0.7)",
              fill: false,
            },
          ],
        }}
        height={100}
      />
    </div>
  );
};

export default LineChart;
