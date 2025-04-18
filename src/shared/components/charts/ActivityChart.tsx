import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Typography from '../typography';
import useTheme from '../../hooks/use-theme/use-theme';

interface ChartDataPoint {
  name: string;
  value: number;
  color?: string;
}

interface ActivityChartProps {
  data: {
    labels: string[];
    datasets: {
      data: number[];
      color?: (opacity: number) => string;
    }[];
  } | ChartDataPoint[];
}

export function ActivityChart({ data }: ActivityChartProps) {
  const colors = useTheme().colors;
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 48;

  // Преобразуем данные в нужный формат
  const chartData = React.useMemo(() => {
    if (Array.isArray(data)) {
      // Если передан массив точек данных
      return {
        labels: data.map(point => point.name),
        datasets: [{
          data: data.map(point => point.value),
          color: (opacity = 1) => `rgba(135, 74, 176, ${opacity})`,
        }],
      };
    }
    
    // Если передан объект в формате LineChart
    return {
      labels: data?.labels || [],
      datasets: [{
        data: data?.datasets?.[0]?.data || [0, 0, 0, 0, 0, 0],
        color: (opacity = 1) => `rgba(135, 74, 176, ${opacity})`,
      }],
    };
  }, [data]);

  const chartConfig = {
    backgroundColor: colors.bg01 as string,
    backgroundGradientFrom: colors.bg01 as string,
    backgroundGradientTo: colors.bg01 as string,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(135, 74, 176, ${opacity})`,
    labelColor: (opacity = 1) => colors.text02 as string,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: colors.primary as string,
    },
    propsForBackgroundLines: {
      strokeDasharray: '',
      strokeWidth: 1,
      stroke: colors.bg03 as string,
    },
  };

  return (
    <View style={styles.container}>
      <LineChart
        data={chartData}
        width={chartWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
        withInnerLines={true}
        withOuterLines={true}
        withVerticalLines={false}
        withHorizontalLines={true}
        withVerticalLabels={true}
        withHorizontalLabels={true}
        withDots={true}
        withShadow={false}
        withScrollableDot={false}
        yAxisInterval={1}
        yAxisSuffix=""
        yAxisLabel=""
        segments={5}
      />
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
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
}); 