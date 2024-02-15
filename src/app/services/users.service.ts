import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { LocalStorageService } from './local-storage.service';
import { UsersApiService } from './users-api.service';
import { Observable, of, map, throwError } from 'rxjs';
import { Update } from '@ngrx/entity';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public users: User[] = [];
  private usersKey = 'users';

  constructor(
    private localStorageService: LocalStorageService,
    public usersApiService: UsersApiService
  ) {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    const storedUsers = this.localStorageService.getItem(this.usersKey);
    if (storedUsers && storedUsers.length > 0) {
      this.users = storedUsers;
    } else {
      this.usersApiService.getUsers().subscribe((usersFromApi: User[]) => {
        this.users = usersFromApi;
        this.localStorageService.setItem(this.usersKey, usersFromApi);
      });
    }
  }

  deleteUser(id: number): Observable<void> {
    this.users = this.users.filter(user => user.id !== id);
    this.localStorageService.setItem(this.usersKey, this.users);
    return of(null).pipe(
      map(() => { })
  );
  }

  addUser(newUser: User): Observable<User> {
    const id = this.users.length > 0 ? Math.max(...this.users.map(user => user.id)) + 1 : 1;
    newUser.id = id;
    this.users.push(newUser);
    this.localStorageService.setItem(this.usersKey, this.users);
    return of(newUser)
  }

  editUser(update: Update<User>): Observable<User>  {
    const index = this.users.findIndex(user => user.id === update.id);
    if (index === -1) {
      return throwError(() => new Error('User not found'));
    }
    const updatedUser = {
      ...this.users[index],
      ...update.changes
    };
    this.users[index] = updatedUser;
    return of(updatedUser);
  }
}
