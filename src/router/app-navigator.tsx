import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainNavigator } from './main-navigator';
import { OnboardingScreen } from '../screens/onboarding/OnboardingScreen';
import { OnboardingTypesScreen } from '../screens/onboarding/OnboardingTypesScreen';
import { OnboardingGoalsScreen } from '../screens/onboarding/OnboardingGoalsScreen';
import { OnboardingTestScreen } from '../screens/onboarding/OnboardingTestScreen';
import { ProfileNavigator } from './profile-navigator';
import useTranslate from '../shared/localization/use-translate';
import useUpdate from '../shared/hooks/useUpdate';

export type AppStackParamList = {
  Main: undefined;
  Profile: undefined;
  Onboarding: undefined;
  OnboardingTypes: undefined;
  OnboardingGoals: undefined;
  OnboardingTest: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppNavigator() {
  // TODO: Добавить проверку, прошел ли пользователь онбординг
  const isFirstLaunch = true;

  const { setUpLanguage } = useTranslate();

  useUpdate()

  useEffect(() => {
    setUpLanguage();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={MainNavigator} />
      <Stack.Screen name="Profile" component={ProfileNavigator} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="OnboardingTypes" component={OnboardingTypesScreen} />
      <Stack.Screen name="OnboardingGoals" component={OnboardingGoalsScreen} />
      <Stack.Screen name="OnboardingTest" component={OnboardingTestScreen} />
    </Stack.Navigator>
  );
} 