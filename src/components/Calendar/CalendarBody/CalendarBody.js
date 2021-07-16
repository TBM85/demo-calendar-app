import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

import classes from "./CalendarBody.module.scss";

const CalendarBody = (props) => {
  const {
    daysInMonth,
    weekdays,
    emptyDays,
    day,
    month,
    year,
    events,
    selectedDate,
  } = props;

  const [daysArray, setDaysArray] = useState([]);

  useEffect(() => {
    let daysInMonthArray = [];

    let totalDays = emptyDays + daysInMonth;

    for (let arrayIndex = 1; arrayIndex <= totalDays; arrayIndex++) {
      // If the index of the array is greater than the number of empty days, the number of the day is displayed; otherwise nothing is displayed
      let dayNumber = arrayIndex - emptyDays;
      let currentDay = dayNumber === day;

      let dayString = `${month + 1}/${arrayIndex - emptyDays}/${year}`;

      let filterDate = events.filter((event) => event.date === dayString);

      if (arrayIndex > emptyDays) {
        daysInMonthArray.push({
          id: uuidv4(),
          day: dayNumber,
          currentDay: currentDay,
          events: filterDate.length > 0,
        });
      } else {
        daysInMonthArray.push({
          id: uuidv4(),
          day: "",
          currentDay: null,
          events: null,
        });
      }

      console.log(daysInMonthArray);
    }

    setDaysArray(daysInMonthArray);
  }, [day, daysInMonth, emptyDays, events, month, selectedDate, year]);

  // When any day is clicked, a modal opens
  const openModalHandler = (event) => {
    let open = true;

    let selectDate = `${month + 1}/${event.target.outerText}/${year}`;

    // Sends the value to the parent component "Calendar"
    props.onDataToCalendar(open, selectDate);
  };

  return (
    <div className={classes.calendar_body}>
      <ul className={classes["week-days"]}>
        {weekdays.map((day, index) => (
          <li key={index}>{props.isBigDevice ? day : day.slice(0, 2)}</li>
        ))}
      </ul>
      <div className={classes["month-days"]}>
        {daysArray.map((number) => (
          <div
            key={number.id}
            className={`${classes["number-day"]} ${
              number.currentDay !== null ? classes["no-empty-days"] : ""
            } ${number.currentDay ? classes["current-day"] : ""} ${
              number.events ? classes["there-are-events"] : ""
            }`}
            onClick={number.currentDay !== null ? openModalHandler : null}
          >
            {number.day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarBody;

CalendarBody.propTypes = {
  daysArray: PropTypes.object,
  daysInMonthArray: PropTypes.object,
  totalDays: PropTypes.number,
  dayNumber: PropTypes.number,
  currentDay: PropTypes.bool,
  dayString: PropTypes.string,
  filterDate: PropTypes.object,
  open: PropTypes.bool,
  selectDate: PropTypes.string,
};
