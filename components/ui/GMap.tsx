"use client";
import React, { MutableRefObject } from "react";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  Libraries,
} from "@react-google-maps/api";
import { useOrigin } from "@/lib/contexts";
import { DropletsIcon } from "lucide-react";

interface MapProps {
  origin: { lat: number; lng: number };
  setOrigin: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }>>;
  mapRef: MutableRefObject<google.maps.Map | undefined>;
}

function GMap({ origin, setOrigin, mapRef }: MapProps) {
  const center = useMemo(() => {
    return origin;
  }, [origin]);

  const { banksCoords } = useOrigin();

  const [libraries] = useState<Libraries>(["places"]);

  const mapsKey = String(process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos: GeolocationPosition) => {
      setOrigin({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  }, [setOrigin]);

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

  return <Map center={center} mapRef={mapRef} banksCoords={banksCoords} />;
}
function Map({
  center,
  mapRef,
  banksCoords,
}: {
  center: { lat: number; lng: number };
  mapRef: MutableRefObject<google.maps.Map | undefined>;
  banksCoords: Array<{
    name: string;
    coordinates: { lat: number; lng: number };
    bloodTypes: {
      Ap: number;
      An: number;
      Bp: number;
      Bn: number;
      ABp: number;
      ABn: number;
      Op: number;
      On: number;
    };
    address: {
      street: string;
      city: string;
      state: string;
      zip: number;
    };
    phone: number;
    timings: {
      open: string;
      close: string;
      off: string;
    };
    sectors: string;
  }>;
}) {
  console.log(banksCoords);
  const options = useMemo(() => {
    return {
      mapId: "614bf3814cdd19f4",
      maxZoom: 19,
      minZoom: 12,
    };
  }, []);
  return (
    <>
      <GoogleMap
        center={center}
        zoom={13}
        mapContainerStyle={{ width: "100%", height: "100%", margin: "0 0 " }}
        onLoad={useCallback(
          (map: google.maps.Map) => {
            mapRef.current = map;
          },
          [mapRef]
        )}
        options={options}>
        <Marker position={center} animation={google.maps.Animation.DROP} />

        {banksCoords.map((bank) => {
          console.log(bank);
          return (
            <>
              <Marker
                position={bank?.coordinates}
                animation={google.maps.Animation.DROP}
                title={bank?.name}
                label={bank?.name}
                clickable={true}
              />
            </>
          );
        })}
      </GoogleMap>
    </>
  );
}
export default GMap;
