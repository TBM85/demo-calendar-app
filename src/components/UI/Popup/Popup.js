import React, { Fragment } from "react";
import reactDom from "react-dom";

import Card from "../Card/Card";
import Button from "../Button/Button";
import classes from "./Popup.module.scss";

const Popup = (props) => {
  // Hide the popup when the "Close" button is clicked
  const closePopupHandler = () => {
    let closePopup = false;

    // Sends the value to the parent component "EventItem"
    props.onDataToEventItem(closePopup);
  };

  // Show the backdrop
  const Backdrop = () => {
    return <div className={classes.backdrop} onClick={closePopupHandler}></div>;
  };

  // Show the popup over the backdrop
  const PopupOverlay = () => {
    return (props.trigger ? (
      <div className={classes.popup}>
        <Card>
          <h3>Are you sure?</h3>
          <p>Once deleted, you won't be able to recover this event</p>
          <div className={classes["buttons"]}>
            <Button type="button" className={classes["btn-remove"]}>
              Remove
            </Button>
            <Button
              type="button"
              className={classes["btn-cancel"]}
              onClick={closePopupHandler}
            >
              Cancel
            </Button>
          </div>
        </Card>
      </div>
    ) : (
      ""
    ));
  };

  return (
    <Fragment>
      {reactDom.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")
      )}
      {reactDom.createPortal(
        <PopupOverlay />,
        document.getElementById("popup-root")
      )}
    </Fragment>
  );
};

export default Popup;
