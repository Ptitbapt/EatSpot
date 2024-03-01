import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    scrollView: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 30,
    },
    profileImage: {
      width: 150,
      height: 150,
      borderRadius: 75,
      marginBottom: 30,
      alignSelf: 'center',
      resizeMode: 'contain',
    },
    input: {
      width: '90%',
      height: 50,
      margin: 12,
      padding: 10,
      borderWidth: 2,
      borderRadius: 10,
      backgroundColor: 'lightgray',
      borderColor: 'gray',
      alignSelf: 'center',
    },
    buttonContainer: {
      width: '100%',
      alignItems: 'center',
      paddingTop: 20,
    },
    button: {
      width: '50%',
      height: 50,
      borderRadius: 25,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: 'gray',
    },
    buttonText: {
      color: 'gray',
      fontWeight: 'bold',
      fontSize: 16,
    },
    errorInput: {
      borderColor: 'red',
    },
  });

export default styles;