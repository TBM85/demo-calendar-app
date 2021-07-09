import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import classes from "./CalendarBody.module.scss";

const CalendarBody = (props) => {
  const { daysInMonth } = props;

  const [dayNumber, setDayNumber] = useState([]);
  
  useEffect(() => {
    let daysInMonthArray = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const dayNumber = i;
  
      daysInMonthArray.push({
        id: uuidv4(),
        day: dayNumber
      })
    }

    setDayNumber(daysInMonthArray);
  }, [daysInMonth])

  return (
    <div className={classes.calendar_body}>
      <ul className={classes["week-days"]}>
        {props.weekdays.map((day, index) => (
          <li key={index}>{props.isBigDevice ? day : day.slice(0, 2)}</li>
        ))}
      </ul>
      <div className={classes["month-days"]}>
        {dayNumber.map((number) => (
          <div key={number.id} className={classes["number-day"]}>{number.day}</div>
        ))}
      </div>
    </div>
  );
};

export default CalendarBody;
