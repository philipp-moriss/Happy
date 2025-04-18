import React from 'react';
import { StyleSheet, View, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';

import { useStore } from '../../provider';
import Typography from '../../shared/components/typography';
import useTheme from '../../shared/hooks/use-theme/use-theme';
import { AppStackParamList } from '../../router/app-navigator';

type NavigationProp = NativeStackNavigationProp<AppStackParamList, 'Onboarding'>;

interface Styles {
  container: ViewStyle;
  content: ViewStyle;
  title: TextStyle;
  description: TextStyle;
  button: ViewStyle;
  buttonText: TextStyle;
}

export const OnboardingScreen = observer(() => {
  const navigation = useNavigation<NavigationProp>();
  const { taskStore } = useStore();
  const colors = useTheme().colors;

  const handleGetStarted = () => {
    taskStore.completeOnboarding();
    navigation.navigate('Main');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg01 }]}>
      <View style={styles.content}>
        <Typography style={StyleSheet.flatten(styles.title)}>
          Добро пожаловать в Happy!
        </Typography>
        <Typography style={StyleSheet.flatten(styles.description)}>
          Ваш персональный помощник для достижения целей и выполнения задач
        </Typography>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleGetStarted}
        >
          <Typography style={StyleSheet.flatten(styles.buttonText)}>
            Начать
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    color: '#666666',
  },
  button: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
}); 