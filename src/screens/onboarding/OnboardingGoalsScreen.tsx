import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { Ionicons } from '@expo/vector-icons';

import Typography from '../../shared/components/typography';
import useTheme from "@/src/shared/hooks/use-theme/use-theme";
import { useStore } from '../../provider';
import { OnboardingStackParamList } from '../../router/onboarding-navigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'OnboardingGoals'>;

const goals = [
  {
    id: '1',
    title: 'Улучшить физическое здоровье',
    description: 'Регулярные тренировки и правильное питание',
  },
  {
    id: '2',
    title: 'Развивать карьеру',
    description: 'Профессиональный рост и новые навыки',
  },
  {
    id: '3',
    title: 'Улучшить отношения',
    description: 'Больше времени с близкими и новые знакомства',
  },
  {
    id: '4',
    title: 'Изучить новый язык',
    description: 'Регулярные занятия и практика',
  },
  {
    id: '5',
    title: 'Начать медитировать',
    description: 'Ежедневная практика осознанности',
  },
  {
    id: '6',
    title: 'Читать больше книг',
    description: 'Минимум 1 книга в месяц',
  },
];

export const OnboardingGoalsScreen = observer(() => {
  const navigation = useNavigation<NavigationProp>();
  const { taskStore } = useStore();
  const { colors } = useTheme();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const handleGoalToggle = (goalId: string) => {
    setSelectedGoals(prev => {
      if (prev.includes(goalId)) {
        return prev.filter(id => id !== goalId);
      }
      if (prev.length < 5) {
        return [...prev, goalId];
      }
      return prev;
    });
  };

  const handleFinish = () => {
    taskStore.setSelectedGoals(selectedGoals);
    navigation.navigate('Main');
  };

  const renderGoalCard = (goal: typeof goals[0]) => {
    const isSelected = selectedGoals.includes(goal.id);
    const cardStyle = [
      styles.goalCard,
      { backgroundColor: colors.bg02 },
      isSelected && { borderColor: colors.primary, borderWidth: 2 },
    ];

    return (
      <TouchableOpacity
        key={goal.id}
        style={cardStyle}
        onPress={() => handleGoalToggle(goal.id)}
      >
        <View style={styles.goalContent}>
          <View style={[styles.checkbox, { borderColor: colors.bg03 }]}>
            {isSelected && (
              <Ionicons name="checkmark" size={20} color={colors.primary} />
            )}
          </View>
          <View style={styles.goalInfo}>
            <Typography style={styles.goalTitle}>{goal.title}</Typography>
            <Typography style={[styles.goalDescription, { color: colors.text02 }]}>
              {goal.description}
            </Typography>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg01 }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Typography style={styles.title}>Выберите цели</Typography>
        <Typography style={[styles.subtitle, { color: colors.text02 }]}>
          Выберите 3-5 целей, которые вы хотите достичь
        </Typography>

        <View style={styles.goalsContainer}>
          {goals.map(renderGoalCard)}
        </View>

        <TouchableOpacity
          style={[
            styles.finishButton,
            {
              backgroundColor: colors.primary,
              opacity: selectedGoals.length >= 3 && selectedGoals.length <= 5 ? 1 : 0.5,
            },
          ]}
          onPress={handleFinish}
          disabled={selectedGoals.length < 3 || selectedGoals.length > 5}
        >
          <Typography style={styles.finishButtonText}>
            Завершить ({selectedGoals.length}/5)
          </Typography>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  goalsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  goalCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  goalContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  goalDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  finishButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  finishButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 