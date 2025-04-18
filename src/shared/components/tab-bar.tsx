import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Typography from './typography';
import useTheme from '../hooks/use-theme/use-theme';
import { Ionicons } from '@expo/vector-icons';

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();

  const getIconName = (routeName: string) => {
    switch (routeName) {
      case 'Tasks':
        return 'list';
      case 'Statistics':
        return 'stats-chart';
      case 'Profile':
        return 'person';
      default:
        return 'apps';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg01 }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tab}
          >
            <Ionicons
              name={getIconName(route.name)}
              size={24}
              color={isFocused ? colors.primary : colors.text02}
            />
            <Typography
              style={[
                styles.label,
                { color: isFocused ? colors.primary : colors.text02 },
              ]}
            >
              {route.name}
            </Typography>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
}); 