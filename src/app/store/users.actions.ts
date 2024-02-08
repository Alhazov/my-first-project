import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "../interfaces/user.interface";

export const UsersPageActions = createActionGroup({
  source: 'User',
  events: {
    loadUsers: emptyProps(),
    loadUsersSuccess: props<{ users: User[] }>(),
    loadUsersFailure: props<{ error: unknown }>(),
  },
});
