// Geocoding (Address to Coordinates):
export const geocode = async (searchText) => {
    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchText)}.json?access_token=${mapboxgl.accessToken}`);
    const data = await response.json();
    return data.features[0].center; // Returns the center coordinates of the first result.
  };
// Reverse Geocoding (Coordinates to Address):
  const reverseGeocode = async (coordinates) => {
    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?access_token=${mapboxgl.accessToken}`);
    const data = await response.json();
    return data.features[0].place_name; // Returns the place name of the first result.
  };