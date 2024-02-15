import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../interfaces/user.interface';

import { UsersPageActions } from 'src/app/store/users.actions';
import { Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  @Input()
  user!: User;
  @Output()
  deleteUserEvent = new EventEmitter<number>();
  @Output()
  editUserEvent = new EventEmitter<User>();

  deleteUser(event: Event): void {
    event.stopPropagation();
    this.deleteUserEvent.emit(this.user.id);
  }

  editUser(event: Event): void {
    event.stopPropagation();
    this.editUserEvent.emit(this.user);
  }
}
