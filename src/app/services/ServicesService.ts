import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { ServiceDto } from "../Models/ServiceDto";

@Injectable({
    providedIn: 'root'
})
export class ServicesService {

    constructor(private http: HttpClient) { }


    serviceDtos: ServiceDto = new ServiceDto();
    shiftArray: any[] = [];
    categoryArray:any[]=[];
    public createService(serviceDto: ServiceDto, image: File) {
        this.serviceDtos.serviceName = serviceDto.serviceName;
        this.serviceDtos.serviceRate = serviceDto.serviceRate;
        // alert(this.serviceDto\.)

        for (const shift of serviceDto.serviceShiftsArray) {
            this.shiftArray.push(shift.serviceShift);
          }
        this.serviceDtos.serviceShiftsArray = this.shiftArray;


        for (const category of serviceDto.serviceCategoryArray){
            this.categoryArray.push(category.serviceCategory)
        }
        this.serviceDtos.serviceCategoryArray = this.categoryArray;

        const headers = new HttpHeaders({
            'enctype': 'multipart/form-data'
        });
        const formData: FormData = new FormData();
        formData.append('serviceDtos', JSON.stringify(this.serviceDtos));
        formData.append('file', image);
        return this.http.post(`${environment.baseUrl}/bookmybai/create/service`, formData, { headers });
    }

    public getServices(pNo: number, pSize: number, sortBy: string, sortDirection: string) {
        let params = new HttpParams();
        params.set('pageNumber', pNo);
        params.set('pageSize', pSize);
        params.set('sortBy', sortBy);
        params.set('sortDirection', sortDirection);
        return this.http.get(`${environment.baseUrl}/bookmybai/getAllServices`,{params});
    }

    public getSingleService(serviceName:string){
        return this.http.get(`${environment.baseUrl}/bookmybai/singleservice/${serviceName}`);
    }
}