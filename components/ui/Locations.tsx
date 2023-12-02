"use client";
import React, { MutableRefObject, useRef, useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { Autocomplete, Libraries, useLoadScript } from "@react-google-maps/api";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { useOrigin } from "@/lib/contexts";
import { isLoaded } from "google-maps";
import { Loader2 } from "lucide-react";

function Locations() {
  const { setOrigin, mapRef } = useOrigin();

  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>();
  const map: google.maps.Map = mapRef.current;

  const [libraries] = useState<Libraries>(["places"]);
  const mapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

  function handleClickPosition(e) {
    // e.preventDefault();
    setIsLoading(true);
    geocodeByAddress(inputRef.current?.value)
      .then((results) => {
        getLatLng(results[0]).then(({ lat, lng }) => {
          setOrigin({ lat, lng });
          map?.panTo({ lat, lng });
          map?.setZoom(15);
        });
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }

  function handleClickCurrentPosition(e) {
    // e.preventDefault();
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition((pos) => {
      setIsLoading(false);
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
            disabled={isLoading}
            type="text"
            className="bg-neutral-100"
            placeholder="Search for Locations"
          />
        </Autocomplete>
        {isLoading ? (
          <Button disabled className="bg-red-600 hover:bg-red-700 w-[30%]">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button
            className="bg-red-600 hover:bg-red-700 w-[30%]"
            onClick={handleClickPosition}>
            Search
            <GpsFixedIcon className=" pl-2" />
          </Button>
        )}
      </div>
      <div className="flex w-full gap-2">
        {isLoading ? (
          <Button
            disabled
            className="border-red-600 bg-white hover:bg-red-700/10 w-full text-red-600 hover:text-red-700">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button
            variant={"outline"}
            className="border-red-200 hover:bg-red-700/10 w-full text-red-600 hover:text-red-700"
            onClick={handleClickCurrentPosition}>
            Current Location
          </Button>
        )}
      </div>
    </div>
  );
}

export default Locations;
