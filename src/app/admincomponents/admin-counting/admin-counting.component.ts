import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomeComponent } from '../../homecomponents/home/home.component';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-admin-counting',
  standalone: true,
  imports: [RouterLink,AppComponent],
  templateUrl: './admin-counting.component.html',
  styleUrl: './admin-counting.component.css'
})
export class AdminCountingComponent {

}
