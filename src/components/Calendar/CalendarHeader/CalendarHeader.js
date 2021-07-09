import React from "react";
import Button from "../../UI/Button/Button";

import classes from "./CalendarHeader.module.scss";

const CalendarHeader = (props) => {
  return (
    <div className={classes.calendar_header}>
      <h2>{props.currentMonthYear}</h2>
      <div className={classes.calendar_buttons}>
        <Button
          type="button"
          className={classes["btn-left"]}
          ariaLabel="Back"
        />
        <Button
          type="button"
          className={classes["btn-right"]}
          ariaLabel="Next"
        />
      </div>
    </div>
  );
};

export default CalendarHeader;
