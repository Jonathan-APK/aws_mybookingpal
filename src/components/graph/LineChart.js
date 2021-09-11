import React from "react";
import { Line } from "react-chartjs-2";
export const LineChart = () => {
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
              data: [12, 1, 3, 1, 2, 3, 4, 5, 1, 7, 1, 4],
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
