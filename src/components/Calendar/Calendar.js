import React from 'react';

import classes from './Calendar.module.scss';

const weekdays = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

const Calendar = () => {
  return (
    <div className={classes.calendar}>
      <ul className={classes["week-days"]}>
        {weekdays.map((day, index) => (
          <li key={index}>{day}</li>
        ))}
      </ul>
      <div className={classes["month-days"]}></div>
    </div>
  );
};

export default Calendar;