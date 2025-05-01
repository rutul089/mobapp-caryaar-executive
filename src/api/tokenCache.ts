import {getAccessToken} from '../utils/storage';

let cachedToken: string | null = null;

export const getCachedToken = async (): Promise<string | null> => {
  if (!cachedToken) {
    cachedToken = await getAccessToken();
  }
  return cachedToken;
};

export const clearCachedToken = () => {
  cachedToken = null;
};
