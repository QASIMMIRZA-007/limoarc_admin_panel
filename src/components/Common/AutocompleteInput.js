import Autocomplete, { usePlacesWidget } from "react-google-autocomplete"
import React from "react"

const AutocompleteInput = ({
  onPlaceSelect,
  name,
  placeholder,
  id,
  onBlur,
  onChange,
  value,
  className,
  style,
}) => {
  const handlePlaceSelect = async place => {
    try {
      const selectedPlace = place
      console.log(selectedPlace)
      const addressComponents = selectedPlace.address_components
      const country =
        addressComponents.find(comp => comp.types.includes("country"))
          ?.long_name || ""
      const countryShort =
        addressComponents.find(comp => comp.types.includes("country"))
          ?.short_name || ""
      const city =
        addressComponents.find(
          comp =>
            comp.types.includes("locality") ||
            comp.types.includes("administrative_area_level_2")
        )?.long_name || ""
      const postalCode =
        addressComponents.find(comp => comp.types.includes("postal_code"))
          ?.long_name || ""

      const latLng = {
        lat: selectedPlace.geometry.location.lat(),
        lng: selectedPlace.geometry.location.lng(),
      }

      onPlaceSelect({
        formatted_address: `${selectedPlace.name}, ${selectedPlace.formatted_address}`,
        country,
        city,
        postal_code: postalCode,
        lat: latLng.lat,
        lng: latLng.lng,
        countryShort,
      })
    } catch (error) {
      console.error("Error selecting place:", error)
    }
  }

  return (
    <Autocomplete
      onPlaceSelected={(selected, a, c) => {
        handlePlaceSelect(selected)
      }}
      debounce={300}
      apiKey="AIzaSyA07lD6jhIN2OwvpX1cXsj5NAiN3T5pDjk"
      apiOptions={{ callback: "initGoogle" }}
      // language="ja"
      options={{
        types: [],
        fields: [
          "address_components",
          "geometry.location",
          "place_id",
          "formatted_address",
          "name",
        ],
      }}
      name={name}
      placeholder={placeholder}
      id={id}
      onBlur={onBlur}
      value={value}
      onChange={onChange}
      className={className}
      style={style}
    />
  )
}

export default AutocompleteInput
