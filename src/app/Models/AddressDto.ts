import { UserDto } from "./UserDto";

export class AddressDto{
  addressId: string = '';
  street: string = '';
  city: string = '';
  zipCode: string = '';
  state:string = '';
  country:string = '';
  user: UserDto = new UserDto();
}