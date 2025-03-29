import React, { useEffect, useState } from 'react';
import Places from './Places.jsx';
import ErrorMessage from './Error.jsx';
import {sortPlacesByDistance} from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  // http://localhost:3000 is running backend server from backend folder

  /* useEffect(() => {
    fetch('http://localhost:3000/places').then((response) => {
      return response.json();
    }).then((resData) => {
        setAvailablePlaces(resData.places); 
    });
  }, []);*/ // because of the empty array the useEffect will only run once after the component function executes

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude);
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });

        
      } catch(error) {
        setError({message: error.message || 'Could not fetch places, please try again later.'});
      }
    
    }

    fetchPlaces();
  }, []);

  if (error) {
    return <ErrorMessage title="An error occurred!" message={error.message} />
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data.."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
