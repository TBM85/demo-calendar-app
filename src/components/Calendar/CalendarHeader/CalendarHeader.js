import React, { useEffect, useState } from "react";

import classes from "./CalendarHeader.module.scss";
import Button from "../../UI/Button/Button";

const CalendarHeader = (props) => {
  const { backMonthHandler, nextMonthHandler, date } = props;

  const [dateInHeader, setDateInHeader] = useState("");

  useEffect(() => {
    // Get the month and year shown in the calendar header
    setDateInHeader(
      date.toLocaleString("en-us", {
        month: "long",
        year: "numeric",
      })
    );
  }, [date]);

  return (
    <div className={classes.calendar_header}>
      <h2>{dateInHeader}</h2>
      <div className={classes.calendar_buttons}>
        <Button
          type="button"
          className={classes["btn-left"]}
          ariaLabel="Back"
          onClick={backMonthHandler}
        />
        <Button
          type="button"
          className={classes["btn-right"]}
          ariaLabel="Next"
          onClick={nextMonthHandler}
        />
      </div>
    </div>
  );
};

export default CalendarHeader;
