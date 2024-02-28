import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: 'white',
    },
    backImage: {
      height: 150,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
    },
    button: {
      backgroundColor: 'lightgrey',
      width: 100,
      height: 50,
      borderRadius: 30
    },
    textButton: {
      textAlign: 'center',
      marginTop: 'auto',
      marginBottom: 'auto',
    },
    favorite: {
      width: 35,
      height: 35,
    },
    favoriteImg: {
      flex: 1,
      width: 35,
      height: 35,
    },
    title: {
      color: 'black',
      fontSize: 24,
      textAlign: 'center',
    },
    text: {
      color: 'black',
      fontSize: 18,
      textAlign: 'center',
    },
    open: {
      color: 'green',
      fontSize: 18,
      textAlign: 'center',
    },
    closed: {
      color: 'red',
      fontSize: 18,
      textAlign: 'center',
    },
    row: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    column: {
      flex: 1,
      flexDirection: 'column',
      paddingTop: 50,
    }

  });

module.exports = styles