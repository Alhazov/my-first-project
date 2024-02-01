import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { LocalStorageService } from './local-storage.service';
import { UsersApiService } from './users-api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public users: User[] = [];
  private usersKey = 'users';

  constructor(
    private localStorageService: LocalStorageService,
    private usersApiService: UsersApiService
  ) {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    const storedUsers = this.localStorageService.getItem<User[]>(this.usersKey);
    if (storedUsers && storedUsers.length > 0) {
      this.users = storedUsers;
    } else {
      this.usersApiService.getUsers().subscribe((usersFromApi: User[]) => {
        this.users = usersFromApi;
        this.localStorageService.setItem(this.usersKey, usersFromApi);
      });
    }
  }



  deleteUser(id: number):void {
    this.users = this.users.filter(user => user.id !== id);
    this.localStorageService.setItem(this.usersKey, this.users);
  }

  addUser(newUser: User): void {
    const id = this.users.length > 0 ? Math.max(...this.users.map(user => user.id)) + 1 : 1; // сами придумываем id, без бэкенда
    newUser.id = id;

    this.users.push(newUser);
    this.localStorageService.setItem(this.usersKey, this.users);
  }

  editUser(updatedUser: User):void {
    const userIndex = this.users.findIndex(user => user.id === updatedUser.id);
    if (userIndex !== -1) {
      this.users[userIndex] = updatedUser;
      this.localStorageService.setItem(this.usersKey, this.users);
    }
  }
}
