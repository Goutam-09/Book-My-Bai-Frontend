import {UserRoles, } from "./UserRolesDto";

export class LoginDto{
    userId!:string;
    userName!:string
    userEmail!:string;
    userPassword!:string;    
    userMobile!:string;
    userGender!:string;
    userRoles!:UserRoles;
    isActive!:Boolean;
}