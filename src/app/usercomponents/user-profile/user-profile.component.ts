import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserDashBoardComponent } from '../user-dash-board/user-dash-board.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterLink,UserDashBoardComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

}
