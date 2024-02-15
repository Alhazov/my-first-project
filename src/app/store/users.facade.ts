import { Injectable, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { UsersPageActions } from "./users.actions";
import { User } from "../interfaces/user.interface";
import * as UsersSelectors from './users.selector';

@Injectable({
  providedIn: 'root',
})
export class UsersFacade {

  private readonly store = inject(Store);

  public readonly users$ = this.store.select(UsersSelectors.selectUsersState);
  public readonly status$ = this.store.select(UsersSelectors.selectUsersStatus);
  public readonly error$ = this.store.select(UsersSelectors.selectUsersError);

  loadUsers() {
    this.store.dispatch(UsersPageActions.loadUsers());
  }

  deleteUser(userId: number) {
    this.store.dispatch(UsersPageActions.deleteUser({ userId }));
  }

  addUser(userData: User) {
    this.store.dispatch(UsersPageActions.addUser({ userData }));
  }

  editUser(user: User) {
    this.store.dispatch(UsersPageActions.editUser({ userData: user }));
  }
}
