"use client";
import GMap from "@/components/ui/GMap";
import { useOrigin } from "@/lib/contexts";
import React from "react";

function Page() {
  const { origin, setOrigin, mapRef } = useOrigin();
  return (
    <div className="w-full h-[100vh] ">
      <GMap origin={origin} setOrigin={setOrigin} mapRef={mapRef} />
    </div>
  );
}

export default Page;
