import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapComponent = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const API_KEY = 'fsq3zYYs8PG4sj2b6qC+h+63+11H8KZkdNn94kI3Mrc+9i8=';
      const API_URL = 'https://api.foursquare.com/v3/places/search';
      
      try {
    
        const response = await fetch(API_URL + '?query=restaurants&ll=48.8566,2.3522&limit=10&client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&v=YYYYMMDD');
        const data = await response.json();

        if (data && data.response && data.response.venues) {
        
          const extractedRestaurants = data.response.venues.map(venue => ({
            id: venue.id,
            name: venue.name,
            latitude: venue.location.lat,
            longitude: venue.location.lng,
            address: venue.location.address,
          }));

          setRestaurants(extractedRestaurants);
        } else {
          console.error('Response format is incorrect:', data);
        }
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {restaurants.map(restaurant => (
          <Marker
            key={restaurant.id}
            coordinate={{ latitude: restaurant.latitude, longitude: restaurant.longitude }}
            title={restaurant.name}
            description={restaurant.address}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapComponent;
