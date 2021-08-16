import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";

import classes from "./Calendar.module.scss";
import Modal from "../UI/Modal/Modal";
import CalendarBody from "./CalendarBody/CalendarBody";
import CalendarHeader from "./CalendarHeader/CalendarHeader";
import useDate from "../../hooks/useDate";

const Calendar = () => {
  const {
    weekdays,
    date,
    day,
    month,
    year,
    daysInMonth,
    emptyDays,
    backMonthHandler,
    nextMonthHandler
  } = useDate();

  // Handle media queries
  const [isBigDevice, setIsBigDevice] = useState();

  // Switch between screen sizes
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

  const [isOpen, setIsOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState("");

  // Open Modal
  const openModalHandler = (open, selectDate) => {
    setIsOpen(open);
    setSelectedDate(selectDate);
  };

  // Close Modal
  const closeModalHandler = (close) => {
    setIsOpen(close);
  };

  // It includes each new event in the event array
  const [events, setEvents] = useState([]);
  const eventDataHandler = (eventData) => {
    setEvents((prevEvents) => {
      return [eventData, ...prevEvents];
    });
  };

  // It deletes the event that matches the selected id
  const deleteEventHandler = (eventId) => {
    setEvents((prevEvents) => {
      let updatedEvents = prevEvents.filter((event) => event.id !== eventId);
      return updatedEvents;
    });
  };

  // It updates edited events
  const updateEventHandler = (eventItem, eventIdItem) => {
    setEvents((prevEvents) => {
      let updatedEvents = prevEvents.filter(
        (event) => event.id !== eventIdItem
      );
      return [eventItem, ...updatedEvents];
    });
  };

  return (
    <Fragment>
      {isOpen && (
        <Modal
          events={events}
          selectedDate={selectedDate}
          onDataToCalendar={closeModalHandler}
          onEventDataToCalendar={eventDataHandler}
          onDelete={deleteEventHandler}
          onEdit={updateEventHandler}
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

Calendar.propTypes = {
  isBigDevice: PropTypes.bool,
  dateNav: PropTypes.number,
  isOpen: PropTypes.bool,
  date: PropTypes.object,
  day: PropTypes.number,
  month: PropTypes.number,
  year: PropTypes.number,
  daysInMonth: PropTypes.number,
  firstDayOfMonth: PropTypes.object,
  initialWeekday: PropTypes.string,
  emptyDays: PropTypes.number,
  selectedDatea: PropTypes.string,
  events: PropTypes.object,
};
