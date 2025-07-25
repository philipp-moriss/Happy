import { Ionicons } from "@expo/vector-icons";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

import { ActivityChart } from "@/src/shared/components/charts/ActivityChart";
import useTheme from "@/src/shared/hooks/use-theme/use-theme";
import { useStore } from "../../provider";
import { PieChart } from "../../shared/components/charts/PieChart";
import Typography from "../../shared/components/typography";
import useTranslate from "../../shared/localization/use-translate";
import HeaderGoBack from "@/src/shared/components/header-go-back/header-go-back";

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
  }
> = {
  eudaimonic: {
    color: "#6C7AF2",
    icon: "happy-outline",
  },
  hedonic: {
    color: "#F26CA7",
    icon: "heart-outline",
  },
  psychological: {
    color: "#6CF2B2",
    icon: "leaf-outline",
  },
};

export const StatisticsScreen = observer(() => {
  const { taskStore } = useStore();
  const { colors } = useTheme();
  const { translate } = useTranslate();

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

  const chartData = getTasksByCategory();
  const hasData = chartData.length > 0;

  // Динамически формируем статистику по категориям
  const totalTasks = taskStore.tasks.length;
  const tasksByCategory = taskStore.tasksByCategory;
  const categoryStats = Object.entries(tasksByCategory).map(([key, tasks]) => {
    const meta = CATEGORY_META[key] || {
      color: "#CCCCCC",
      icon: "help-circle-outline",
    };
    const percent =
      totalTasks > 0 ? Math.round((tasks.length / totalTasks) * 100) : 0;
    const progress = totalTasks > 0 ? tasks.length / totalTasks : 0;
    return {
      key,
      ...meta,
      // @ts-ignore
      title: translate('statistics.categories.' + key),
      // @ts-ignore
      subtitle: translate('statistics.subtitles.' + key),
      // @ts-ignore
      advice: translate('statistics.advices.' + key),
      percent,
      progress,
    } as { key: string; color: string; icon: keyof typeof Ionicons.glyphMap; title: string; subtitle: string; advice: string; percent: number; progress: number };
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg01 }]}>
      <View style={{ paddingHorizontal: 20 }}>
        <HeaderGoBack title={translate("statistics.title")} showArrowBack={false} />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {categoryStats.map((cat, index) => (
            <CategoryStatCard {...cat} key={index + cat.key + "123"} />
          ))}
          <View
            style={[styles.chartContainer, { backgroundColor: colors.bg02 }]}
          >
            <Typography style={styles.chartTitle}>
              {translate("statistics.categoryDistribution")}
            </Typography>
            {hasData ? (
              <>
                <PieChart data={chartData} />
              </>
            ) : (
              <View style={styles.emptyState}>
                <Typography style={styles.emptyStateText}>
                  {translate('statistics.noData')}
                </Typography>
              </View>
            )}
          </View>
          <View
            style={[styles.chartContainer, { backgroundColor: colors.bg02 }]}
          >
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
                  {translate('statistics.noData')}
                </Typography>
              </View>
            )}
          </View>
          {/* Рандомный совет под графиком */}
          <Typography style={styles.randomAdvice}>
            {translate("statistics.randomAdvice", { advice: categoryStats.length > 0 ? categoryStats[Math.floor(Math.random() * categoryStats.length)].advice : "" })}
          </Typography>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
    paddingTop: 20,
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
