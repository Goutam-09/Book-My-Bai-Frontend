import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRegisterService } from '../../services/UserRegistrationService.service';
import { Router, RouterLink } from '@angular/router';
import { UserDto } from '../../Models/UserDto';
import Toast from '../../Toast/helper';
import { LoginComponentComponent } from '../login-component/login-component.component';

@Component({
  selector: 'app-register-component',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,LoginComponentComponent],
  templateUrl: './register-component.component.html',
  styleUrl: './register-component.component.css'
})
export class RegisterComponentComponent {
  constructor(private userService:UserRegisterService,private route:Router){}

  user!:UserDto;
  userRegisterForm = new FormGroup({
    userName: new FormControl('',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/),
        Validators.minLength(3),
        Validators.maxLength(35)
      ]
    ),
    userMobile: new FormControl('',
      [
        Validators.required,
        Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{9,11}$/),
        Validators.minLength(10),
        Validators.maxLength(14)
      ]
    ),
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
    ),
    userGender:new FormControl('',
      Validators.required,
    )
  })

  get userName() {
    return this.userRegisterForm.get('userName');
  }
  get userMobile() {
    return this.userRegisterForm.get('userMobile');
  }
  get userEmail() {
    return this.userRegisterForm.get('userEmail');
  }
  get userPassword() {
    return this.userRegisterForm.get('userPassword');
  }
 
  get userGender() {
    return this.userRegisterForm.get('userGender');
  }
  userRegistration(user:FormGroup){
    this.userService.registerUser(user.value).subscribe((
      result:any)=>{
        Toast.fire({
          icon:'success',
          title:result.message
        })
        this.route.navigate(['/loginForm'])
    },
    (error)=>{
      Toast.fire({
        icon:'error',
        title:error.error.message
      })
    })
  }
}
