import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { User } from "../interfaces/user.interface";

export const UsersPageActions = createActionGroup({
  source: 'User',
  events: {
    loadUsers: emptyProps(),
    loadUsersSuccess: props<{ users: User[] }>(),
    loadUsersFailure: props<{ error: unknown }>(),
    loadUsersFromLocalStorage: props<{ users: User[] }>(),

    addUser: props<{ userData: User }>(),
    addUserSuccess: props<{ userData: User }>(),
    addUserFailure: props<{ error: unknown }>(),

    editUser: props<{ userData: User }>(),
    editUserSuccess: props<{ userData: Update<User> }>(),
    editUserFailure: props<{ error: unknown }>(),

    deleteUser: props<{ userId: number }>(),
    deleteUserSuccess: props<{ userId: number }>(),
    deleteUserFailure: props<{ error: unknown }>(),
  },
});
