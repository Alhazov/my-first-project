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

  constructor() {

  }

  deleteUser(): void {
    this.deleteUserEvent.emit(this.user.id);
  }
}
