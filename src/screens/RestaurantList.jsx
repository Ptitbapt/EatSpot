import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
//import MapView, { Marker } from 'react-native-maps';
//import MapComponent from './MapComponent';

import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';


const saveDataJson = async (jsonname, data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(jsonname, jsonValue);
  } catch (e) {
    console.log(e);
  }
}

const getDataJson = async (jsonname) => {
  try {
    const jsonValue = await AsyncStorage.getItem(jsonname);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

const RestaurantList = () => {
  
    const navigation = useNavigation();

    const [restaurants, setRestaurants] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('all');
    const [userLocation, setUserLocation] = useState({ });
    const [ArrayFavorites, setArrayFavorites] = useState([]);
    const requestLocationPermission = async () => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          ]);
          
          if (
            granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED &&
            granted['android.permission.ACCESS_COARSE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
          ) {
            console.log('Autorisation accordée');
            // Vous pouvez maintenant récupérer la géolocalisation
            Geolocation.getCurrentPosition(
              (position) => {
                setUserLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude })
              },
              (error) => {
                console.error('Erreur de géolocalisation:', error);
              },
              { enableHighAccuracy: true, timeout: 150000, maximumAge: 10000 }
            );
          } else {
            Alert.alert(
              'Permission refusée',
              'Cette application a besoin d\'accéder à votre localisation pour fonctionner.',
              [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
            );
          }
        }
      } catch (err) {
        console.warn(err);
      }
    };

    // use user's location and ask for permission

    const fetchRestaurants = async () => {
      const API_KEY = 'fsq3zYYs8PG4sj2b6qC+h+63+11H8KZkdNn94kI3Mrc+9i8=';
      const API_URL = 'https://api.foursquare.com/v3/places/search';

      try {
        const searchParams = new URLSearchParams({
          query: searchQuery, 
          ll: userLocation ? `${userLocation.latitude},${userLocation.longitude}` : '48.8566,2.3522',
          //open_now: 'true',
          sort: 'DISTANCE',
          limit: '5',
          categoryId: selectedType === 'all' ? '' : selectedType ,
        });

        const results = await fetch(
          `${API_URL}?${searchParams}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              Authorization: API_KEY,
            }
          }
        );

        const data = await results.json();
        if (data && data.results) {
          const extractedRestaurants = await Promise.all(data.results.map(async (result) => {
            const photosResponse = await fetch(
              `https://api.foursquare.com/v3/places/${result.fsq_id}/photos`,
              {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  Authorization: API_KEY,
                }
              }
            );

            const photosData = await photosResponse.json();
            const photoURLs = photosData.map(item => item.prefix + 'original' + item.suffix);
            const firstPhotoURL = photoURLs[0];
            
            return {
              id: result.fsq_id,
              name: result.name,
              address: result.location.formatted_address,
              distance: result.distance,
              categories: result.categories,
              status: result.closed_bucket,
              city: result.location.locality,
              country: result.location.country,
              region: result.location.region,
              url: firstPhotoURL,
            };
          }));

          setRestaurants(extractedRestaurants);
        } else {
          console.error('Response format is incorrect:', data);
        }
      } catch (err) {
        console.error(err);
      }
    }; 
  useEffect(() => {
    requestLocationPermission()
    getDataJson('favorites').then((data) => {
      setArrayFavorites(data);
      console.log("favorite", data);
    }); 
  }, []);

  const renderRestaurantItem = ({ item }) => (
    <View style={styles.restaurantItem}>
      <Text style={styles.restaurantName}>
        {item.name}
        {item.isFavorite && <MaterialIcons name="favorite" size={24} color="red" style={styles.favoriteIcon} />}
      </Text>
      <Text style={styles.restaurantAddress}>{item.city}</Text>
      <Text style={styles.restaurantDistance}>{item.distance/1000} kms away</Text>
      <Image source={{ uri: item.url }} style={styles.image} />
      {/* Bouton de favoris */}
      <TouchableOpacity onPress={() => navigation.navigate('Details', {details: item})}>
        <Text style={styles.favoriteButton}>Add to Favorites</Text>
      </TouchableOpacity>
    </View>
  );



  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for restaurants..."
        onChangeText={(text) => setSearchQuery(text)}
        onEndEditing={fetchRestaurants}
      />
      <FlatList
        data={restaurants}
        keyExtractor={(restaurant) => restaurant.id}
        renderItem={renderRestaurantItem}
        style={{flex:1}}
      />
    
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  restaurantItem: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  restaurantAddress: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  restaurantDistance: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  favoriteButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
    marginTop: 10,
    textAlign: 'center',
  },
  favoriteIcon: {
    marginLeft: 5,
  },

  
});

export default RestaurantList;

