const API_CONFIGS = {
  development: {
    BASE_URL: 'https://www.dev.focusz.site/api',
    TIMEOUT: 10000,
  },
  production: {
    BASE_URL: 'https://www.dev.focusz.site/api',
    TIMEOUT: 15000,
  }
};

const currentEnv = __DEV__ ? 'development' : 'production';

export const API_CONFIG = API_CONFIGS[currentEnv];

export const getDefaultHeaders = () => ({
  'Content-Type': 'application/json',
  // 'Authorization': `Bearer ${getAuthToken()}`,
});

export const API_ENDPOINTS = {
  SLEEP_RECORD: '/sleepRecord',
};