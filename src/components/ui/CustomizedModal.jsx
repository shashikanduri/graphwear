import ReactDOM from "react-dom";
import { IoCloseOutline } from "react-icons/io5";
import Button from "./Button";
import classes from "./CustomizedModal.module.css";
import { useState } from "react";

const Backdrop = ({ onCancel }) => {
  return <div className={classes.backdrop} onClick={onCancel} />;
};

const ModalOverlay = ({
  onCancel = null,
  title,
  message,
  size,
  askConfirmation,
  onContinue,
  continueButtonName,
  cancelButtonName,
  modalButtonName,
  isButtonDisable,
  content,
}) => {
  
  const [buttonSpinner, setButtonSpinner] = useState(false);
  
  const continueClick = async () => {
    setButtonSpinner(true);
    await onContinue();
    setButtonSpinner(false);
  }
  
  return (
    <div className={`${classes.modal} ${classes[size]}`}>
      <div className={classes.header}>
        <h2 className={classes.headerTitle}>{title} </h2>
        <IoCloseOutline onClick={onCancel} className="cursor-pointer" />
      </div>
      {content && <div className={classes.content}>{content}</div>}
      {message && 
        <div className={classes.content}>
          {message.split('\n').map((part, index) => (
            <p key={index}>{part}</p>
          ))}
        </div>
      }
      {askConfirmation ? (
        <footer className={classes.actions}>
          <Button onClick={onCancel}>{cancelButtonName}</Button>
          <Button
            isLoading = {buttonSpinner}
            isPrimaryButton={true}
            onClick={continueClick}
            disabled={isButtonDisable}
          >
            {continueButtonName}
          </Button>
        </footer>
      ) : (
        <footer className={`${classes.actions} ${classes.oneButtonContainer}`}>
          <Button onClick={onCancel}>{modalButtonName}</Button>
        </footer>
      )}
    </div>
  );
};

const backdropRoot = document.getElementById("backdrop-root");
const backdropPortalElement = (onCancel) =>
  backdropRoot
    ? ReactDOM.createPortal(<Backdrop onCancel={onCancel} />, backdropRoot)
    : null;

const overlayRoot = document.getElementById("overlay-root");
const overlayPortalElement = ({
  onCancel,
  title,
  message,
  size = "modalHalf",
  askConfirmation = false,
  onContinue = () => {},
  continueButtonName = "Continue",
  cancelButtonName = "Cancel",
  modalButtonName = "Close",
  isButtonDisable = false,
  content = null,
}) =>
  overlayRoot
    ? ReactDOM.createPortal(
        <ModalOverlay
          onCancel={onCancel}
          title={title}
          message={message}
          //Below are optional parameters
          size={size} //Modal size will be bigger
          askConfirmation={askConfirmation}
          onContinue={onContinue}
          continueButtonName={continueButtonName}
          cancelButtonName={cancelButtonName}
          modalButtonName={modalButtonName}
          isButtonDisable={isButtonDisable}
          content={content}
        />,
        overlayRoot
      )
    : null;

const CustomizedModal = (props) => {
  return (
    <>
      {backdropPortalElement && backdropPortalElement(props.onCancel)}
      {overlayPortalElement && overlayPortalElement(props)}
    </>
  );
};

export default CustomizedModal;
