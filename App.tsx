import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { SocialLogin } from './components/auth/SocialLogin';
import { AdminNavigator } from './components/admin/navigation/AdminNavigator';
import { IntroCard } from './components/common/IntroCard';
import { OnboardingSteps } from './components/common/OnboardingSteps';
import { PrivacyNotice } from './components/common/PrivacyNotice';

// App: IntroCard, OnboardingSteps, PrivacyNotice, SocialLogin, AdminNavigator를 전환해서 볼 수 있는 메인 컴포넌트
export default function App() {
  const [tab, setTab] = useState<'intro' | 'onboarding' | 'privacy' | 'login' | 'admin'>('intro');

  return (
    <View style={styles.root}>
      {/* 상단 탭 버튼 */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, tab === 'intro' && styles.activeTab]}
          onPress={() => setTab('intro')}
        >
          <Text style={[styles.tabText, tab === 'intro' && styles.activeTabText]}>인트로</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, tab === 'onboarding' && styles.activeTab]}
          onPress={() => setTab('onboarding')}
        >
          <Text style={[styles.tabText, tab === 'onboarding' && styles.activeTabText]}>가이드</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, tab === 'privacy' && styles.activeTab]}
          onPress={() => setTab('privacy')}
        >
          <Text style={[styles.tabText, tab === 'privacy' && styles.activeTabText]}>개인정보</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, tab === 'login' && styles.activeTab]}
          onPress={() => setTab('login')}
        >
          <Text style={[styles.tabText, tab === 'login' && styles.activeTabText]}>소셜 로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, tab === 'admin' && styles.activeTab]}
          onPress={() => setTab('admin')}
        >
          <Text style={[styles.tabText, tab === 'admin' && styles.activeTabText]}>관리자 페이지</Text>
        </TouchableOpacity>
      </View>
      {/* 선택된 화면 렌더링 */}
      <View style={styles.content}>
        {tab === 'intro' && <IntroCard onStart={() => setTab('onboarding')} />}
        {tab === 'onboarding' && <OnboardingSteps onNext={() => setTab('privacy')} />}
        {tab === 'privacy' && <PrivacyNotice onAgree={() => setTab('login')} />}
        {tab === 'login' && <SocialLogin />}
        {tab === 'admin' && <AdminNavigator />}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

// 스타일 정의
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 32,
    backgroundColor: '#fff',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    alignItems: 'center',
  },
  activeTab: {
    borderBottomColor: '#1976D2',
    backgroundColor: '#F5F7FA',
  },
  tabText: {
    fontSize: 16,
    color: '#888',
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#1976D2',
  },
  content: {
    flex: 1,
  },
});
