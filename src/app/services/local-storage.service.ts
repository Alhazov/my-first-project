import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storage: Storage = localStorage;

  constructor() { }

  setItem(key: string, users: User[]): void {
    this.storage.setItem(key, JSON.stringify(users));
  }

  getItem(key: string): User[] | null {
    const users = localStorage.getItem(key);
    if (users === null) {
      return null;
    }
    try {
      return JSON.parse(users);
    } catch {
      return null;
    }
  }


}
