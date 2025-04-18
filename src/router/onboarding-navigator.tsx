import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingScreen } from '../screens/onboarding/OnboardingScreen';
import { OnboardingTypesScreen } from '../screens/onboarding/OnboardingTypesScreen';
import { OnboardingTestScreen } from '../screens/onboarding/OnboardingTestScreen';
import { OnboardingGoalsScreen } from '../screens/onboarding/OnboardingGoalsScreen';

export type OnboardingStackParamList = {
  OnboardingWelcome: undefined;
  OnboardingTypes: undefined;
  OnboardingTest: undefined;
  OnboardingGoals: undefined;
};

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export function OnboardingNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="OnboardingWelcome" component={OnboardingScreen} />
      <Stack.Screen name="OnboardingTypes" component={OnboardingTypesScreen} />
      <Stack.Screen name="OnboardingTest" component={OnboardingTestScreen} />
      <Stack.Screen name="OnboardingGoals" component={OnboardingGoalsScreen} />
    </Stack.Navigator>
  );
} 