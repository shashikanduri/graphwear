import { Suspense } from "react";
import { LoadingSpinner } from "../LoadingSpinner";

export const SuspenseContainer = ({ children, enableLoadingText = true }) => {
  return (
    <Suspense
      fallback={
        <LoadingSpinner
          size="40px"
          className="h-[223px] w-[100%]"
          enableLoadingText={enableLoadingText}
        />
      }
    >
      {children}
    </Suspense>
  );
};
