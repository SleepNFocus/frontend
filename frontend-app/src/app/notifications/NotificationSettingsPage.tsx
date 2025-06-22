import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Switch, Card } from 'react-native-paper';
import { Layout } from '@/components/common/Layout';

export const NotificationSettingsPage: React.FC = () => {
  const [notifications, setNotifications] = useState({
    sleepReminder: true,
    testReminder: true,
    insights: true,
  });

  const toggleNotification = (type: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <Layout>
      <ScrollView style={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>
          알림 설정
        </Text>

        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.settingItem}>
              <Text variant="titleMedium">수면 기록 알림</Text>
              <Switch
                value={notifications.sleepReminder}
                onValueChange={() => toggleNotification('sleepReminder')}
              />
            </View>

            <View style={styles.settingItem}>
              <Text variant="titleMedium">테스트 알림</Text>
              <Switch
                value={notifications.testReminder}
                onValueChange={() => toggleNotification('testReminder')}
              />
            </View>

            <View style={styles.settingItem}>
              <Text variant="titleMedium">인사이트 알림</Text>
              <Switch
                value={notifications.insights}
                onValueChange={() => toggleNotification('insights')}
              />
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
});

export default NotificationSettingsPage;
