import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, SafeAreaView, Alert } from "react-native";
import { observer } from "mobx-react-lite";
import { useStore } from "../../provider";
import { useTheme } from "../../shared/hooks/use-theme";
import Typography from "../../shared/components/typography";
import useTranslate from "../../shared/localization/use-translate";
import { queryMistralAI } from "@/src/shared/api/ai";
// Импорт новых карточек
import { HappinessLevelCard } from "./components/HappinessLevelCard";
import { AIAnalysisCard } from "./components/AIAnalysisCard";
import { RecommendationCard } from "./components/RecommendationCard";
import { BoosterGrid } from "./components/BoosterGrid";
import { FooterAnalysis } from "./components/FooterAnalysis";
import { Ionicons } from "@expo/vector-icons";

export const AiInsightScreen = observer(() => {
  const { taskStore } = useStore();
  const { colors } = useTheme();
  const { translate } = useTranslate();
  const [isLoading, setIsLoading] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState<'pending' | 'complete'>('pending');
  const [insight, setInsight] = useState('');
  const [randomAdvice, setRandomAdvice] = useState('');
  const [isCooldown, setIsCooldown] = useState(false);
  const [nextAnalysis, setNextAnalysis] = useState('Завтра в 9:00');

  useEffect(() => {
    taskStore.fetchTasks();
  }, []);

  const happinessLevel = Math.min(10, Math.max(0, 7.2 + (taskStore.completedTasks.length - 2) * 0.2));
  const happinessDescription = happinessLevel >= 8
    ? "Отличный баланс!"
    : happinessLevel >= 6
    ? "Хороший баланс! Есть куда расти"
    : "Время добавить больше радости и смысла!";

  const recommendations = [
    {
      title: "Эвдемонические задачи",
      description: "Добавьте новое хобби или волонтёрство для большего смысла.",
      status: "Priority" as const,
      color: "#6C7AF2",
      boost: "+1.3",
    },
    {
      title: "Гедонические задачи",
      description: "Запланируйте приятное событие на выходных.",
      status: "Good" as const,
      color: "#F26CA7",
      boost: undefined,
    },
    {
      title: "Ментальное здоровье",
      description: "Добавьте дыхательные упражнения или прогулку на природе.",
      status: "Improve" as const,
      color: "#6CF2B2",
      boost: "+0.8",
    },
    {
      title: "Приоритет недели",
      description: "Сфокусируйтесь на 1-2 эвдемонических задачах.",
      status: "Priority" as const,
      color: "#FFD36C",
      boost: "+1.1",
    },
  ];

  const boosters = [
    {
      icon: "sunny-outline" as keyof typeof Ionicons.glyphMap,
      label: "Погреться на солнце",
      color: "#FFF7D6",
      effect: "+0.2 boost",
      onPress: () => Alert.alert("Совет", "Выйдите на улицу и подышите свежим воздухом!"),
    },
    {
      icon: "walk-outline" as keyof typeof Ionicons.glyphMap,
      label: "Прогуляться",
      color: "#E6F0FF",
      effect: "+0.3 boost",
      onPress: () => Alert.alert("Совет", "Сделайте короткую прогулку!"),
    },
    {
      icon: "medkit-outline" as keyof typeof Ionicons.glyphMap,
      label: "5 мин. медитации",
      color: "#E6FFE6",
      effect: "+0.4 boost",
      onPress: () => Alert.alert("Совет", "Попробуйте дыхательную практику!"),
    },
    {
      icon: "call-outline" as keyof typeof Ionicons.glyphMap,
      label: "Позвонить другу",
      color: "#FFE6E6",
      effect: "+0.5 boost",
      onPress: () => Alert.alert("Совет", "Свяжитесь с близким человеком!"),
    },
  ];

  // AI анализ (запрос к ИИ)
  function handleAnalyze() {
    setIsLoading(true);
    setAnalysisStatus('pending');
    queryMistralAI(JSON.stringify(taskStore.tasks))
      .then((data) => {
        setInsight(data?.insight || "У вас здоровый фундамент, но можно добавить больше осмысленных активностей.");
        setAnalysisStatus('complete');
      })
      .catch(() => {
        setInsight("Ошибка анализа. Попробуйте позже.");
        setAnalysisStatus('pending');
      })
      .finally(() => setIsLoading(false));
  }

  // Рандомный совет (пример)
  function handleRandomAdvice() {
    const advices = [
      "Попробуйте новое хобби!",
      "Позвоните другу прямо сейчас!",
      "Сделайте короткую медитацию.",
      "Погуляйте на свежем воздухе.",
      "Запланируйте приятное событие!",
    ];
    setRandomAdvice(advices[Math.floor(Math.random() * advices.length)]);
  }

  // Повторный анализ (футер)
  function handleReanalyze() {
    if (!isCooldown) handleAnalyze();
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}> 
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Карточка уровня счастья */}
        <HappinessLevelCard happinessLevel={happinessLevel} description={happinessDescription} />

        {/* AI анализ */}
        <AIAnalysisCard
          status={analysisStatus}
          insight={insight || "Анализируйте задачи для персональных рекомендаций!"}
          onAnalyze={handleAnalyze}
          isLoading={isLoading}
        />

        <Typography style={styles.sectionTitle}>Персональные рекомендации</Typography>
        {recommendations.map((rec, i) => (
          <RecommendationCard key={i} {...rec} />
        ))}

        {/* <Typography style={styles.sectionTitle}>Быстрые бустеры счастья</Typography>
        <BoosterGrid boosters={boosters} /> */}
      </ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    padding: 24,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: "#666666",
  },
  chartContainer: {
    padding: 24,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 24,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#999999",
    textAlign: "center",
  },
  trendsContainer: {
    padding: 24,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
  },
  trendsTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 24,
  },
  trendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
  },
  trendInfo: {
    marginLeft: 16,
    flex: 1,
  },
  trendLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
    marginBottom: 4,
  },
  trendValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 16,
    color: "#7B7B7B",
    marginBottom: 16,
  },
  categoryCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    backgroundColor: "#F5F6FA",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },
  categorySubtitle: {
    fontSize: 14,
    color: "#7B7B7B",
  },
  categoryPercent: {
    fontSize: 24,
    fontWeight: "700",
    marginLeft: 8,
  },
  progressBarBg: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E5E5E5",
    marginVertical: 8,
    overflow: "hidden",
  },
  progressBarFill: {
    height: 8,
    borderRadius: 4,
  },
  categoryAdvice: {
    fontSize: 13,
    color: "#B36C6C",
    marginTop: 8,
  },
  randomAdvice: {
    fontSize: 15,
    color: "#6C7AF2",
    marginBottom: 8,
    textAlign: "center",
  },
  forecastBlock: {
    padding: 24,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
  },
  forecastTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 16,
  },
});
