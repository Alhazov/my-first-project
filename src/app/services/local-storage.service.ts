import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storage: Storage = localStorage;

  setItem<T>(key: string, value: T): void {
    console.log(`Saving to localStorage: ${key}`, value)
    this.storage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string): T | null {
    const item = this.storage.getItem(key);
    console.log(`Retrieving from localStorage: ${key}`, item)
    return item ? JSON.parse(item) : null; // попробовать try catch
  }

  constructor() { }
}
