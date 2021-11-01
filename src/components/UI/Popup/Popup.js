import React, { Fragment } from "react";
import reactDom from "react-dom";
import Card from "../Card/Card";

import classes from "./Popup.module.scss";

const Popup = (props) => {
  // Show the backdrop
  const Backdrop = () => {
    return <div className={classes.backdrop}></div>;
  };

  const PopupOverlay = () => {
    return (props.trigger ? 
      <div className={classes.popup}>
        <Card>
          {props.children}
        </Card>
      </div> : ""
    );
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
  )
};

export default Popup;
