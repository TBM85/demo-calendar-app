import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "../../UI/Button/Button";

import classes from "./CalendarBody.module.scss";

const CalendarBody = (props) => {
  const { daysInMonth, weekdays, emptyDays, day } = props;

  const [daysArray, setDaysArray] = useState([]);

  useEffect(() => {
    let daysInMonthArray = [];

    let totalArray = emptyDays + daysInMonth;

    for (let arrayIndex = 1; arrayIndex <= totalArray; arrayIndex++) {
      // If the index of the array is greater than the number of empty days, the number of the day is displayed; otherwise nothing is displayed
      let dayNumber = arrayIndex - emptyDays;
      let currentDay = dayNumber === day;

      if (arrayIndex > emptyDays) {
        daysInMonthArray.push({
          id: uuidv4(),
          day: dayNumber,
          currentDay: currentDay,
        });
      } else {
        daysInMonthArray.push({
          id: uuidv4(),
          day: "",
          currentDay: currentDay,
        });
      }
    }

    setDaysArray(daysInMonthArray);
  }, [day, daysInMonth, emptyDays]);

  const openBtnHandler = () => {
    let open = true;

    props.onDataToCalendar(open);

    console.log("open");
  }

  return (
    <div className={classes.calendar_body}>
      <ul className={classes["week-days"]}>
        {weekdays.map((day, index) => (
          <li key={index}>{props.isBigDevice ? day : day.slice(0, 2)}</li>
        ))}
      </ul>
      <div className={classes["month-days"]}>
        {daysArray.map((number) => (
          <Button
            type="button"
            key={number.id}
            className={`${classes["number-day"]} ${
              number.currentDay ? classes["current-day"] : ""
            }`}
            onClick={openBtnHandler}
          >
            {number.day}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CalendarBody;
