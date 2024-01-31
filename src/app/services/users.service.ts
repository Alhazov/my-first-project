import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public users: User[] = [];

  constructor() { }

  deleteUser(id: number):void {
    this.users = this.users.filter(user => user.id !== id);
  }
}
