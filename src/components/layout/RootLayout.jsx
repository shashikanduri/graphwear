import { Outlet } from "react-router";
import Header from "../Header";

const RootLayoutPage = () => {
  return (
      <main className="bg-neutral h-fit min-h-screen w-screen flex flex-col justify-between overflow-x-hidden ">
        <Header />
        <div className=" shadow-md main-container flex-grow">
          <div className="content-container py-[2px] px-[10px] sm:px-[50px] md:px-[100px] mb-8">
            <Outlet />
          </div>
        </div>
      </main>
  );
};

export default RootLayoutPage;
