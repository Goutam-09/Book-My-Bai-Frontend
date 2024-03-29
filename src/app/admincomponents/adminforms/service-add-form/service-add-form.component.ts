import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicesService } from '../../../services/ServicesService';
import Toast from '../../../Toast/helper';
import { error } from 'console';

@Component({
  selector: 'app-service-add-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './service-add-form.component.html',
  styleUrl: './service-add-form.component.css'
})
export class ServiceAddFormComponent {

  file!:File;
  image: {url:string}|null=null;
  constructor(private service:ServicesService,private fb: FormBuilder){}

    serviceForm = new FormGroup({
      serviceName:new FormControl('',
      [
        Validators.required,
        Validators.pattern(/^[A-Za-z- ]*$/)
      ]
      ),
      serviceRate:new FormControl('',
      [
        Validators.required,
      ]
      ),
      serviceImage:new FormControl('',
      Validators.required
      ),
      serviceShiftsArray: new FormArray([
        new FormGroup({
          serviceShift: new FormControl('', Validators.required),
        })
      ]),
      serviceCategoryArray: new FormArray([
        new FormGroup({
          serviceCategory: new FormControl('',Validators.required)
        })
      ])
    })

    get serviceName(){
      return this.serviceForm.get('serviceName');
    }
    get serviceRate(){
      return this.serviceForm.get('serviceRate');
    }
    get serviceImage(){
      return this.serviceForm.get('serviceImage');
    }
    get serviceShiftsArray() {
      return this.serviceForm.get('serviceShiftsArray') as FormArray;
    }
    get serviceCategoryArray() {
      return this.serviceForm.get('serviceCategoryArray') as FormArray;
    }


    public serviceFormData(data:FormGroup){
      console.log(data.value);
      
      this.service.createService(data.value,this.file).subscribe((result:any)=>{
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

    onFileSelected(event:any):void{
      if (event.target.files && event.target.files.length == 1 ) {
        const file = event.target.files[0]; 
    
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.image = { url: e.target.result }; 
          this.file = file; 
        };
    
        reader.readAsDataURL(file);
      }
    }

    addServiceShift() {
      this.serviceShiftsArray.push(new FormGroup({
        serviceShift: new FormControl(''),
      }));
    }
    
    removeServiceShift(index: number) {
      this.serviceShiftsArray.removeAt(index);
    }
  
    addServiceCategory() {
      this.serviceCategoryArray.push(new FormGroup({
        serviceCategory: new FormControl(''),
      }));
    }
    
    removeServiceCategory(index: number) {
      this.serviceCategoryArray.removeAt(index);
    }
 
}
