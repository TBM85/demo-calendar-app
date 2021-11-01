import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";

import classes from "./EventItem.module.scss";
import Button from "../UI/Button/Button";
import Popup from "../UI/Popup/Popup";

const EventItem = (props) => {
  const { event } = props;

  const [isEditing, setEditing] = useState(false);

  const deleteHandler = (event) => {
    let eventId = event.target.parentElement.id;

    // Sends the value to the parent component "Modal"
    props.onDelete(eventId);
  };

  // When an event is clicked, the edit mode opens
  const startEditHandler = () => {
    setEditing(true);
  };

  const [eventItem, setEventItem] = useState(event);
  const [eventText, setEventText] = useState(event.text);

  const editEventHandler = (e) => {
    setEventText(e.target.value);
  };

  const [isValid, setIsValid] = useState(true);
  // When the check mark button is clicked, the edit mode is closed
  const endEditHandler = () => {
    // If the input edit is empty, the edit mode is not closed
    if (eventText.trim().length === 0) {
      setEditing(true);
      setIsValid(false);
      return;
    }

    setEditing(false);

    let eventIdItem = event.id;

    // Sends the values to the parent component "Modal"
    props.onEdit(eventItem, eventIdItem);
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Open Popup
  const openPopupHandler = () => {
    setIsPopupOpen(true);
  };

  useEffect(() => {
    // The changes contained in the edited event
    setEventItem(() => ({
      id: event.id,
      text: eventText,
      date: event.date,
    }));
  }, [event.date, event.id, eventText]);

  return (
    <Fragment>
      <li
        id={event.id}
        className={`${classes["event-item"]} ${
          !isEditing ? classes["event-item-padding"] : ""
        } ${!isValid ? classes["invalid"] : classes["valid"]}`}
      >
        {!isEditing ? (
          <Fragment>
            <span onClick={startEditHandler}>{eventText}</span>
            <Button
              type="button"
              className={classes["btn-delete"]}
              onClick={openPopupHandler}
            />
            {isPopupOpen && (
              <Popup
                trigger={isPopupOpen}
                onDelete={deleteHandler}
              />
            )}
          </Fragment>
        ) : (
          <Fragment>
            <input
              type="text"
              className={classes["event-input"]}
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
      {!isValid && (
        <span className={classes["red-text"]}>You need to enter text</span>
      )}
    </Fragment>
  );
};

export default EventItem;

EventItem.propTypes = {
  isEditing: PropTypes.bool,
  eventId: PropTypes.number,
  eventIdItem: PropTypes.number,
  eventItem: PropTypes.object,
  eventText: PropTypes.string,
  isValid: PropTypes.bool,
};
