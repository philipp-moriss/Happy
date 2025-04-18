import AsyncStorage from '@react-native-async-storage/async-storage';
import {Language} from './i18n';

export const getLanguage = async (): Promise<Language | null | undefined> => {
  try {
    const allKeys = await AsyncStorage.getAllKeys()
    if (!allKeys.includes('@lang')) {
      return null
    }
    return (await AsyncStorage.getItem('@lang')) as Language;
  } catch (error) {
    console.error(error);
  }
};

export const setLanguage = async (language: Language) => {
  try {
    return await AsyncStorage.setItem('@lang', language);
  } catch (error) {
    console.error(error);
  }
};
