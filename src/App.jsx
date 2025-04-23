import React, { lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import WaterSystemRootLayoutPage from "./components/layout/HomePageLayout";
import RootLayout from "./components/layout/RootLayout";
import { SuspenseContainer } from "./components/container/SuspenseContainer";
const LazyWaterSystemPage = lazy(() =>
  import("./pages/HomePage")
);

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
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
                  <LazyWaterSystemPage />
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
