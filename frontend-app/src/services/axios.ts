import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getApiClient = async () => {
  const AUTH_TOKEN = await AsyncStorage.getItem('userToken');

  const client = axios.create({
    baseURL: 'https://www.dev.focusz.site/api/',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (AUTH_TOKEN) {
    client.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`;
  }

  return client;
};
