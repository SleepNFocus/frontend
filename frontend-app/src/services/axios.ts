import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getApiClient = async () => {
  const AUTH_TOKEN = await AsyncStorage.getItem('userToken');
  console.log('✅ [getApiClient] 토큰 확인:', AUTH_TOKEN);

  const client = axios.create({
    baseURL: 'https://www.dev.focusz.site/',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (AUTH_TOKEN) {
    client.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`;
  }

  console.log('🧾 axios instance headers:', client.defaults.headers);

  return client;
};
