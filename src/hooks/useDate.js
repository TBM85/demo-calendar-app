import { useState } from "react";

const useDate = () => {
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

   // Create an instance of a date object
   let date = new Date();

   const [dateNav, setDateNav] = useState(0);

   if (dateNav !== 0) {
     date.setMonth(date.getMonth() + dateNav);
   }
 
   let day = date.getDate();
   let month = date.getMonth();
   let year = date.getFullYear();
 
   // Get the last day of the month
   let daysInMonth = new Date(year, month + 1, 0).getDate();
 
   // Get the first day of the month
   let firstDayOfMonth = new Date(year, month, 1);
 
   // The day of the week of the first day of the month
   const initialWeekday = firstDayOfMonth.toLocaleDateString("en-us", {
     weekday: "long",
   });
 
   // The number of empty days before the first day of the month
   const emptyDays = weekdays.indexOf(initialWeekday.split(", ")[0]);
 
   // Decreases the value of the navigation date by one
   // when clicking on the left arrow
   const backMonthHandler = () => {
     setDateNav(dateNav - 1);
   };
 
   // Increase the value of the navigation date by one
   // when clicking the right arrow
   const nextMonthHandler = () => {
     setDateNav(dateNav + 1);
   };
 

  return {
    weekdays,
    date,
    day,
    month,
    year,
    daysInMonth,
    emptyDays,
    backMonthHandler,
    nextMonthHandler
  };
};

export default useDate;