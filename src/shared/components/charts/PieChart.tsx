import React from 'react';
import { View, Dimensions, StyleSheet, ColorValue } from 'react-native';
import { PieChart as RNChart } from 'react-native-chart-kit';
import Typography from '../typography';
import { useTheme } from '../../hooks/use-theme';

interface PieChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

function colorValueToString(color: ColorValue): string {
  return typeof color === 'string' ? color : '#ffffff';
}

export function PieChart({ data }: PieChartProps) {
  const { colors } = useTheme();
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 48; // Уменьшаем ширину для отступов

  // Преобразуем данные в формат, который ожидает библиотека
  const chartData = data.map(item => ({
    name: item.name,
    value: item.value,
    color: item.color,
    legendFontColor: colors.text,
    legendFontSize: 12,
  }));

  const chartConfig = {
    backgroundColor: colors.background,
    backgroundGradientFrom: colors.background,
    backgroundGradientTo: colors.background,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  return (
    <View style={styles.container}>
      <RNChart
        data={chartData}
        width={chartWidth}
        height={220}
        chartConfig={chartConfig}
        accessor="value"
        backgroundColor="transparent"
        paddingLeft="0"
        absolute
        center={[chartWidth / 4, 0]} // Центрируем график
      />
      <View style={styles.legend}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.colorBox, { backgroundColor: item.color }]} />
            <Typography style={styles.legendText}>{item.name}</Typography>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    width: '100%',
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 16,
    width: '100%',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  colorBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
  },
}); 