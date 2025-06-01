import React from "react";
import { View, StyleSheet } from "react-native";
import Typography from "../../../shared/components/typography";
import Button from "../../../shared/components/button";

// Футер анализа: таймер и кнопка Re-analyze
interface FooterAnalysisProps {
  nextAnalysis: string; // строка с временем следующего анализа
  onReanalyze: () => void;
  isCooldown: boolean;
}

export function FooterAnalysis({ nextAnalysis, onReanalyze, isCooldown }: FooterAnalysisProps) {
  return (
    <View style={styles.container}>
      <Typography style={styles.next}>Следующий анализ доступен: {nextAnalysis}</Typography>
      <Button
        style={styles.button}
        onPress={onReanalyze}
        disabled={isCooldown}
      >
        <Typography>Re-analyze {isCooldown && "(24h cooldown)"}</Typography>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    backgroundColor: "#F5F6FA",
    padding: 20,
    marginTop: 12,
    alignItems: "center",
  },
  next: {
    fontSize: 15,
    color: "#7B7B7B",
    marginBottom: 8,
    textAlign: "center",
  },
  button: {
    alignSelf: "center",
  },
}); 