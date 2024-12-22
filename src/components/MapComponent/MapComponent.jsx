import React, { useState } from "react";
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";

const MapComponent = ({ lat, lng, lat2, lng2 }) => {
  const [directions, setDirections] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAsFOFVKFnQQPiDWyi8hrenBVpbgikm32Q",
  });

  if (!isLoaded) return <div>Loading...</div>;

  // Static coordinates for testing
  const pickupCoordinates = { lat: lat, lng: lng }; // San Francisco
  const dropoffCoordinates = { lat: lat2, lng: lng2 }; // Los Angeles
  const getCenterCoordinates = (pickup, dropoff) => {
    const lat = (lat + lat2) / 2;
    const lng = (lng + lng2) / 2;
    return { lat, lng };
  };

  return (
    <GoogleMap
      // center={getCenterCoordinates}
      zoom={6}
      mapContainerStyle={{
        width: "100%",
        height: "250px",
        borderRadius: "10px",
      }}
    >
      {/* Pickup Marker */}
      <Marker
        position={pickupCoordinates}
        icon={{
          url: "https://maps.google.com/mapfiles/kml/shapes/red-pushpin.png",
        }}
      />

      {/* Dropoff Marker */}
      <Marker
        position={dropoffCoordinates}
        icon={{
          url: "https://maps.google.com/mapfiles/kml/shapes/green-pushpin.png",
        }}
      />
      <DirectionsService
        options={{
          origin: pickupCoordinates,
          destination: dropoffCoordinates,
          travelMode: "DRIVING",
        }}
        callback={(result, status) => {
          if (status === "OK") {
            setDirections(result);
          } else {
            console.error("Directions request failed:", status);
          }
        }}
      />
      {/* Route (Polyline) */}
      {directions && <DirectionsRenderer directions={directions} />}
      {/* <Polyline
        path={[pickupCoordinates, dropoffCoordinates]}
        
        options={{
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 4,
        }}
      /> */}
    </GoogleMap>
  );
};

export default MapComponent;
