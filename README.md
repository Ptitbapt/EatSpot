This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

-------------------

La team de dev : Abed ADJE, Baptiste DUMOULIN, Antoine LEDIEUDEVILLE, Killian VENDEWINKELE.

EatSpot est une application permettant la recherche de restaurants proches de vous. 
Elle possède seulement 3 pages : Login, List et Details.
La page Login vous permet de vous connecter via un formulaire ou par Google.
La page List répertorie les restaurants les plus proches de vous qui sont ouverts. Un filtre par type de resto est disponible afin d'affiner votre recherche. (un filtre pour les favoris est en cours de développement)
La page Details vous permet d'avoir des infos supplémentaires sur un restaurant précis et de le mettre en favori si vous l'appréciez. (un partage à des contacts sera ajouté plus tard)

API utilisée : FourSquare API (https://location.foursquare.com/places/docs/home)

Modules utilisés : @react-native-firebase, @react-native-google-signin
