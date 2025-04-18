import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  IS_LOGGED_IN: 'isLoggedIn',
};

export const setLoginStatus = async value => {
  await AsyncStorage.setItem(
    STORAGE_KEYS.IS_LOGGED_IN,
    value ? 'true' : 'false',
  );
};

export const getLoginStatus = async () => {
  const value = await AsyncStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN);
  return value === 'true';
};

export const clearLoginStatus = async () => {
  await AsyncStorage.removeItem(STORAGE_KEYS.IS_LOGGED_IN);
};
