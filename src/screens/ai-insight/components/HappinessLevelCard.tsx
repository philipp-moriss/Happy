import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Typography from "../../../shared/components/typography";
import useTranslate from "../../../shared/localization/use-translate";

// Компонент карточки уровня счастья
// Показывает эмодзи, уровень счастья, подпись и градиентный фон
interface HappinessLevelCardProps {
  happinessLevel: number; // уровень счастья (0-10)
  description: string; // короткое описание
}

export function HappinessLevelCard({ happinessLevel, description }: HappinessLevelCardProps) {
  const { translate } = useTranslate();
  // Выбираем эмодзи по уровню счастья
  function getEmoji(level: number) {
    if (level >= 8) return "😃";
    if (level >= 6) return "🙂";
    if (level >= 4) return "😐";
    return "😕";
  }

  return (
    <LinearGradient
      colors={["#FFB86C", "#F26CA7"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.emojiContainer}>
        <Typography style={styles.emoji}>{getEmoji(happinessLevel)}</Typography>
      </View>
      <Typography style={styles.title}>{translate("aiInsight.happiness.title")}</Typography>
      <Typography style={styles.level}>{happinessLevel.toFixed(1)}/10</Typography>
      <Typography style={styles.description}>{description}</Typography>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  emojiContainer: {
    marginBottom: 8,
  },
  emoji: {
    fontSize: 48,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  level: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginTop: 4,
  },
}); 