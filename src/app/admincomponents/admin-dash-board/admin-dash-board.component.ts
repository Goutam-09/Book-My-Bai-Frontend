import { Component, Renderer2 } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { RouterOutlet } from '@angular/router';
import { AdminCountingComponent } from '../admin-counting/admin-counting.component';

@Component({
  selector: 'app-admin-dash-board',
  standalone: true,
  imports: [AdminHeaderComponent,AdminCountingComponent,AdminSidebarComponent,RouterOutlet],
  templateUrl: './admin-dash-board.component.html',
  styleUrl: './admin-dash-board.component.css'
})
export class AdminDashBoardComponent {
  
}
