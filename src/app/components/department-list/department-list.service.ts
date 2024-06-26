import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentListService {

  constructor(
    public http: HttpClient
  ) { }

  api = environment.apiURI

  getDepartments(){
    return this.http.get(`${this.api}/departamentos`)
  }

  getDepartmentsById(id: number){
    return this.http.get(`${this.api}/departamentos/${id}`)
  }

  newDepartment(body: any){
    return this.http.post(`${this.api}/departamentos`, body)
  }

  deleteDepartment(id: number){
    return this.http.delete(`${this.api}/departamentos/${id}`)
  }
}
