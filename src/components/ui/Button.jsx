import classes from "./Button.module.css";

const Button = ({
  isLoading = false,
  isPrimaryButton = false,
  name,
  disabled = false,
  type = "button",
  onClick,
  children,
}) => {
  return (
    <div className={classes.buttonContainer}>
      <button
        name={name}
        className={`relative flex items-center justify-center ${
          isPrimaryButton
            ? disabled
              ? classes.btnDisabled
              : classes.btnPrimary
            : classes.btnSecondary
        } ${classes.btnCommon}`}
        type={type}
        onClick={onClick}
        disabled={disabled || isLoading}
      >
        {isLoading ? (
          <div
            className="absolute animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            role="status"
            aria-label="loading"
          />
        ) : (
          children
        )}
      </button>
    </div>
  );
};

export default Button;
