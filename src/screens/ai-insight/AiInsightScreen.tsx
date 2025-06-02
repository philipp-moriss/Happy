import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, SafeAreaView } from "react-native";
import { observer } from "mobx-react-lite";
import { useStore } from "../../provider";
import Typography from "../../shared/components/typography";
import useTranslate from "../../shared/localization/use-translate";
import { queryMistralAI } from "@/src/shared/api/ai";

import { HappinessLevelCard } from "./components/HappinessLevelCard";
import { AIAnalysisCard } from "./components/AIAnalysisCard";
import { RecommendationCard } from "./components/RecommendationCard";
import useTheme from "@/src/shared/hooks/use-theme/use-theme";
import Button from "@/src/shared/components/button";

export const AiInsightScreen = observer(() => {
  const { taskStore } = useStore();
  const { colors } = useTheme();
  const { translate } = useTranslate();
  const [isLoading, setIsLoading] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState<'idle' | 'pending' | 'complete'>('idle');
  const [insight, setInsight] = useState('');

  useEffect(() => {
    taskStore.fetchTasks();
  }, []);

  const happinessLevel = Math.min(10, Math.max(0, 7.2 + (taskStore.completedTasks.length - 2) * 0.2));
  const happinessDescription = happinessLevel >= 8
    ? translate("aiInsight.happiness.excellent")
    : happinessLevel >= 6
    ? translate("aiInsight.happiness.good")
    : translate("aiInsight.happiness.needMore");

  const recommendations = [
    {
      title: translate("aiInsight.recommendations.eudaimonic.title"),
      description: translate("aiInsight.recommendations.eudaimonic.description"),
      status: "Priority" as const,
      color: "#6C7AF2",
      boost: "+1.3",
    },
    {
      title: translate("aiInsight.recommendations.hedonic.title"),
      description: translate("aiInsight.recommendations.hedonic.description"),
      status: "Good" as const,
      color: "#F26CA7",
      boost: undefined,
    },
    {
      title: translate("aiInsight.recommendations.mental.title"),
      description: translate("aiInsight.recommendations.mental.description"),
      status: "Improve" as const,
      color: "#6CF2B2",
      boost: "+0.8",
    },
    {
      title: translate("aiInsight.recommendations.week.title"),
      description: translate("aiInsight.recommendations.week.description"),
      status: "Priority" as const,
      color: "#FFD36C",
      boost: "+1.1",
    },
  ];

  // Рандомный совет
  const advices = [
    translate("aiInsight.advices.0"),
    translate("aiInsight.advices.1"),
    translate("aiInsight.advices.2"),
    translate("aiInsight.advices.3"),
  ];
  const [randomAdvice, setRandomAdvice] = useState("");
  function handleRandomAdvice() {
    setRandomAdvice(advices[Math.floor(Math.random() * advices.length)]);
  }

  // AI анализ (запрос к ИИ)
  function handleAnalyze() {
    setIsLoading(true);
    setAnalysisStatus('pending');
    queryMistralAI(JSON.stringify(taskStore.tasks))
      .then((data) => {
        setInsight(data?.insight || translate("aiInsight.defaultInsight"));
        setAnalysisStatus('complete');
      })
      .catch(() => {
        setInsight(translate("aiInsight.error"));
        setAnalysisStatus('pending');
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg01 }]}> 
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Карточка уровня счастья */}
        <HappinessLevelCard happinessLevel={happinessLevel} description={happinessDescription} />

        {/* AI анализ */}
        <AIAnalysisCard
          status={analysisStatus}
          insight={insight || translate("aiInsight.analyzePrompt")}
          onAnalyze={handleAnalyze}
          isLoading={isLoading}
        />

        {/* Рандомный совет */}
        <Typography style={styles.randomAdvice}>{randomAdvice}</Typography>
        <View style={{ alignItems: 'center', marginBottom: 16 }}>
          <Button onPress={handleRandomAdvice}>
            <Typography>{translate("aiInsight.randomButton")}</Typography>
          </Button>
        </View>

        <Typography style={styles.sectionTitle}>{translate("aiInsight.personalRecommendations")}</Typography>
        {recommendations.map((rec, i) => (
          <RecommendationCard key={i} {...rec} />
        ))}
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
