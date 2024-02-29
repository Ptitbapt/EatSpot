import React from 'react';
import { SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import Routes from './Routes'; 
import { NavigationContainer } from '@react-navigation/native';

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
      {/* <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        {}
      </KeyboardAvoidingView> */}
    </SafeAreaView>
  );
};

export default App;

