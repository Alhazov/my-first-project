import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs";
import { UsersApiService } from "../services/users-api.service";
import { UsersPageActions } from "./users.actions";

@Injectable()
export class UsersEffects {
  loadUsers$ = createEffect(() => this.actions$
    .pipe(
      ofType(UsersPageActions.loadUsers),
      mergeMap(() => this.usersApiService.getUsers()
        .pipe(
          map(users => UsersPageActions.loadUsersSuccess({ users })),
          catchError(error => of(UsersPageActions.loadUsersFailure({ error })))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private usersApiService: UsersApiService
  ) {}
}
