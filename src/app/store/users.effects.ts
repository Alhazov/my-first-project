import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, of, pipe, switchMap } from "rxjs";
import { catchError, map, tap } from "rxjs";
import { UsersApiService } from "../services/users-api.service";
import { UsersPageActions } from "./users.actions";
import { LocalStorageService } from "../services/local-storage.service";
import { User } from "../interfaces/user.interface";
import { UsersService } from "../services/users.service";
import { Update } from "@ngrx/entity";


@Injectable()
export class UsersEffects {
  private actions$ = inject(Actions);
  public localStorageService = inject(LocalStorageService);
  public usersApiService = inject(UsersApiService);
  public usersService = inject(UsersService);

  loadusers$ = createEffect(() => this.actions$.pipe(
    ofType(UsersPageActions.loadUsers),
    switchMap(() => {
      const usersFromLocalStorage = this.localStorageService.getItem('users');
      if (usersFromLocalStorage && usersFromLocalStorage.length > 0) {
        return of (UsersPageActions.loadUsersSuccess({ users: usersFromLocalStorage }));
      } else {
        return this.usersApiService.getUsers().pipe(
          tap(apiUsers => this.localStorageService.setItem('users', apiUsers)),
          map(apiUsers => UsersPageActions.loadUsersSuccess({ users: apiUsers })),
          catchError(error => of(UsersPageActions.loadUsersFailure({ error })))
        );
      }
    })
  ));



  deleteUser$ = createEffect(() => this.actions$.pipe(
    ofType(UsersPageActions.deleteUser),
    switchMap(({ userId }) => {
      return this.usersService.deleteUser(userId).pipe(
        tap(() => {
          const usersFromLocalStorage = this.localStorageService.getItem('users');
          if (usersFromLocalStorage) {
            const updatedUsers = usersFromLocalStorage.filter((user: User) => user.id !== userId);
            this.localStorageService.setItem('users', updatedUsers);
          }
        }),
        map(() => UsersPageActions.deleteUserSuccess({ userId })),
        catchError(error => of(UsersPageActions.deleteUserFailure({ error })))
      );
    })
  ));

  editUser$ = createEffect(() => this.actions$.pipe(
    ofType(UsersPageActions.editUser),
    switchMap(({ userData }) => {
      const update: Update<User> = {
        id: userData.id,
        changes: { ...userData }
      };
      return this.usersService.editUser(update).pipe(
        tap(() => {
          const usersFromLocalStorage = this.localStorageService.getItem('users');
          if (usersFromLocalStorage) {
            const updatedUsers = usersFromLocalStorage.map(u =>
              u.id === update.id ? { ...u, ...update.changes } : u
            );
            this.localStorageService.setItem('users', updatedUsers);
          }
        }),
        map(() => UsersPageActions.editUserSuccess({ userData: update })),
        catchError(error => of(UsersPageActions.editUserFailure({ error })))
      );
    })
  ));

  addUser$ = createEffect(() => this.actions$.pipe(
    ofType(UsersPageActions.addUser),
    switchMap(({ userData }) => {
      return this.usersService.addUser(userData).pipe(
        tap(createdUser => {
          const usersFromLocalStorage = this.localStorageService.getItem('users');
          let updatedUsers: User[] = [];
          if (usersFromLocalStorage) {
            updatedUsers = [...usersFromLocalStorage, createdUser];
          } else {
            updatedUsers = [createdUser];
          }
          this.localStorageService.setItem('users', updatedUsers);
        }),
        map(createdUser => UsersPageActions.addUserSuccess({ userData: createdUser })),
        catchError(error => of(UsersPageActions.addUserFailure({ error })))
      );
    })
  ));
}
