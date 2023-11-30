"use client";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  Libraries,
} from "@react-google-maps/api";
import Overlays from "./Overlays";

type origin = {
  lat: number | null;
  lng: number | null;
};

export default function GMap() {
  const [origin, setOrigin] = useState<origin>();
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

  return <Map origin={origin} setOrigin={setOrigin} />;
}
function Map({ origin, setOrigin }: any) {
  const mapRef = useRef<google.maps.Map>();

  const originRef = useRef();

  console.log(origin);

  const center = useMemo(() => {
    return origin;
  }, [origin]);

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
        onLoad={useCallback((map: google.maps.Map) => {
          mapRef.current = map;
        }, [])}
        options={options}>
        <Marker position={center} animation={google.maps.Animation.DROP} />
      </GoogleMap>
      {/* <Overlays
        map={mapRef.current}
        originRef={originRef}
        setOrigin={setOrigin}
      /> */}
    </>
  );
}
