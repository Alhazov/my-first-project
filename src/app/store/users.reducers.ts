import { createReducer, on } from "@ngrx/store";
import { UsersPageActions } from './users.actions';
import { UsersState } from "../interfaces/user-state.interface";


export const initialState: UsersState = {
    users: [],
    loading: false,
    error: null
};

export const usersReducer = createReducer(
    initialState,
    on(UsersPageActions.loadUsers, state => ({ ...state, loading: true })),
    on(UsersPageActions.loadUsersSuccess, (state, { users }) => ({ ...state, loading: false, users })),
    on(UsersPageActions.loadUsersFailure, (state, { error }) => ({ ...state, loading: false, error })),
);
