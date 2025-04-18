import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { HomeScreen } from '../screens/home';

const Stack = createNativeStackNavigator();

export function RootStack() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false,
    }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
