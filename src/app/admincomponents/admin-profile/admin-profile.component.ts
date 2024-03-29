import { Component, OnInit } from '@angular/core';
import { UserRegisterService } from '../../services/UserRegistrationService.service';
import { LoginDto } from '../../Models/LoginDto';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserDto } from '../../Models/UserDto';
import { Router, RouterLink } from '@angular/router';
import Toast from '../../Toast/helper';
import { AddressDto } from '../../Models/AddressDto';
import { AddressService } from '../../services/AddressService';
import { UserPasswordBody } from '../../Models/UserPasswordBody';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent implements OnInit{
 
  user!:UserDto;
  address!:AddressDto;
  userId!:string
  passwordBody:UserPasswordBody = new UserPasswordBody();
  editAdminProfile!:FormGroup;
  addressForm!:FormGroup;


  ngOnInit(): void {
    this.getUserData();
  }


  constructor(private userService:UserRegisterService,private addressService:AddressService,private router:Router){}
  

  passwordForm = new FormGroup({
    currentPassword: new FormControl('',
    [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,15}$/),
      Validators.minLength(6),
      Validators.maxLength(15)
    ]
    ),
    newPassword: new FormControl('',
    [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,15}$/),
      Validators.minLength(6),
      Validators.maxLength(15)
    ]
    ),
    renewpassword: new FormControl('',
    [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,15}$/),
      Validators.minLength(6),
      Validators.maxLength(15)
    ]
    )
  })


  public getUserData(){
    let person = this.userService.getUserLoginData();
    if(person!=null){
      this.userId =  JSON.parse(person);
     this.userService.getCurrentUser(this.userId).subscribe((result:any)=>{
        this.user = result.currentUser;
        this.initilizeForm();
     });
    } 
  }
  public initilizeForm(){
    
    
    this.editAdminProfile = new FormGroup({
      userName:new FormControl(this.user.userName,
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/),
        Validators.minLength(3),
        Validators.maxLength(35)
      ]
      ),
      userMobile: new FormControl({value:this.user.userMobile,disabled:true}),
      userEmail: new FormControl({value:this.user.userEmail,disabled:true}),
      userGender:new FormControl(this.user.userGender,
      Validators.required,
      ),
    })
    this.addressForm = new FormGroup({

      country:new FormControl(this.user.address !== null ? this.user.address.country : ''
      ,
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]*$/),
      ]
      ),
      state:new FormControl(this.user.address!== null ? this.user.address.state : ''
      ,
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]*$/),
      ]
      ),
      city:new FormControl(this.user.address!== null ? this.user.address.city : ''
      ,
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]*$/),
      ]
      ),
      street:new FormControl(this.user.address!== null ? this.user.address.street : ''
      ,
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9,. ]*$/),
      ]
      ),
      zipCode:new FormControl(this.user.address!== null ? this.user.address.zipCode : ''
      ,
      [
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
      ]
      ),
    }) 
  }
 
  get userName() {
    return this.editAdminProfile.get('userName');
  }
  get userMobile() {
    return this.editAdminProfile.get('userMobile');
  }
  get userEmail() {
    return this.editAdminProfile.get('userEmail');
  }
  get userGender() {
    return this.editAdminProfile.get('userGender');
  }
  get street(){
    return this.addressForm.get('street');
  }
  get city(){
    return this.addressForm.get('city')
  }
  get zipCode(){
    return this.addressForm.get('zipCode');
  }
  get country(){
    return this.addressForm.get('country');
  }
  get state(){
    return this.addressForm.get('state');
  }
  get currentPassword(){
    return this.passwordForm.get('currentPassword');
  }
  get newPassword(){
    return this.passwordForm.get('newPassword')
  }
  get renewpassword(){
    return this.passwordForm.get('renewpassword')
  }
  editUser(data:FormGroup){
    this.user.userName=data.value.userName;
    this.user.userGender=data.value.userGender;
    this.userService.updateUser(this.user).subscribe((result:any)=>{
      Toast.fire({
        icon:'success',
        title:result.message
      })
    },(error)=>{
      Toast.fire({
        icon:'error',
        title:error.error.message
    })
    })
 }
   addressSave(data:FormGroup){
     this.addressService.addressSave(data.value,this.user.userId).subscribe((result:any)=>{
      Toast.fire({
        icon:'success',
        title:result.message
      })
     },(error)=>{
      Toast.fire({
        icon:'error',
        title:error.error.message
      })
     })
   }
   message:string=''
   changePassword(data:FormGroup){
      if(!(data.value.currentPassword===data.value.newPassword)){
        if(!(data.value.newPassword===data.value.renewpassword))
        this.message = "Your new password and your renepassword not matched";
      
      else {
        this.message=''
        this.passwordBody.userId = this.userId;
        this.passwordBody.currentPassword = data.value.currentPassword;
        this.passwordBody.newPassword = data.value.newPassword;
        this.userService.changeUserPassword(this.passwordBody).subscribe((result:any)=>{
          Toast.fire({
            icon:'success',
            title:result.message
          })
        },(error)=>{
          this.message = error.error.message;
        })
      }
      }else
        this.message = "Your new password cannot be the same as your current password";
      


      
   }
}
