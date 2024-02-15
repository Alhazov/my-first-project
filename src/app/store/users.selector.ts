import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UsersState } from "../interfaces/user-state.interface"
import { USERS_FEATURE_KEY, usersAdapter } from "./users.reducers";

export const selectUsersFeatureState =
  createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

export const selectUsersState = createSelector(
  selectUsersFeatureState,
  (state) => usersAdapter.getSelectors().selectAll(state)
);

export const selectUsersStatus = createSelector(
  selectUsersFeatureState,
  (state) => state.loading
);

export const selectUsersError = createSelector(
  selectUsersFeatureState,
  (state) => state.error
);
