import React from "react";
import { View, StyleSheet } from "react-native";
import Typography from "../../../shared/components/typography";
import Button from "../../../shared/components/button";
import { StatusText } from "../../../shared/components/status";

// Карточка AI-анализа: статус, инсайт, кнопка Analyze
interface AIAnalysisCardProps {
  status: "complete" | "pending";
  insight: string;
  onAnalyze: () => void;
  isLoading?: boolean;
}

export function AIAnalysisCard({ status, insight, onAnalyze, isLoading }: AIAnalysisCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Typography style={styles.title}>AI Analysis</Typography>
        <StatusText type={status === "complete" ? "success" : "pending"} style={styles.status} />
      </View>
      <Typography style={styles.insight}>{insight}</Typography>
      <Button
        style={styles.button}
        onPress={onAnalyze}
        disabled={isLoading || status === "complete"}
      >
        <Typography>{isLoading ? "Analyzing..." : status === "complete" ? "Complete" : "Analyze"}</Typography>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    backgroundColor: "#F5F6FA",
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
  status: {
    marginLeft: 8,
  },
  insight: {
    fontSize: 15,
    color: "#6C7AF2",
    marginBottom: 12,
    marginTop: 4,
  },
  button: {
    marginTop: 8,
    alignSelf: "flex-end",
  },
}); 