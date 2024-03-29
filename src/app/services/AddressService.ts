import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AddressDto } from "../Models/AddressDto";
import { environment } from "../../environments/environment.development";
import { UserDto } from "../Models/UserDto";

@Injectable({
    providedIn: 'root'
  })
export class AddressService{

    constructor(private http:HttpClient){}

    public addressSave(address:AddressDto,userId:string){
        return this.http.post(`${environment.baseUrl}/bookmybai/saveaddress/${userId}`,address);
    }
}
