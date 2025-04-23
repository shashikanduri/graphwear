import React, { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";

const Nav = () => {

  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);

  return (
    <>
      <div className="main-container">
        <div className="content-container py-[5px] px-[10px] sm:px-[50px] md:px-[100px]">
          <nav className="flex flex-wrap items-center justify-between w-full py-4 md:py-0">

            <div
              className={`${
                showHamburgerMenu ? "" : "hidden"
              } w-full lg:flex-1 lg:flex lg:items-center lg:w-auto`}
              id="menu"
            >
              <ul className="w-full py-2 text-base font-medium text-primary lg:flex lg:justify-between">
                <li className="lg:block hidden">
                  <img
                    src="/graphwear/graphwear-logo.png"
                    alt="Graphwear logo horizontal"
                    className="h-[67px] w-[90px]"
                  />
                </li>
                <li>
                  <div className="group relative inline-block text-left">
                    <span className="md:py-4 py-2 flex items-center gap-2">
                      {"User"}
                      <FaCircleUser className="text-xl" />
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Nav;
