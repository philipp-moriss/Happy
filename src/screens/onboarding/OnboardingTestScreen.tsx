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

type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'OnboardingTest'>;

const questions = [
  {
    id: '1',
    question: 'Как часто вы занимаетесь физическими упражнениями?',
    options: [
      { id: '1', text: 'Ежедневно' },
      { id: '2', text: '2-3 раза в неделю' },
      { id: '3', text: 'Раз в неделю' },
      { id: '4', text: 'Редко или никогда' },
    ],
  },
  {
    id: '2',
    question: 'Сколько времени вы уделяете саморазвитию?',
    options: [
      { id: '1', text: 'Более 10 часов в неделю' },
      { id: '2', text: '5-10 часов в неделю' },
      { id: '3', text: '2-5 часов в неделю' },
      { id: '4', text: 'Менее 2 часов в неделю' },
    ],
  },
  {
    id: '3',
    question: 'Как вы оцениваете качество своего сна?',
    options: [
      { id: '1', text: 'Отлично, всегда высыпаюсь' },
      { id: '2', text: 'Хорошо, но иногда не высыпаюсь' },
      { id: '3', text: 'Плохо, часто не высыпаюсь' },
      { id: '4', text: 'Очень плохо, почти не сплю' },
    ],
  },
];

export const OnboardingTestScreen = observer(() => {
  const navigation = useNavigation<NavigationProp>();
  const { taskStore } = useStore();
  const { colors } = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (questionId: string, answerId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerId,
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      taskStore.setTestAnswers(answers);
      navigation.navigate('OnboardingGoals');
    }
  };

  const renderQuestion = (question: typeof questions[0]) => {
    const isSelected = (optionId: string) => answers[question.id] === optionId;

    return (
      <View key={question.id} style={styles.questionContainer}>
        <Typography style={styles.questionText}>
          {question.question}
        </Typography>

        <View style={styles.optionsContainer}>
          {question.options.map(option => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionButton,
                { backgroundColor: colors.bg02 },
                isSelected(option.id) && { borderColor: colors.primary, borderWidth: 2 },
              ]}
              onPress={() => handleAnswer(question.id, option.id)}
            >
              <View style={styles.optionContent}>
                <View style={[styles.radio, { borderColor: colors.bg03 }]}>
                  {isSelected(option.id) && (
                    <View style={[styles.radioInner, { backgroundColor: colors.primary }]} />
                  )}
                </View>
                <Typography style={styles.optionText}>
                  {option.text}
                </Typography>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg01 }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Typography style={styles.title}>Тест на баланс</Typography>
        <Typography style={[styles.subtitle, { color: colors.text02 }]}>
          Ответьте на несколько вопросов, чтобы мы могли лучше понять ваши потребности
        </Typography>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                  backgroundColor: colors.primary,
                },
              ]}
            />
          </View>
          <Typography style={styles.progressText}>
            Вопрос {currentQuestion + 1} из {questions.length}
          </Typography>
        </View>

        {renderQuestion(questions[currentQuestion])}
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
  progressContainer: {
    marginBottom: 24,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E5EA',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    textAlign: 'center',
  },
  questionContainer: {
    marginBottom: 24,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  optionText: {
    fontSize: 16,
    flex: 1,
  },
}); 