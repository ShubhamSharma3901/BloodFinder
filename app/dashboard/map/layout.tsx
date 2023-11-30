"use client";
import React from "react";
import SideBar from "@/components/ui/SideBar";
import { originContext } from "@/lib/contexts";
import SideBarMobile from "@/components/ui/sidebar-mobile";

function Layout({ children }: { children: React.ReactNode }) {
  const [origin, setOrigin] = React.useState({
    lat: null,
    lng: null,
  });
  const mapRef = React.useRef<google.maps.Map>();
  return (
    <originContext.Provider value={{ origin, setOrigin, mapRef }}>
      <div className="h-full tablet:flex-col">
        <div className="hidden laptop:flex laptop:w-[30rem] laptop:inset-y-0 laptop:flex-col laptop:fixed laptop:z-[100] border">
          <SideBar />
        </div>
        <div className="laptop:hidden absolute top-0 left-0 z-[100]">
          <SideBarMobile />
        </div>
        <div className="laptop:pl-[30rem]">{children}</div>
      </div>
    </originContext.Provider>
  );
}

export default Layout;
