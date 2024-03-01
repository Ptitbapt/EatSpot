## Start your Application

```bash
yarn android
```

Generate APK

Step 1: Go to the root of the project in the terminal and run the below command
```bash
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
```



Step 2: Go to android directory:
```bash
cd android
```



Step 3: Now in this android folder, run this command

Mac :
```bash
./gradlew assembleDebug
```

Windows :
```bash
gradlew assembleDebug
```

-------------------

La team de dev : Abed ADJE, Baptiste DUMOULIN, Antoine LEDIEUDEVILLE, Killian VENDEWINKELE.

EatSpot est une application permettant la recherche de restaurants proches de vous. 
Elle possède 3 pages : Login, List et Details.(Une 4eme page est prévue avec la liste des restos mis en favori par l'utilisateur)
La page Login vous permet de vous connecter via un formulaire ou par Google.
La page List répertorie les restaurants les plus proches de vous qui sont ouverts.(un filtre par type de resto est en cours de développement)
La page Details vous permet d'avoir des infos supplémentaires sur un restaurant précis et de le mettre en favori si vous l'appréciez. (un partage à des contacts sera ajouté plus tard)

API utilisée : FourSquare API (https://location.foursquare.com/places/docs/home)

Modules utilisés : @react-native-firebase, @react-native-google-signin, @react-navigation, react-native-geolocation-service, react-native-maps.
