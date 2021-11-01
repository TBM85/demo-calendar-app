import React, { Fragment } from "react";
import reactDom from "react-dom";

import classes from "./Popup.module.scss";

const Popup = (props) => {
  // Show the backdrop
  const Backdrop = () => {
    return <div className={classes.backdrop}></div>;
  };

  const PopupOverlay = () => {
    return (props.trigger ? 
      <div className={classes.popup}>
        <div className={classes.popup_inner}>
          {props.children}
        </div>
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
