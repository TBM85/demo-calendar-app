import React, { Fragment, useState } from "react";
import PropTypes from 'prop-types';

import classes from "./EventItem.module.scss";
import Button from "../UI/Button/Button";

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

  const [eventItem, setEventItem] = useState(event);
  const [eventText, setEventText] = useState(event.text);
  const editEventHandler = (e) => {
    setEventText(e.target.value);

    setEventItem(() => ({
      id: event.id,
      text: eventText,
      date: event.date
    }))
  };

  const endEditHandler = () => {
    setEditing(false);

    let eventIdItem = event.id;

    props.onEdit(eventItem, eventIdItem);
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
  );
};

export default EventItem;

EventItem.propTypes = {
  isEditing: PropTypes.bool,
  eventId: PropTypes.number,
  eventIdItem: PropTypes.number,
  eventItem: PropTypes.object,
  eventText: PropTypes.string
}