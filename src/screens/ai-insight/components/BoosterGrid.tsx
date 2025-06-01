import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Typography from "../../../shared/components/typography";
import { Ionicons } from "@expo/vector-icons";

// Описание бустера
interface Booster {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  color: string;
  effect: string;
  onPress: () => void;
}

interface BoosterGridProps {
  boosters: Booster[];
}

// Сетка быстрых бустеров (4 штуки)
export function BoosterGrid({ boosters }: BoosterGridProps) {
  return (
    <View style={styles.grid}>
      {boosters.map((b, i) => (
        <TouchableOpacity
          key={b.label}
          style={[styles.booster, { backgroundColor: b.color }]}
          onPress={b.onPress}
          activeOpacity={0.85}
        >
          <Ionicons name={b.icon} size={28} color="#222" style={styles.icon} />
          <Typography style={styles.label}>{b.label}</Typography>
          <Typography style={styles.effect}>{b.effect}</Typography>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  booster: {
    width: "48%",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  icon: {
    marginBottom: 6,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
    marginBottom: 2,
  },
  effect: {
    fontSize: 13,
    color: "#6C7AF2",
  },
}); 