"use client";
import React, { MutableRefObject, useRef, useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { Autocomplete, Libraries, useLoadScript } from "@react-google-maps/api";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { useOrigin } from "@/lib/contexts";
import { isLoaded } from "google-maps";

function Locations() {
  const { setOrigin, mapRef } = useOrigin();

  const inputRef = useRef<HTMLInputElement>();
  const map: google.maps.Map = mapRef.current;

  const [libraries] = useState<Libraries>(["places"]);
  const mapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

  function handleClickPosition(e) {
    e.preventDefault();
    console.log(inputRef.current?.value);
    geocodeByAddress(inputRef.current?.value)
      .then((results) => {
        getLatLng(results[0]).then(({ lat, lng }) => {
          setOrigin({ lat, lng });
          map?.panTo({ lat, lng });
          map?.setZoom(15);
        });
      })
      .catch((error) => console.error(error));
  }

  function handleClickCurrentPosition(e) {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition((pos) => {
      setOrigin({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });
  }
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: mapsKey,
    libraries: libraries,
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (loadError) {
    return <div>Error Loading</div>;
  }
  return (
    <div className="flex flex-col justify-center items-center space-y-2">
      <div className="w-full flex gap-2">
        <Autocomplete className="w-[80%]">
          <Input
            ref={inputRef}
            type="text"
            className="bg-neutral-100"
            placeholder="Search for Locations"
          />
        </Autocomplete>
        <Button
          className="bg-red-600 hover:bg-red-700 w-[30%]"
          onClick={handleClickPosition}>
          Search
          <GpsFixedIcon className=" pl-2" />
        </Button>
      </div>
      <div className="flex w-full gap-2">
        <Button
          variant={"outline"}
          className="border-red-200 hover:bg-red-700/10 w-full text-red-600 hover:text-red-700"
          onClick={handleClickCurrentPosition}>
          Current Location
        </Button>
      </div>
    </div>
  );
}

export default Locations;
