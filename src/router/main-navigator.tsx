import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TasksNavigator } from './tasks-navigator';
import { ProfileNavigator } from './profile-navigator';
import { StatisticsScreen } from '../screens/statistics/StatisticsScreen';
import { TabBar } from '../shared/components/tab-bar';

const Tab = createBottomTabNavigator();

export function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen name="Tasks" component={TasksNavigator} />
      <Tab.Screen name="Statistics" component={StatisticsScreen} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
} 