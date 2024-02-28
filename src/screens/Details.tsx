import React, { useCallback, useState } from 'react';
import styles from './../styles/DetailsStyle'
import {SafeAreaView, View, Text, Image, TouchableOpacity} from 'react-native';

const Details = () => {

  const fav = true;
  const [isFavorite, setIsFavorite] = useState(fav);
  const [isOpen, setIsOpen] = useState(false)


  const favorite = useCallback(() => {
    if(isFavorite === true) {
      setIsFavorite(false);
      console.log(isFavorite);
    }
    else {
      setIsFavorite(true);
      console.log(isFavorite);
    }
  }, [isFavorite])

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.backImage}>
        <TouchableOpacity onPress={() => {console.log("hello")}} style={styles.button}>
          <Text style={styles.textButton}>Go back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.favorite} onPress={favorite}>
          <Image style={styles.favoriteImg} source={isFavorite ? require('./../icons/fillstar.png') : require('./../icons/emptystar.png')}></Image>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Resto name</Text>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.text}>Address</Text>
          <Text style={styles.text}>Category name</Text>
        </View>
        <View style={styles.column}>
          <Text style={isOpen ? styles.open : styles.closed}>Status</Text>
          <Text style={styles.text}>Schedule</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Details;
