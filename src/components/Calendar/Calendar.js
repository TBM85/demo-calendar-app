import React, { useEffect, useState } from "react";

import classes from "./Calendar.module.scss";
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

  return (
    <div className={classes.calendar}>
      <CalendarHeader />
      <div className={classes.calendar_body}>
        <ul className={classes["week-days"]}>
          {weekdays.map((day, index) => (
            <li key={index}>{isBigDevice ? day : day.slice(0, 2)}</li>
          ))}
        </ul>
        <div className={classes["month-days"]}></div>
      </div>
    </div>
  );
};

export default Calendar;
