import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { LoginDto } from '../Models/LoginDto';
import { UserDto } from '../Models/UserDto';
import { UserPasswordBody } from '../Models/UserPasswordBody';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {

    constructor(private http:HttpClient){}

    userId!:string

    public registerUser(user:UserDto){
      return this.http.post(`${environment.baseUrl}/bookmybai/signup`,user);
    }

    public loginUser(login:LoginDto){
      return this.http.post(`${environment.baseUrl}/bookmybai/login`,login);
    }

    public setUserLoginData(id:string){
      localStorage.setItem('user',JSON.stringify(id))
    }

    public getUserLoginData(){
      return localStorage.getItem('user');
    }
    public getUserId(){
      let person = this.getUserLoginData();
      if(person!=null)
        this.userId = JSON.parse(person)
      return this.userId;
    }

    public getCurrentUser(userId:string){
      return this.http.get(`${environment.baseUrl}/bookmybai/currentuser/${userId}`)
    }

    public updateUser(user:UserDto){
      return this.http.patch(`${environment.baseUrl}/bookmybai/update/${user.userId}`,user)
    }

    public signout(){
      localStorage.clear();
    }
    
    public changeUserPassword(passwordBody:UserPasswordBody){
      return this.http.patch(`${environment.baseUrl}/bookmybai/change/password`,passwordBody);
    }
}
