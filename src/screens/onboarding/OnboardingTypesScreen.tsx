import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { Ionicons } from '@expo/vector-icons';

import Typography from '../../shared/components/typography';
import { useTheme } from '../../shared/hooks/use-theme';
import { useStore } from '../../provider';
import { AppStackParamList } from '../../router/app-navigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<AppStackParamList, 'OnboardingTypes'>;

export const OnboardingTypesScreen = observer(() => {
  const navigation = useNavigation<NavigationProp>();
  const { taskStore } = useStore();
  const { colors } = useTheme();

  const handleTypeSelect = (type: string) => {
    taskStore.setSelectedType(type);
    navigation.navigate('OnboardingTest');
  };

  const renderTypeCard = (type: string, icon: string, description: string) => (
    <TouchableOpacity
      style={[styles.typeCard, { backgroundColor: colors.card }]}
      onPress={() => handleTypeSelect(type)}
    >
      <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
        <Ionicons name={icon as any} size={32} color={colors.primary} />
      </View>
      <Typography style={StyleSheet.flatten(styles.typeTitle)}>{type}</Typography>
      <Typography style={StyleSheet.flatten([styles.typeDescription, { color: colors.text02 }])}>
        {description}
      </Typography>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Typography style={StyleSheet.flatten(styles.title)}>Выберите тип задач</Typography>
        <Typography style={StyleSheet.flatten([styles.subtitle, { color: colors.text02 }])}>
          Выберите тип задач, которые вы хотите отслеживать
        </Typography>

        <View style={styles.typesContainer}>
          {renderTypeCard(
            'Работа',
            'briefcase',
            'Задачи, связанные с вашей профессиональной деятельностью'
          )}
          {renderTypeCard(
            'Здоровье',
            'fitness',
            'Задачи для поддержания физического и психического здоровья'
          )}
          {renderTypeCard(
            'Отношения',
            'people',
            'Задачи для развития отношений с близкими людьми'
          )}
          {renderTypeCard(
            'Развитие',
            'school',
            'Задачи для личностного роста и обучения'
          )}
          {renderTypeCard(
            'Досуг',
            'game-controller',
            'Задачи для отдыха и развлечений'
          )}
        </View>
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
  typesContainer: {
    gap: 16,
  },
  typeCard: {
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  typeTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  typeDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
}); 