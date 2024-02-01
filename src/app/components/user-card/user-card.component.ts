import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../interfaces/user.interface';

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
  editUser = new EventEmitter<User>();

  constructor() {

  }

  deleteUser(event: Event): void {
    event.stopPropagation();
    this.deleteUserEvent.emit(this.user.id);
  }

  onCardClick(user: User): void {
    this.editUser.emit(user);
    // console.log("click")
  }

}
