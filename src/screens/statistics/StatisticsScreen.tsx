import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { observer } from "mobx-react-lite";
import { useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useStore } from "../../provider";
import { useTheme } from "../../shared/hooks/use-theme";
import Typography from "../../shared/components/typography";
import { PieChart } from "../../shared/components/charts/PieChart";
import { ActivityChart } from "@/src/shared/components/charts/ActivityChart";
import useTranslate from "../../shared/localization/use-translate";
import { queryMistralAI } from "@/src/shared/api/ai";
import Button from "@/src/shared/components/button";
import { ProgressChart } from "@/src/shared/components/charts/ProgressChart";

// Компонент карточки категории
function CategoryStatCard({
  color,
  icon,
  title,
  subtitle,
  percent,
  progress,
  advice,
}: {
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  percent: number;
  progress: number;
  advice: string;
}) {
  return (
    <View style={[styles.categoryCard, { backgroundColor: color + "22" }]}>
      <View style={styles.categoryHeader}>
        <Ionicons
          name={icon}
          size={24}
          color={color}
          style={{ marginRight: 8 }}
        />
        <View>
          <Typography style={styles.categoryTitle}>{title}</Typography>
          <Typography style={styles.categorySubtitle}>{subtitle}</Typography>
        </View>
        <View style={{ flex: 1 }} />
        <Typography
          style={Object.assign({}, styles.categoryPercent, { color })}
        >
          {percent}%
        </Typography>
      </View>
      <View style={styles.progressBarBg}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${progress * 100}%`, backgroundColor: color },
          ]}
        />
      </View>
      <Typography style={styles.categoryAdvice}>{advice}</Typography>
    </View>
  );
}

// Метаданные по категориям: цвет, иконка, совет
const CATEGORY_META: Record<
  string,
  {
    color: string;
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle: string;
    advice: string;
  }
> = {
  eudaimonic: {
    color: "#6C7AF2",
    icon: "happy-outline",
    title: "Eudaimonic",
    subtitle: "Personal growth tasks",
    advice: "Need more focus on personal development",
  },
  hedonic: {
    color: "#F26CA7",
    icon: "heart-outline",
    title: "Hedonic",
    subtitle: "Pleasure & enjoyment",
    advice: "Highest category - good work-life balance",
  },
  psychological: {
    color: "#6CF2B2",
    icon: "leaf-outline",
    title: "Mental Wealth",
    subtitle: "Mindfulness & wellbeing",
    advice: "Consider adding more mindfulness activities",
  },
};

export const StatisticsScreen = observer(() => {
  const { taskStore } = useStore();
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const { translate } = useTranslate();
  const [isLoading, setIsLoading] = useState(false);
  const [statistics, setStatistics] = useState<any>(null);

  useEffect(() => {
    taskStore.fetchTasks();
  }, []);

  const colorsObject = {
    eudaimonic: "#6C7AF2",
    hedonic: "#F26CA7",
    psychological: "#6CF2B2",
  };

  const getTasksByCategory = () => {
    const tasksByCategory = taskStore.tasksByCategory;
    return Object.entries(tasksByCategory).map(([name, tasks]) => ({
      name,
      value: tasks.length,
      color: colorsObject[name as keyof typeof colorsObject] ?? "#CCCCCC",
    }));
  };

  const getCompletionRate = () => {
    const total = taskStore.tasks.length;
    const completed = taskStore.completedTasks.length;
    return total > 0 ? (completed / total) * 100 : 0;
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getStatistics = () => {
    setIsLoading(true);
    queryMistralAI(JSON.stringify(taskStore.tasks))
      .then((data) => {
        console.log(data);
        setStatistics(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const chartData = getTasksByCategory();
  const hasData = chartData.length > 0;

  // Динамически формируем статистику по категориям
  const totalTasks = taskStore.tasks.length;
  const tasksByCategory = taskStore.tasksByCategory;
  const categoryStats = Object.entries(tasksByCategory).map(([key, tasks]) => {
    const meta = CATEGORY_META[key] || {
      color: "#CCCCCC",
      icon: "help-circle-outline",
      title: key,
      subtitle: "",
      advice: "",
    };
    const percent =
      totalTasks > 0 ? Math.round((tasks.length / totalTasks) * 100) : 0;
    const progress = totalTasks > 0 ? tasks.length / totalTasks : 0;
    return {
      key,
      ...meta,
      percent,
      progress,
    };
  });

  // Функция для рандомного совета
  function getRandomAdvice() {
    const advices = categoryStats.map((c) => c.advice).filter(Boolean);
    return advices.length > 0
      ? advices[Math.floor(Math.random() * advices.length)]
      : "";
  }
  const [randomAdvice, setRandomAdvice] = useState("");

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={{ marginBottom: 16 }}>
          <Typography style={styles.title}>Statistics</Typography>
          <Typography style={styles.subtitle}>
            Task category distribution
          </Typography>
        </View>
        {categoryStats.map((cat, index) => (
          <CategoryStatCard {...cat} key={index + cat.key + "123"} />
        ))}
        <Button
          style={{ marginVertical: 8 }}
          onPress={() => setRandomAdvice(getRandomAdvice())}
        >
          <Typography>Рандом совет</Typography>
        </Button>
        {randomAdvice ? (
          <Typography style={styles.randomAdvice}>{randomAdvice}</Typography>
        ) : null}
        <View style={[styles.chartContainer, { backgroundColor: colors.card }]}>
          <Typography style={styles.chartTitle}>
            Category Distribution
          </Typography>
          {hasData ? (
            <>
              <PieChart data={chartData} />
            </>
          ) : (
            <View style={styles.emptyState}>
              <Typography style={styles.emptyStateText}>
                {translate("statistics.noData")}
              </Typography>
            </View>
          )}
        </View>
        <View style={[styles.chartContainer, { backgroundColor: colors.card }]}>
          <Typography style={styles.chartTitle}>
            {translate("statistics.activity")}
          </Typography>

          {hasData ? (
            <>
              <ActivityChart data={chartData} />
            </>
          ) : (
            <View style={styles.emptyState}>
              <Typography style={styles.emptyStateText}>
                {translate("statistics.noData")}
              </Typography>
            </View>
          )}
        </View>
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
});
