import { EntityState } from "@ngrx/entity";
import { User } from "./user.interface";

export interface UsersState extends EntityState<User>{
  loading: boolean;
  error: unknown;
}
