import React, { useCallback, useEffect, useState } from 'react';
import styles from './../styles/DetailsStyle'
import {SafeAreaView, View, Text, Image, TouchableOpacity, ScrollView, FlatList, Linking, Platform, TouchableHighlight, Share, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Details = (props: any) => {

  const {navigation} = props;

  const id = 0;
  const name = 'Restaurant délicieux (vraiment)';
  const address = '10 rue de la merde, 12345 Testville';
  const status = true;
  const category = 'Pizzeria';

  const [isFavorite, setIsFavorite] = useState(false);
  const [isOpen, setIsOpen] = useState(status)

  const setFavori = useCallback(async () => {
    const fav = AsyncStorage.getItem('favorite');
    if (await fav === 'true'){
      setIsFavorite(true);
    }
    else {
      setIsFavorite(false);
    }
  }, []);

  useEffect(() => {
    setFavori()
  })


  const favorite = useCallback(() => {
    if(isFavorite === true) {
      setIsFavorite(false);
      AsyncStorage.setItem('favorite', 'false')
    }
    else {
      setIsFavorite(true);
      AsyncStorage.setItem('favorite', 'true')
    }
  }, [isFavorite])

  const sendWhatsApp = useCallback( async () => {
    try {
      const result = await Share.share({
        message:
          'Resto name + address',
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
        <TouchableOpacity onPress={() => {navigation.goBack()}} style={styles.button}>
          <Text style={styles.textButton}>Go back</Text>
        </TouchableOpacity>
        <View style={styles.rowRight}>
          <TouchableHighlight onPress={sendWhatsApp} style={styles.share}>
            <Image source={require('./../icons/share.png')} style={styles.shareImage} />
          </TouchableHighlight>
          <TouchableOpacity style={styles.favorite} onPress={favorite}>
            <Image style={styles.favoriteImg} source={isFavorite ? require('./../icons/fillstar.png') : require('./../icons/emptystar.png')}></Image>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <Text style={styles.title}>{name}</Text>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.text}>{address}</Text>
          <Text style={styles.text}>{category}</Text>
        </View>
        <View style={styles.column}>
        {isOpen && <Text style={styles.open}>Open</Text>}
        {!isOpen && <Text style={styles.closed}>Closed</Text>}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Details;
