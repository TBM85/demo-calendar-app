import React, { Fragment, useRef, useState } from "react";
import reactDom from "react-dom";
import { v4 as uuidv4 } from "uuid";
import PropTypes from 'prop-types';

import classes from "./Modal.module.scss";
import Button from "../Button/Button";
import EventItem from "../../EventItem/EventItem";

const Modal = (props) => {
  const { selectedDate, events } = props;

  const filteredEvents = events.filter((event) => event.date === selectedDate);

  // Hide the modal when the "Close" button is clicked
  const closeModalHandler = () => {
    let close = false;

    // Sends the value to the parent component "Calendar"
    props.onDataToCalendar(close);
  };

  const [isExpand, setIsExpand] = useState(false);
  const expandFormHandler = () => {
    setIsExpand(true);
  };

  const contractFormHandler = () => {
    setIsExpand(false);
  };

  const eventInput = useRef();

  const [isValid, setIsValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEvent = eventInput.current.value;

    if (enteredEvent.trim().length === 0) {
      setIsValid(false);
      return;
    }

    const eventData = {
      id: uuidv4(),
      text: enteredEvent,
      date: selectedDate,
    };

    setIsValid(true);

    props.onEventDataToCalendar(eventData);
  };

  const deleteHandler = (eventId) => {
    props.onDelete(eventId);
  };

  const editHandler = (eventItem, eventIdItem) => {
    props.onEdit(eventItem, eventIdItem);
  }

  // Show the backdrop
  const Backdrop = () => {
    return <div className={classes.backdrop} onClick={closeModalHandler}></div>;
  };

  // Show the modal over the backdrop
  const ModalOverlay = () => {
    return (
      <div className={classes.modal}>
        <div className={classes.modal_content}>
          <Button
            type="button"
            className={classes["btn-close"]}
            onClick={closeModalHandler}
          />
          {isExpand ? (
            <form onSubmit={submitHandler}>
              <label htmlFor="event">Event</label>
              <input
                id="event"
                type="text"
                ref={eventInput}
                className={!isValid ? classes["invalid"] : classes["valid"]}
              />
              {!isValid && <span>You need to enter text</span>}
              <div className={classes["buttons"]}>
                <Button type="submit" className={classes["btn-add"]}>
                  Add Event
                </Button>
                <Button
                  type="button"
                  className={classes["btn-cancel"]}
                  onClick={contractFormHandler}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <Button
              type="button"
              className={classes["btn-add"]}
              onClick={expandFormHandler}
            >
              Add Event
            </Button>
          )}
          <div className={classes["events"]}>
            {filteredEvents.length > 0 ? (
              <Fragment>
                <div>Events for today:</div>
                <ul className={classes["event-list"]}>
                  {filteredEvents.map((event) => (
                    <EventItem
                      key={event.id}
                      event={event}
                      onDelete={deleteHandler}
                      onEdit={editHandler}
                    />
                  ))}
                </ul>
              </Fragment>
            ) : (
              <p>You don't have any events today</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      {reactDom.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")
      )}
      {reactDom.createPortal(
        <ModalOverlay />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default Modal;

Modal.propTypes = {
  filteredEvents: PropTypes.object,
  close: PropTypes.bool,
  isExpand: PropTypes.bool,
  isValid: PropTypes.bool,
  enteredEvent: PropTypes.string,
  eventData: PropTypes.object
}