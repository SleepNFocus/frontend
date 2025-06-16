// 관리자 및 시스템 로그 관련 API 서비스

import axios from 'axios';

export type User = {
  user_id: number;
  email: string;
  nickname: string;
  gender: string;
  birth_year: number;
  status: string;
  is_active: boolean;
  is_admin: boolean;
  joined_at: string;
  last_login_at: string;
  updated_at: string;
};

const BASE_URL = '/api/admin';

const getDefaultHeaders = () => ({
  'Content-Type': 'application/json',
});

export const getAdminRoot = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error?.response?.data?.message || error.message || 'Unknown error' };
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`, {
      headers: getDefaultHeaders(),
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error?.response?.data?.message || error.message || 'Unknown error' };
  }
};

export const getUser = async (userId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}`, {
      headers: getDefaultHeaders(),
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error?.response?.data?.message || error.message || 'Unknown error' };
  }
};

export const updateUser = async (userId: number, updateData: Partial<User>) => {
  try {
    const response = await axios.put(`${BASE_URL}/users/${userId}`, updateData, {
      headers: getDefaultHeaders(),
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error?.response?.data?.message || error.message || 'Unknown error' };
  }
};

export const deleteUser = async (userId: number) => {
  try {
    await axios.delete(`${BASE_URL}/users/${userId}`, {
      headers: getDefaultHeaders(),
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.response?.data?.message || error.message || 'Unknown error' };
  }
};

export const getAdminLogs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/logs`, {
      headers: getDefaultHeaders(),
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error?.response?.data?.message || error.message || 'Unknown error' };
  }
}; 