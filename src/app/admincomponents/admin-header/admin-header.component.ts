import { Component, OnInit } from '@angular/core';
import { UserDto } from '../../Models/UserDto';
import { UserRegisterService } from '../../services/UserRegistrationService.service';
import { AdminProfileComponent } from '../admin-profile/admin-profile.component';
import { Router, RouterLink, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [RouterLink,AdminProfileComponent,RouterModule],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent implements OnInit{
  
  user!:UserDto;
  userId!:string
  ngOnInit(): void {
    this.getUserData();
  }
  constructor(private userService:UserRegisterService,private router:Router){}

  public getUserData(){
    let person = this.userService.getUserLoginData();
    if(person!=null){
     this.userId = JSON.parse(person);
     this.userService.getCurrentUser(this.userId).subscribe((result:any)=>{
        this.user = result.currentUser;
     });
    } 
    alert(this.user.isActive)

  }


  public signoutuser(){
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform logout action here
        this.userService.signout();
        this.router.navigate(['/loginForm'])
        Swal.fire('Logged Out!', 'You have been logged out.', 'success');
      }
    }); 
  }
}
