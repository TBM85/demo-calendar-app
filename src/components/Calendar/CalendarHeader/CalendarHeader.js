import React from 'react';

import classes from './CalendarHeader.module.scss';

const CalendarHeader = () => {
  let date = new Date();
  let currentMonthYear = date.toLocaleString("en-us", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className={classes.calendar_header}>
      <h2>{currentMonthYear}</h2>
    </div>
  );
};

export default CalendarHeader;