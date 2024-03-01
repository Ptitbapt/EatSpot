import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: 'white',
    },
    backImage: {
      height: 300,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginBottom: 20,
    },
    button: {
      backgroundColor: 'green',
      width: 100,
      height: 50,
      borderRadius: 30,
      margin: 10,
    },
    textButton: {
      textAlign: 'center',
      fontSize: 20,
      marginTop: 'auto',
      marginBottom: 'auto',
      color: 'white',
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
      marginBottom: 20,
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
    rowRight: {
      height: 50,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(255,255,255,0.7)',
      padding: 5,
    },
    column: {
      flex: 1,
      flexDirection: 'column',
      paddingTop: 50,
    },
    share: {
      width: 35,
      height: 35,
      borderRadius: 10,
      marginRight: 20,
    },
    shareImage: {
      width: 35,
      height: 35,
    }

  });

export default styles;
