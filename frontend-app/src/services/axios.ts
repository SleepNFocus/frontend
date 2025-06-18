import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getApiClient = async () => {
  const AUTH_TOKEN = await AsyncStorage.getItem('accessToken');
  return axios.create({
    baseURL: 'https://www.dev.focusz.site/',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      ...(AUTH_TOKEN ? { 'Authorization': `Bearer ${AUTH_TOKEN}` } : {}),
    },
  });
};