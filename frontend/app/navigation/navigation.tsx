import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login/LoginScreen';
import RegisterScreen from '../screens/Register/RegisterScreen';
import TestScreen from '../screens/TestScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  TestScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: 'Sign Up' }}
      />
      
      <Stack.Screen
        name="TestScreen"
        component={TestScreen}
      />
    </Stack.Navigator>
  );
};

export default Navigation;