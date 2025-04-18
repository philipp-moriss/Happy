import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TextStyle,
  SafeAreaView,
} from "react-native";
import { observer } from "mobx-react-lite";
import { useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useStore } from "../../provider";
import { useTheme } from "../../shared/hooks/use-theme";
import Typography from "../../shared/components/typography";
import { PieChart } from "../../shared/components/charts/PieChart";
import { ActivityChart } from "@/src/shared/components/charts/ActivityChart";

export const StatisticsScreen = observer(() => {
  const { taskStore } = useStore();
  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  useEffect(() => {
    taskStore.fetchTasks();
  }, []);

  const getTasksByCategory = () => {
    const tasksByCategory = taskStore.tasksByCategory;
    return Object.entries(tasksByCategory).map(([name, tasks]) => ({
      name,
      value: tasks.length,
      color: getRandomColor(),
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

  // Используем реальные данные из стора вместо моковых
  const chartData = getTasksByCategory();

  // Проверяем, есть ли данные для отображения
  const hasData = chartData.length > 0;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.header, { backgroundColor: colors.card }]}>
          <Typography style={styles.title}>Статистика</Typography>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Typography style={styles.statValue}>
                {taskStore.tasks.length}
              </Typography>
              <Typography style={{ ...styles.statLabel, color: colors.text02 }}>
                Всего задач
              </Typography>
            </View>
            <View style={styles.statItem}>
              <Typography style={styles.statValue}>
                {taskStore.completedTasks.length}
              </Typography>
              <Typography style={{ ...styles.statLabel, color: colors.text02 }}>
                Выполнено
              </Typography>
            </View>
            <View style={styles.statItem}>
              <Typography style={styles.statValue}>
                {taskStore.activeTasks.length}
              </Typography>
              <Typography style={{ ...styles.statLabel, color: colors.text02 }}>
                В процессе
              </Typography>
            </View>
          </View>
        </View>

        <View style={[styles.chartContainer, { backgroundColor: colors.card }]}>
          <Typography style={styles.chartTitle}>
            Распределение по категориям
          </Typography>

          {hasData ? (
            <>
              <PieChart data={chartData} />
            </>
          ) : (
            <View style={styles.emptyState}>
              <Typography style={styles.emptyStateText}>
                Нет данных для отображения
              </Typography>
            </View>
          )}
        </View>
        <View style={[styles.chartContainer, { backgroundColor: colors.card }]}>
          <Typography style={styles.chartTitle}>Активность</Typography>

          {hasData ? (
            <>
              <ActivityChart data={chartData} />
            </>
          ) : (
            <View style={styles.emptyState}>
              <Typography style={styles.emptyStateText}>
                Нет данных для отображения
              </Typography>
            </View>
          )}
        </View>

        <View
          style={[styles.trendsContainer, { backgroundColor: colors.card }]}
        >
          <Typography style={styles.trendsTitle}>Тренды</Typography>
          <View style={styles.trendItem}>
            <Ionicons name="trending-up" size={24} color={colors.success} />
            <View style={styles.trendInfo}>
              <Typography style={styles.trendLabel}>
                Процент выполнения
              </Typography>
              <Typography
                style={{ ...styles.trendValue, color: colors.success }}
              >
                {getCompletionRate().toFixed(1)}%
              </Typography>
            </View>
          </View>
          <View style={styles.trendItem}>
            <Ionicons name="time" size={24} color={colors.warning} />
            <View style={styles.trendInfo}>
              <Typography style={styles.trendLabel}>Активные задачи</Typography>
              <Typography
                style={{ ...styles.trendValue, color: colors.warning }}
              >
                {taskStore.activeTasks.length}
              </Typography>
            </View>
          </View>
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
});
