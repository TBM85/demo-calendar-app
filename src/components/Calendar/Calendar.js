import React, { useEffect, useState } from "react";

import classes from "./Calendar.module.scss";
import CalendarBody from "./CalendarBody/CalendarBody";
import CalendarHeader from "./CalendarHeader/CalendarHeader";

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Calendar = () => {
  // Handle media queries
  const [isBigDevice, setIsBigDevice] = useState("");

  const changeDevicesHandler = (bigDevice) => {
    setIsBigDevice(bigDevice.matches);
  };

  useEffect(() => {
    const bigDevice = window.matchMedia("(min-width: 992px)");
    bigDevice.addEventListener("change", changeDevicesHandler);
    changeDevicesHandler(bigDevice);

    return () => {
      bigDevice.removeEventListener("change", changeDevicesHandler);
    };
  }, []);

  // Create an instance of a date object
  let date = new Date();

  // Get the current month and year
  let currentMonthYear = date.toLocaleString("en-us", {
    month: "long",
    year: "numeric",
  });

  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  // Get the last day of the month
  let daysInMonth = new Date(year, month, 0).getDate();

  return (
    <div className={classes.calendar}>
      <CalendarHeader currentMonthYear={currentMonthYear} />
      <CalendarBody
        weekdays={weekdays}
        isBigDevice={isBigDevice}
        daysInMonth={daysInMonth}
      />
    </div>
  );
};

export default Calendar;
