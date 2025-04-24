import React, { lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import WaterSystemRootLayoutPage from "./components/layout/HomePageLayout";
import RootLayout from "./components/layout/RootLayout";
import { SuspenseContainer } from "./components/container/SuspenseContainer";
const LazyWaterSystemPage = lazy(() =>
  import("./pages/HomePage")
);

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/graphwear",
      element:<RootLayout />,
      children:[
        {
          path: "",
          element: <WaterSystemRootLayoutPage />,
          children: [
            {
              index: true,
              element: (
                <SuspenseContainer>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <LazyWaterSystemPage />
                  </LocalizationProvider>
                </SuspenseContainer>
              )
            }
          ],
        }
      ]
    },

  ]);
  return <RouterProvider router={router} />;
};

export default App;
