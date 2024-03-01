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
import styles from './../styles/LoginFormStyle';

import { validatePassword } from '../utils/Validation';
GoogleSignin.configure({
  webClientId: "517567946148-7u3f2tbc6v7k9kn4tlqem0h98skhiisr.apps.googleusercontent.com"
});

const LoginForm = () => {
  const navigation = useNavigation();

  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);

  // Charger les données depuis le localStorage au chargement du composant
  
  useEffect(() => {
    // La condition vérifie maintenant si le mot de passe correspond à l'expression régulière
    setPasswordError(!validatePassword.test(password));
    console.log('passwordError', passwordError);
  }, [password]);
  
  // Utilisez useMemo pour vérifier si les mots de passe correspondent et s'ils sont conformes à l'expression régulière
  const passwordMatchError = useMemo(
    () => {
      // La condition vérifie la correspondance des mots de passe et utilise également la regex pour la validation
      const isPasswordValid = validatePassword.test(password);
      return !isPasswordValid || (confirmPassword !== password && confirmPassword.length > 0);
    },
    [password, confirmPassword],
  );


  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);
  
      if (userCredential.user.displayName) {
        // Si displayName existe, continuez avec le traitement original
        console.log(`Nom complet: ${userCredential.user.displayName}`);
  
        // Séparer le displayName en prénom et nom, si possible
        const fullName = userCredential.user.displayName.split(' ');
        const prenom = fullName[0]; // Prendre le premier élément comme prénom
        const nom = fullName.length > 1 ? fullName.slice(1).join(' ') : ''; // Prendre le reste comme nom
  
        // Afficher le prénom et le nom dans le console log
        console.log(`Prénom: ${prenom}, Nom: ${nom}`);
      } else {
        // Si displayName n'existe pas, gérez ce cas
        console.log("L'utilisateur n'a pas de nom d'affichage disponible.");
        // Vous pouvez choisir de définir des valeurs par défaut ou de gérer ce cas d'une autre manière
      }
  
      navigation.navigate('RestaurantList', {
        userName: userCredential.user.displayName ? userCredential.user.displayName : "Utilisateur anonyme",
      });
    } catch (error) {
      console.error('Sign in with Google failed:', error);
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
    } else if (passwordError || passwordMatchError) { //passwordError et passwordMatchError sont tout le temps true
      Alert.alert('Erreur', 'Veuillez corriger les erreurs avant de soumettre');
    } else {
      Alert.alert(
        'Bonjour',
        `Bonjour ${prenom} ${nom}, votre mot de passe est ${password}`,
      );
      navigation.navigate('RestaurantList');
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

export default LoginForm;
