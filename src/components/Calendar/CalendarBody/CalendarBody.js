import React from "react";

import classes from "./CalendarBody.module.scss";

const CalendarBody = (props) => {
  return (
    <div className={classes.calendar_body}>
      <ul className={classes["week-days"]}>
        {props.weekdays.map((day, index) => (
          <li key={index}>{props.isBigDevice ? day : day.slice(0, 2)}</li>
        ))}
      </ul>
      <div className={classes["month-days"]}>{props.daysInMonth}</div>
    </div>
  );
};

export default CalendarBody;
