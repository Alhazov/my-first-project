import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { UsersApiService } from '../../services/users-api.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: User[] = [];

  constructor(
    private usersApiService: UsersApiService,
    public usersService: UsersService
    ) {}

  ngOnInit() {
    this.usersApiService.getUsers().subscribe((users: User[]) => {
      this.usersService.users = users; // Заносим полученные данные в переменную users в UsersService
    });
  }

  onDeleteUser(id:number): void {
    this.usersService.deleteUser(id);
  }
}
