import React, { Fragment, useEffect, useState } from "react";
import Modal from "../UI/Modal/Modal";

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
  const [dateNav, setDateNav] = useState(0);

  const [isOpen, setIsOpen] = useState(false);

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

  const [selectedDate, setSelectedDate] = useState();
  // Open Modal
  const openModalHandler = (open, selectDate) => {
    setIsOpen(open);
    setSelectedDate(selectDate);
  };

  // Close Modal
  const closeModalHandler = (close) => {
    setIsOpen(close);
  };

  const [events, setEvents] = useState([]);
  const eventDataHandler = (eventData) => {
    setEvents((prevEvents) => {
      return [eventData, ...prevEvents];
    })
  }

  const deleteEventHandler = (eventId) => {
    setEvents(prevEvents => {
      let updatedEvents = prevEvents.filter((event) => event.id !== eventId);
      return updatedEvents;
    })
  }

  return (
    <Fragment>
      {isOpen && (
        <Modal
          events={events}
          selectedDate={selectedDate}
          onDataToCalendar={closeModalHandler}
          onEventDataToCalendar={eventDataHandler}
          onDelete={deleteEventHandler}
        />
      )}
      <div className={classes.calendar}>
        <CalendarHeader
          date={date}
          backMonthHandler={backMonthHandler}
          nextMonthHandler={nextMonthHandler}
        />
        <CalendarBody
          day={day}
          month={month}
          year={year}
          events={events}
          selectedDate={selectedDate}
          weekdays={weekdays}
          isBigDevice={isBigDevice}
          daysInMonth={daysInMonth}
          emptyDays={emptyDays}
          onDataToCalendar={openModalHandler}
        />
      </div>
    </Fragment>
  );
};

export default Calendar;
