import { AddressDto } from "./AddressDto";
import { UserRoles, } from "./UserRolesDto";

export class UserDto{
    userId: string = '';
    userName: string = '';
    userMobile: string = '';
    userEmail: string = '';
    userPassword: string = '';
    userGender: string = '';
    isActive: boolean=true;
    userRoles: UserRoles[]=[];
    address: AddressDto = new AddressDto();
}