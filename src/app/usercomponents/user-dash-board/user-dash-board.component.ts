import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserHeaderComponent } from '../user-header/user-header.component';
import { UserSidebarComponent } from '../user-sidebar/user-sidebar.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-user-dash-board',
  standalone: true,
  imports: [RouterOutlet,UserHeaderComponent,UserSidebarComponent,UserProfileComponent],
  templateUrl: './user-dash-board.component.html',
  styleUrl: './user-dash-board.component.css'
})
export class UserDashBoardComponent {

}
