import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../interfaces/user.interface';
import { UsersApiService } from '../../services/users-api.service';
import { UsersService } from '../../services/users.service';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: User[] = [];

  constructor(
    private usersApiService: UsersApiService,
    public usersService: UsersService,
    private dialog: MatDialog
    ) {}

  ngOnInit() {

  }

  onDeleteUser(id:number): void {
    this.usersService.deleteUser(id);
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      minWidth: '400px',
      minHeight: '200px',
    });

    dialogRef.afterClosed().subscribe(newUser => {
      if (newUser) {
        this.usersService.addUser(newUser);
      }
    });
  }

  openEditUserDialog(user: User): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      minWidth: '400px',
      minHeight: '200px',
      data: { user: user, isEdit: true }
    });

    dialogRef.afterClosed().subscribe(updatedUser => {
      if (updatedUser) {
          this.usersService.editUser(updatedUser);
      }
    });
  }

}
