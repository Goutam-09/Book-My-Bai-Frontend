import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink,Router} from '@angular/router';
import { UserRegisterService } from '../../services/UserRegistrationService.service';
import { AdminDashBoardComponent } from '../../admincomponents/admin-dash-board/admin-dash-board.component';
import Toast from '../../Toast/helper';
import { UserDto } from '../../Models/UserDto';
import { UserDashBoardComponent } from '../../usercomponents/user-dash-board/user-dash-board.component';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink,AdminDashBoardComponent,UserDashBoardComponent],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.css'
})
export class LoginComponentComponent implements OnInit{

  constructor(private userService:UserRegisterService,private router:Router){}


  ngOnInit(): void {
    
  }

  curUser!:UserDto;

  userLoginForm = new FormGroup({
    userEmail: new FormControl('',
      [
        Validators.required,
        Validators.pattern(/^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/)
      ]
    ),
    userPassword: new FormControl('',
      [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,15}$/),
        Validators.minLength(6),
        Validators.maxLength(15)
      ]
    )
  })

  get userEmail() {
    return this.userLoginForm.get('userEmail');
  }
  get userPassword() {
    return this.userLoginForm.get('userPassword');
  }

  userLogin(user: FormGroup) {
    this.userService.loginUser(user.value).subscribe((result:any)=>{
    this.userService.setUserLoginData(result.user);
    this.userService.getCurrentUser(result.user).subscribe((result:any)=>{
      if(result.currentUser.userRoles[0].userRole==='ADMIN')
        this.router.navigate(['/admin-dashboard'])
      if(result.currentUser.userRoles[0].userRole==='CUSTOMER')
        this.router.navigate(['/user-dashboard'])
      })
    },(error)=>{
      Toast.fire({
        icon:'error',
        title:error.error.message
      })
  })
  }
}
