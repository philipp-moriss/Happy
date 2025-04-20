import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function ProfileScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const menuItems = [
    {
      icon: 'settings-outline',
      title: t('profile.menu.settings'),
      onPress: () => {},
    },
    {
      icon: 'notifications-outline',
      title: t('profile.menu.notifications'),
      onPress: () => {},
    },
    {
      icon: 'help-circle-outline',
      title: t('profile.menu.help'),
      onPress: () => {},
    },
    {
      icon: 'log-out-outline',
      title: t('profile.logout'),
      onPress: () => {},
    },
  ];

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingTop: insets.top }}
    >
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
          <Ionicons name="person" size={40} color={colors.card} />
        </View>
        <Text style={[styles.name, { color: colors.text }]}>John Doe</Text>
        <Text style={[styles.email, { color: colors.text }]}>john@example.com</Text>
      </View>

      <View style={styles.stats}>
        <View style={[styles.statItem, { backgroundColor: colors.card }]}>
          <Text style={[styles.statValue, { color: colors.text }]}>42</Text>
          <Text style={[styles.statLabel, { color: colors.text }]}>{t('profile.stats.completed')}</Text>
        </View>
        <View style={[styles.statItem, { backgroundColor: colors.card }]}>
          <Text style={[styles.statValue, { color: colors.text }]}>15</Text>
          <Text style={[styles.statLabel, { color: colors.text }]}>{t('profile.stats.total')}</Text>
        </View>
      </View>

      <View style={styles.menu}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.menuItem, { backgroundColor: colors.card }]}
            onPress={item.onPress}
          >
            <View style={styles.menuItemContent}>
              <Ionicons name={item.icon as any} size={24} color={colors.text} />
              <Text style={[styles.menuItemTitle, { color: colors.text }]}>{item.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={colors.text} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    opacity: 0.7,
  },
  stats: {
    flexDirection: 'row',
    padding: 20,
    gap: 16,
  },
  statItem: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  menu: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  menuItemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemTitle: {
    fontSize: 16,
  },
}); 