import React from "react";
import Locations from "./Locations";
import Filters from "./filters";
import BanksList from "./BanksList";

function SideBar() {
  return (
    <div className="w-full h-full border-r border-white/10 text-black flex flex-col space-y-4 p-4 z-[102]">
      <div className="my-7">
        <p>BloodFinder</p>
      </div>
      <div className="">
        <Locations />
      </div>
      <div>
        <Filters />
      </div>
      <div>
        <BanksList />
      </div>
    </div>
  );
}

export default SideBar;
