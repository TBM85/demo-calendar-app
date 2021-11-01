import React, { Fragment } from "react";
import reactDom from "react-dom";

import Card from "../Card/Card";
import Button from "../Button/Button";
import classes from "./Popup.module.scss";

const Popup = (props) => {
  // Show the backdrop
  const Backdrop = () => {
    return <div className={classes.backdrop}></div>;
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
            <Button type="button" className={classes["btn-cancel"]}>
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
