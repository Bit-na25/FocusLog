export function localStorageEffect<T>(key: string, defaultValue?: T) {
  return ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);

    if (savedValue != null) {
      try {
        setSelf(JSON.parse(savedValue));
      } catch (e) {
        console.error(`Error parsing localStorage for ${key}`, e);
        setSelf(defaultValue);
      }
    } else if (defaultValue) {
      // 최초 진입 시 기본값을 저장
      setSelf(defaultValue);
      localStorage.setItem(key, JSON.stringify(defaultValue));
    }

    onSet((newValue: T) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    });
  };
}
