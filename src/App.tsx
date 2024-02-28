import React from 'react';
import { SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import Login from './screens/LoginForm';

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <Login />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default App;
