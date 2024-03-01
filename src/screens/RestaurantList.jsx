import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import MapView, { Marker } from 'react-native-maps';
//import MapComponent from './MapComponent';

import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import styles from './../styles/RestaurantListStyle'

const saveDataJson = async (jsonname, data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(jsonname, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const getDataJson = async jsonname => {
  try {
    const jsonValue = await AsyncStorage.getItem(jsonname);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};


const RestaurantList = () => {
  const route = useRoute();
  const userName = route.params?.userName || 'Utilisateur anonyme';

    const navigation = useNavigation();

    const [restaurants, setRestaurants] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [userLocation, setUserLocation] = useState({ });
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
      }
      catch (err) {
        console.warn(err);
      }
    };

    useEffect(() => {
      requestLocationPermission();
      getDataJson('favorites').then(data => {
        setArrayFavorites(data);
        console.log('favorite', data);
      });
    }, []);

    // use user's location and ask for permission


  const fetchRestaurants = async () => {
    const API_KEY = 'fsq3zYYs8PG4sj2b6qC+h+63+11H8KZkdNn94kI3Mrc+9i8=';
    const API_URL = 'https://api.foursquare.com/v3/places/search';

      try {
        const coords = userLocation.latitude + ',' + userLocation.longitude
        const searchParams = new URLSearchParams({
          query: searchQuery, 
          ll: userLocation ? coords: '48.8566,2.3522',
          sort: 'DISTANCE',
          limit: '10',
          categories: "13000",
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
            console.log("TEST2");
            const photosResponse = await fetch(
              `https://api.foursquare.com/v3/places/${result.fsq_id}/photos`,
              {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  Authorization: API_KEY,
                },
              },
            );

            const photosData = await photosResponse.json();
            const photoURLs = photosData.map(
              item => item.prefix + 'original' + item.suffix,
            );
            const firstPhotoURL = photoURLs[0];

            return {
              id: result.fsq_id,
              name: result.name,
              distance: result.distance,
              status: result.closed_bucket,
              city: result.location.locality,
              url: firstPhotoURL,
              ItemObject:{
                id: result.fsq_id,
                name: result.name,
                address: result.location.formatted_address,
                url: firstPhotoURL,
                status: result.closed_bucket,
              }
            };
          }),
        );

        setRestaurants(extractedRestaurants);
      } else {
        console.error('Response format is incorrect:', data);
      }
    } catch (err) {
      console.error("TEST",err);
    }
  };

  const renderRestaurantItem = ({item}) => (
    <View style={styles.restaurantItem}>
      <Text style={styles.restaurantName}>
        {item.name}
      </Text>
      <Text style={styles.restaurantAddress}>{item.city}</Text>
      <Text style={styles.restaurantDistance}>{item.distance/1000} kms away</Text>
      <Image source={item.url ? { uri: item.url } : require('./../icons/404.webp')} style={item.url ? styles.image : styles.image404} />
      {/* Bouton de favoris */}
      <TouchableOpacity onPress={() => navigation.navigate('Details', {details: JSON.stringify(item.ItemObject)})}>
        <Text style={styles.favoriteButton}>See details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.userName}>Welcome {userName}</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for restaurants..."
        onChangeText={text => setSearchQuery(text)}
        onEndEditing={fetchRestaurants}
      />
      <FlatList
        data={restaurants}
        keyExtractor={restaurant => restaurant.id}
        renderItem={renderRestaurantItem}
        style={{flex: 1}}
      />
    </View>
  );
};

export default RestaurantList;
