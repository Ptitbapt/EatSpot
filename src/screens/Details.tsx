import React, { useCallback, useState } from 'react';
import styles from './../styles/DetailsStyle'
import {SafeAreaView, View, Text, Image, TouchableOpacity, ScrollView, FlatList} from 'react-native';

const Details = () => {

  const fav = false;
  const [isFavorite, setIsFavorite] = useState(fav);
  const [isOpen, setIsOpen] = useState(true)

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
      <ScrollView>
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
            <Text style={styles.text}>Credit card : yes</Text>
          </View>
        </View>
        <Text style={styles.title}>Menu</Text>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.text}>Lunch</Text>
            <FlatList></FlatList>
          </View>
          <View style={styles.column}>
            <Text style={styles.text}>Dinner</Text>
            <FlatList></FlatList>
          </View>
          <View style={styles.column}>
            <Text style={styles.text}>Dessert</Text>
            <FlatList></FlatList>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Details;
