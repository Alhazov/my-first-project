import { createReducer, on } from "@ngrx/store";
import { UsersPageActions } from './users.actions';
import { UsersState } from "../interfaces/user-state.interface";
import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { User } from "../interfaces/user.interface";

export const USERS_FEATURE_KEY = 'users';

export const usersAdapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: UsersState = usersAdapter.getInitialState({
  loading: false,
  error: null
});

export const usersReducer = createReducer(
    initialState,
    on(UsersPageActions.loadUsers, state => ({
      ...state,
      loading: true
    })),
    on(UsersPageActions.loadUsersSuccess, (state, { users }) =>
      usersAdapter.setAll(users, {...state, loading: false})
    ),
    on(UsersPageActions.loadUsersFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    })),

    on(UsersPageActions.addUser, state => ({
      ...state,
      loading: true
    })),
    on(UsersPageActions.addUserSuccess, (state, { userData }) =>
      usersAdapter.addOne(userData, state)
    ),
    on(UsersPageActions.addUserFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    })),

    on(UsersPageActions.editUser, state => ({
      ...state,
      loading: true
    })),
    on(UsersPageActions.editUserSuccess, (state, { userData }) => ({
      ...usersAdapter.updateOne(userData, state), loading: false
    })),
    on(UsersPageActions.editUserFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    })),

    on(UsersPageActions.deleteUser, state => ({
      ...state,
      loading: true
    })),
    on(UsersPageActions.deleteUserSuccess, (state, { userId }) =>
      usersAdapter.removeOne(userId, {...state, loading: false })
    ),
    on(UsersPageActions.deleteUserFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    }))
);
