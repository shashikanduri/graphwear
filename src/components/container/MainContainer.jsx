const MainContainer = ({
  children,
  header = " ",
  onEdit,
  isDisable = false,
  disableReason = "Not Allowed",
}) => {
  return (
    <div
      className={`w-full bg-white px-4 md:px-8 rounded-xl`}
    >
      {header && (
        <div className="flex items-end gap-[5px] mb-8">
          <h2 className="font-bold text-xl md:text-2xl">{header}</h2>
          {onEdit && (
            <p
              className={`text-xl font-bold ${
                isDisable
                  ? "cursor-not-allowed text-gray-500"
                  : "cursor-pointer text-accent hover:text-amber-700 duration-100"
              }`}
              onClick={isDisable ? () => {} : onEdit}
              title={isDisable ? disableReason : ""}
            >
              (edit)
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default MainContainer;
