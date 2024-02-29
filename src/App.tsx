import React from 'react';
import { SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import RestaurantList from './screens/RestaurantList'; 

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
       <RestaurantList />
      {/* <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        {}
      </KeyboardAvoidingView> */}
    </SafeAreaView>
  );
};

export default App;

