import React from 'react';
import { SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import Details from './screens/Details'; 

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
       <Details />
      {/* <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        {}
      </KeyboardAvoidingView> */}
    </SafeAreaView>
  );
};

export default App;

