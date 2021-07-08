import React from 'react';

import classes from './Calendar.module.scss';

const Calendar = () => {
  return (
    <div className={classes.calendar}>
      <div className={classes["week-days"]}></div>
      <div className={classes["month-days"]}></div>
    </div>
  );
};

export default Calendar;