export default class SessionStorage {
  static setItem(key: string, value: Record<string, unknown> | Array<unknown> | string | number | boolean | Date): void {
    const jsonValue = JSON.stringify(value);
    window.sessionStorage.setItem(key, jsonValue);
  }

  static getItem<T>(key: string): T | null {
    const jsonValue = window.sessionStorage.getItem(key);
    if (jsonValue) {
      return JSON.parse(jsonValue) as T;
    }
    return null;
  }

  static removeItem(key: string): void {
    window.sessionStorage.removeItem(key);
  }
}
