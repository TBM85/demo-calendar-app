import React, { Fragment } from "react";
import reactDom from "react-dom";

import classes from "./Modal.module.scss";

const Modal = (props) => {
  // Hide the modal when the "Close" button is clicked
  const closeModalHandler = () => {
    let close = false;
    
    // Sends the value to the parent component "Calendar"
    props.onDataToCalendar(close);
  };

  // Show the backdrop
  const Backdrop = () => {
    return (
      <div className={classes.backdrop} onClick={closeModalHandler}></div>
    );
  };

  // Show the modal over the backdrop
  const ModalOverlay = () => {
    return (
      <div className={classes.modal}>
        <div className={classes.modal_content}>
          <p>Modal</p>
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
