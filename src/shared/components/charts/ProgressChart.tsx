import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Typography from '../typography';
import { useTheme } from '../../hooks/use-theme';

interface ProgressChartProps {
  data: number[];
  labels: string[];
  title?: string;
}

export function ProgressChart({ data, labels, title }: ProgressChartProps) {
  const { colors } = useTheme();
  const screenWidth = Dimensions.get('window').width;

  const chartData = {
    labels,
    datasets: [
      {
        data: data.length ? data : [0],
      },
    ],
  };

  const chartConfig = {
    backgroundColor: colors.background,
    backgroundGradientFrom: colors.background,
    backgroundGradientTo: colors.background,
    decimalPlaces: 0,
    color: (opacity = 1) => colors.primary,
    labelColor: (opacity = 1) => colors.text,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: colors.primary,
    },
  };

  return (
    <View style={styles.container}>
      {title && (
        <Typography style={styles.title}>
          {title}
        </Typography>
      )}
      <LineChart
        data={chartData}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    padding: 16,
    borderRadius: 16,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
}); 