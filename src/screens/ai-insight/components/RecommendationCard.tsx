import React from "react";
import { View, StyleSheet } from "react-native";
import Typography from "../../../shared/components/typography";

// Карточка рекомендации: цвет, статус, заголовок, описание
interface RecommendationCardProps {
  title: string;
  description: string;
  status: "Priority" | "Good" | "Improve";
  color: string;
  boost?: string;
}

export function RecommendationCard({ title, description, status, color, boost }: RecommendationCardProps) {
  // Цвет статуса
  const statusColor = {
    Priority: "#6C7AF2",
    Good: "#6CF2B2",
    Improve: "#F26CA7",
  }[status];

  return (
    <View style={[styles.container, { borderLeftColor: color }]}> 
      <View style={styles.header}>
        <Typography style={Object.assign({}, styles.status, statusColor ? { color: statusColor } : {})}>{status}</Typography>
        {boost && <Typography style={styles.boost}>+{boost}</Typography>}
      </View>
      <Typography style={styles.title}>{title}</Typography>
      <Typography style={styles.description}>{description}</Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 6,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  status: {
    fontSize: 13,
    fontWeight: "700",
    marginRight: 8,
  },
  boost: {
    fontSize: 13,
    color: "#6C7AF2",
    marginLeft: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginBottom: 2,
  },
  description: {
    fontSize: 14,
    color: "#7B7B7B",
  },
}); 