import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-user-sidebar',
  standalone: true,
  imports: [RouterLink,UserProfileComponent],
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.css'
})
export class UserSidebarComponent {

}
