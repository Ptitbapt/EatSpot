import React, {useCallback, useEffect, useMemo, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Image,
  Button,
  Alert,
  KeyboardAvoidingView,
  Platform,
  View,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
GoogleSignin.configure({
  webClientId: "517567946148-7u3f2tbc6v7k9kn4tlqem0h98skhiisr.apps.googleusercontent.com"
});

function App(): React.JSX.Element {

  const navigation = useNavigation();

  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  // Charger les données depuis le localStorage au chargement du composant
  useEffect(() => {
    setPasswordError(password.length <= 3);
  }, [password]);

  const passwordMatchError = useMemo(
    () => confirmPassword !== password && confirmPassword.length > 0,
    [password, confirmPassword],
  );
  const [isInProgress, setIsInProgress] = useState(false);


async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  try {
  await GoogleSignin.hasPlayServices();
  console.log("2")
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();
  console.log("3")

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  console.log('hihihiihi')

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
  } catch (error) {
   console.log(error);
  }

}

  const handlePress = useCallback(() => {
    if (
      password === '' ||
      confirmPassword === '' ||
      prenom === '' ||
      nom === ''
    ) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
    } else if (passwordError || passwordMatchError) {
      Alert.alert('Erreur', 'Veuillez corriger les erreurs avant de soumettre');
    } else {
      Alert.alert(
        'Bonjour',
        `Bonjour ${prenom} ${nom}, votre mot de passe est ${password}`,
      );
      navigation.navigate("RestaurantList");
    }
  }, [
    prenom,
    nom,
    password,
    confirmPassword,
    passwordError,
    passwordMatchError,
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Inscription</Text>
          <Image
            source={{
              uri: 'https://ih1.redbubble.net/image.2711124043.8255/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg',
            }}
            style={styles.profileImage}
          />
        </View>
        <TextInput
          placeholder="Prénom"
          style={styles.input}
          onChangeText={setPrenom}
          value={prenom}
          onEndEditing={() => setPrenom(prenom.trim())}
        />
        <TextInput
          placeholder="Nom"
          style={styles.input}
          onChangeText={setNom}
          value={nom}
          onEndEditing={() => setNom(nom.trim())}
        />
        <TextInput
          placeholder="Mot de passe"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
          style={[styles.input, passwordError ? styles.errorInput : null]}
          onEndEditing={() => setPassword(password.trim())}
        />
        <TextInput
          placeholder="Confirmation du mot de passe"
          secureTextEntry={true}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          style={[styles.input, passwordMatchError ? styles.errorInput : null]}
          onEndEditing={() => setConfirmPassword(confirmPassword.trim())}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Envoyer</Text>
          </TouchableOpacity>
        </View>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={onGoogleButtonPress}
          disabled={isInProgress}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

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

export default App;
