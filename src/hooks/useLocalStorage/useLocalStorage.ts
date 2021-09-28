import { useState, useEffect } from "react";

function getStorageValue<T>(key: string, defaultValue: T) {
  // getting stored value
  const savedItemValue: string | null = localStorage.getItem(key);
  if(savedItemValue !== null) {
    const itemValue = JSON.parse(savedItemValue);
    return itemValue || defaultValue;
  }
  return defaultValue;
}

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};