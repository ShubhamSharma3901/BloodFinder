"use client";
import {
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { Autocomplete } from "@react-google-maps/api";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { useState } from "react";

export default function Overlays({
  map,
  setOrigin,
  originRef,
}: {
  map: google.maps.Map;
}) {
  function handleClickPosition() {
    console.log(originRef.current.childNodes[0].value);
    geocodeByAddress(originRef.current.childNodes[0].value)
      .then((results) => {
        getLatLng(results[0]).then(({ lat, lng }) => {
          setOrigin({ lat, lng });
          map?.panTo({ lat, lng });
          map?.setZoom(15);
        });
      })
      .catch((error) => console.error(error));
  }

  function handleMouseDownPosition(event) {
    event.preventDefault();
  }

  function handleClickCurrentPosition() {
    navigator.geolocation.getCurrentPosition((pos) => {
      setOrigin({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });
  }
  return (
    <Paper
      elevation={4}
      sx={{ margin: "0 0", height: "auto", position: "absolute", top: "0" }}>
      <Autocomplete>
        <FormControl sx={{ m: 1, width: "50ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment">
            Enter Location Manually
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment"
            ref={originRef}
            type={"text"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickPosition}
                  onMouseDown={handleMouseDownPosition}
                  edge="end">
                  {<GpsFixedIcon />}
                </IconButton>
              </InputAdornment>
            }
            label="Enter Location Manually"
          />
        </FormControl>
      </Autocomplete>
      <IconButton
        onClick={handleClickCurrentPosition}
        onMouseDown={handleMouseDownPosition}>
        {<GpsFixedIcon />}
      </IconButton>
    </Paper>
  );
}
