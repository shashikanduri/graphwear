import classes from "./LoadingSpinner.module.css";

export function LoadingSpinner({
  size = "20px",
  enableLoadingText = false,
  loadingText = "Loading",
  className = "",
}) {
  const spinnerStyle = {
    "--spinner-size": size, // Sets the CSS variable for size
  };

  return (
    <span className={`${classes.spinnerContainer} ${className}`}>
      <span className={classes.loadingSpinner} style={spinnerStyle}></span>
      {enableLoadingText && (
        <div>
          {loadingText}
          <span className={classes["dot-one"]}>.</span>
          <span className={classes["dot-two"]}>.</span>
          <span className={classes["dot-three"]}>.</span>
        </div>
      )}
    </span>
  );
}
