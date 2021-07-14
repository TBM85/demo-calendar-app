import React, { Fragment, useState } from "react";
import Button from "../UI/Button/Button";
import classes from "./EventItem.module.scss";

const EventItem = (props) => {
  const { event } = props;

  const [isEditing, setEditing] = useState(false);

  const deleteHandler = (event) => {
    let eventId = event.target.parentElement.id;

    props.onDelete(eventId);
  };

  const startEditHandle = () => {
    setEditing(true);
  };

  const [eventText, setEventText] = useState(event.text);
  const editEventHandler = (event) => {
    setEventText(event.target.value);
  };

  const endEditHandler = () => {
    setEditing(false);

    console.log(eventText);
  };

  return (
    <li id={event.id} className={classes["event-item"]}>
      {!isEditing ? (
        <Fragment>
          <span onDoubleClick={startEditHandle}>{eventText}</span>
          <Button
            type="button"
            className={classes["btn-delete"]}
            onClick={deleteHandler}
          />
        </Fragment>
      ) : (
        <Fragment>
          <input
            type="text"
            defaultValue={eventText}
            onChange={editEventHandler}
            autoFocus
          />
          <Button
            type="button"
            className={classes["btn-save"]}
            onClick={endEditHandler}
          />
        </Fragment>
      )}
    </li>
  );
};

export default EventItem;
