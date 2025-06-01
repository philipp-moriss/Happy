import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TasksNavigator } from "./tasks-navigator";
import { StatisticsScreen } from "../screens/statistics/StatisticsScreen";
import { TabBar } from "../shared/components/tab-bar";
import useTranslate from "../shared/localization/use-translate";
import { AiInsightScreen } from "../screens/ai-insight/AiInsightScreen";

const Tab = createBottomTabNavigator();

export function MainNavigator() {
  const { translate } = useTranslate();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen
        name="Tasks"
        component={TasksNavigator}
        options={{
          title: translate("tabBar.tasks"),
          tabBarLabel: translate("tabBar.tasks"),
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{
          title: translate("tabBar.statistics"),
          tabBarLabel: translate("tabBar.statistics"),
        }}
      />
      <Tab.Screen
        name="AiInsight"
        component={AiInsightScreen}
        options={{
          title: translate("tabBar.aiInsight"),
          tabBarLabel: translate("tabBar.aiInsight"),
        }}
      />
    </Tab.Navigator>
  );
}