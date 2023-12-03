"use client";
import React, { useRef, useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { Autocomplete, Libraries, useLoadScript } from "@react-google-maps/api";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { useOrigin } from "@/lib/contexts";
import { Loader2 } from "lucide-react";
import { toast } from "./use-toast";

function Locations() {
  const { setOrigin, mapRef } = useOrigin();

  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const map: google.maps.Map | undefined = mapRef.current;

  const [libraries] = useState<Libraries>(["places"]);
  const mapsKey = String(process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY);

  function handleClickPosition() {
    setIsLoading(true);
    if (String(inputRef.current?.value) === "") {
      toast({
        variant: "destructive",
        title: "Oops!",
        description: "Location cannot be empty.",
        duration: 2000,
      });
      setIsLoading(false);
      return;
    }
    geocodeByAddress(String(inputRef?.current?.value))
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

  function handleClickCurrentPosition() {
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
    <div className="flex flex-col justify-center items-center space-y-2 bg-neutral-50/90 p-3 rounded-2xl shadow-inner">
      <div className="w-full flex gap-2">
        <Autocomplete className="w-[80%]">
          <Input
            ref={inputRef}
            disabled={isLoading}
            type="text"
            className="bg-white shadow-sm rounded-xl hover:shadow-md transition"
            placeholder="Search for Locations"
            required={true}
          />
        </Autocomplete>
        {isLoading ? (
          <Button
            disabled
            className="bg-red-600 hover:bg-red-700 w-[30%] rounded-xl flex gap-1">
            <Loader2 className=" h-4 w-4 animate-spin" />
            Searching
          </Button>
        ) : (
          <Button
            className="bg-red-600 hover:bg-red-700 w-[30%] shadow-sm rounded-xl hover:scale-95 transition hover:shadow-inner"
            onClick={handleClickPosition}
            disabled={inputRef.current === null}>
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
            className="border-red-200 hover:bg-red-100/20 w-full text-red-600 hover:text-red-700 shadow-sm rounded-xl  transition hover:shadow-inner"
            onClick={handleClickCurrentPosition}>
            Current Location
          </Button>
        )}
      </div>
    </div>
  );
}

export default Locations;
