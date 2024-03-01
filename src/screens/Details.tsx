import React, { useCallback, useEffect, useState } from 'react';
import styles from './../styles/DetailsStyle'
import {SafeAreaView, View, Text, Image, TouchableOpacity, ScrollView, FlatList, Linking, Platform, TouchableHighlight, Share, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveDataJson = async (jsonname: string, data: any) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(jsonname, jsonValue);
  } catch (e) {
    console.log(e);
  }
}

const getDataJson = async (jsonname: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(jsonname);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

const GetTime = () => {
  var date = new Date();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return hour.toString() +"h"+ minute.toString() +"m"+ second.toString()+"s";
}

const Details = () => {

  const [details, setDetails] = useState({id:GetTime(), name:"string", address:"string", status:true, favorite:false, categories:[]});
  const [listFavorites, setListFavorites] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      // const data = await getDataJson('details');
      const data = {id:GetTime(), name:"string", address:"string", status:true, favorite:false, categories:[]};
      setDetails(data);
      const favorites = await getDataJson('favorites');
      setListFavorites(favorites);
    };
    fetchData();
  }, []);

  // favorites = [Details, Details, Details, ...]
  const onfavoriClick = async () => {
    const updatedDetails = { ...details, favorite: !details.favorite };
    setDetails(updatedDetails);

    if (updatedDetails.favorite) {
      if (!listFavorites.some(item => item.id === updatedDetails.id)) {
        const updatedFavorites = [...listFavorites, updatedDetails];
        setListFavorites(updatedFavorites);
        saveDataJson('favorites', updatedFavorites);
      }
    } else {
      const updatedFavorites = listFavorites.filter(item => item.id !== updatedDetails.id);
      setListFavorites(updatedFavorites);
      saveDataJson('favorites', updatedFavorites);
    }

    saveDataJson('details', updatedDetails);
  };


  <TouchableOpacity style={styles.favorite} onPress={onfavoriClick}>
    <Image style={styles.favoriteImg} source={details.favorite ? require('./../icons/fillstar.png') : require('./../icons/emptystar.png')}></Image>
  </TouchableOpacity>
  useEffect(() => {
    console.log("details", details);
  }, [details]);

  useEffect(() => {
    console.log("listFavorites", listFavorites);
  }, [listFavorites]);

  const sendWhatsApp = useCallback( async () => {
    try {
      const result = await Share.share({
        message:
          "I recommend you the restaurant " + details.name + " located at " + details.address,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <ImageBackground style={styles.backImage} source={require('./../icons/Genshin.png')}>
        <TouchableOpacity onPress={() => {console.log("hey")}} style={styles.button}>
          <Text style={styles.textButton}>Go back</Text>
        </TouchableOpacity>
        <View style={styles.rowRight}>
          <TouchableHighlight onPress={sendWhatsApp} style={styles.share}>
            <Image source={require('./../icons/share.png')} style={styles.shareImage} />
          </TouchableHighlight>
          <TouchableOpacity style={styles.favorite} onPress={() => onfavoriClick()}>
            <Image style={styles.favoriteImg} source={details.favorite ? require('./../icons/fillstar.png') : require('./../icons/emptystar.png')}></Image>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <Text style={styles.title}>{details.name}</Text>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.text}>{details.address}</Text>
          <Text style={styles.text}>{details.categories}</Text>
        </View>
        <View style={styles.column}>
        {details.status && <Text style={styles.open}>Open</Text>}
        {!details.status && <Text style={styles.closed}>Closed</Text>}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Details;
