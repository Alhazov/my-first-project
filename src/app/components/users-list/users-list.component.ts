import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../interfaces/user.interface';
import { UsersApiService } from '../../services/users-api.service';
import { UsersService } from '../../services/users.service';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { Observable, tap } from 'rxjs';
import { Update } from '@ngrx/entity';
import { Store, select } from '@ngrx/store';
import * as fromUsersSelectors from '../../store/users.selector'
import { UsersFacade } from 'src/app/store/users.facade';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  public users$ = this.usersFacade.users$;
  public status$ = this.usersFacade.status$;
  public error$ = this.usersFacade.error$;

  constructor(
    private dialog: MatDialog,
    private usersFacade: UsersFacade
  ) {}

  ngOnInit() {
    this.usersFacade.loadUsers();
  }

  onDeleteUser(id:number): void {
    this.usersFacade.deleteUser(id);
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      minWidth: '400px',
      minHeight: '200px',
    });

    dialogRef.afterClosed().subscribe(newUser => {
      if (newUser) {
        this.usersFacade.addUser(newUser);
      }
    });
  }

  openEditUserDialog(user: User): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      minWidth: '400px',
      minHeight: '200px',
      data: { user: user, isEdit: true }
    });

    dialogRef.afterClosed().pipe(
      tap((response: User) => {
        if (response) {
          this.usersFacade.editUser(response);
        }
      })
    ).subscribe();
  }
}
