import { UserDto } from "./UserDto";

export class UserRoles{
    userRoleId:string = '';
    userRole!:string;
	isActive:Boolean=true;
    userDto:UserDto = new UserDto();
}