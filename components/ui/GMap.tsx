"use client";
import React, { MutableRefObject } from "react";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  Libraries,
} from "@react-google-maps/api";

interface MapProps {
  origin: {
    lat: number | null;
    lng: number | null;
  };
  setOrigin: React.Dispatch<React.SetStateAction<{}>>;
  mapRef: MutableRefObject<google.maps.Map>;
}

function GMap({ origin, setOrigin, mapRef }: MapProps) {
  const center = useMemo(() => {
    return origin;
  }, [origin]);

  const [libraries] = useState<Libraries>(["places"]);
  const mapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos: GeolocationPosition) => {
      setOrigin({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  }, []);

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

  return <Map center={center} mapRef={mapRef} />;
}
function Map({ center, mapRef }: any) {
  const options = useMemo(() => {
    return {
      mapId: "614bf3814cdd19f4",
      maxZoom: 19,
      minZoom: 16,
    };
  }, []);
  return (
    <>
      <GoogleMap
        center={center}
        zoom={17}
        mapContainerStyle={{ width: "100%", height: "100%", margin: "0 0 " }}
        onLoad={useCallback(
          (map: google.maps.Map) => {
            mapRef.current = map;
          },
          [mapRef]
        )}
        options={options}>
        <Marker position={center} animation={google.maps.Animation.DROP} />
      </GoogleMap>
    </>
  );
}
export default GMap;
