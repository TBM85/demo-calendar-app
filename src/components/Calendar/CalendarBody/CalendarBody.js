import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import classes from "./CalendarBody.module.scss";

const CalendarBody = (props) => {
  const { daysInMonth, weekdays, emptyDays } = props;

  const [daysArray, setDaysArray] = useState([]);
  
  useEffect(() => {
    let daysInMonthArray = [];

    let totalArray = emptyDays + daysInMonth;

    for (let arrayIndex = 1; arrayIndex <= totalArray; arrayIndex++) {
      // If the index of the array is greater than the number of empty days, the number of the day is displayed; otherwise nothing is displayed
      let dayNumber = arrayIndex - emptyDays;

      if (arrayIndex > emptyDays) {
        daysInMonthArray.push({
          id: uuidv4(),
          day: dayNumber
        })
      } else {
        daysInMonthArray.push({
          id: uuidv4(),
          day: ''
        })
      }
    }

    setDaysArray(daysInMonthArray);

  }, [daysInMonth, emptyDays])

  return (
    <div className={classes.calendar_body}>
      <ul className={classes["week-days"]}>
        {weekdays.map((day, index) => (
          <li key={index}>{props.isBigDevice ? day : day.slice(0, 2)}</li>
        ))}
      </ul>
      <div className={classes["month-days"]}>
        {daysArray.map((number) => (
          <div key={number.id} className={classes["number-day"]}>{number.day}</div>
        ))}
      </div>
    </div>
  );
};

export default CalendarBody;
