import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/ServicesService';
import { ServiceDto } from '../../Models/ServiceDto';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserDto } from '../../Models/UserDto';
import { UserRegisterService } from '../../services/UserRegistrationService.service';
import { Result } from 'antd';


@Component({
  selector: 'app-user-services',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-services.component.html',
  styleUrl: './user-services.component.css'
})
export class UserServicesComponent implements OnInit {

  serviceDto:ServiceDto[]=[];
  getService:ServiceDto = new ServiceDto();

  serviceRequirementForm!:FormGroup;
  ngOnInit(): void {
    this.getServiceData();
  }



  public initilizeForm(){
    this.serviceRequirementForm = new FormGroup({
      serviceName:new FormControl({value:this.getService==null?'':this.getService.serviceName,disabled:true})
    })    
  }

  get serviceName() {
    return this.serviceRequirementForm.get('serviceName');
  }


  
 
  

  constructor(private service: ServicesService,private userService:UserRegisterService) { }

  currentPage: number = 1; 
  totalPages: number=0; 
  pages: number[] = [];
  name:string='serviceName';
  sortBy:string='ASC'
  nameOfService!:string;
  getServiceData() {
    this.service.getServices(this.currentPage,2,this.name,this.sortBy).subscribe((result: any) => {    
        this.serviceDto = result.content;
        this.totalPages = result.totalPages;
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);        
    });
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
        this.getServiceData();
    }
}



  serviceNameMethod(name:string) {
    this.service.getSingleService(name).subscribe((result:any)=>{
      this.getService = result.servicesDto;
      console.log(this.getService.serviceCategoryArray);
    })
  }
}
