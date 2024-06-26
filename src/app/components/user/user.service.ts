import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService{


  constructor(
    private http: HttpClient
  ){}

  api = environment.apiURI

  getUser(){
    return this.http.get(`${this.api}/usuarios`)
  }

  newUser(body: any){
    return this.http.post(`${this.api}/usuarios`, body)
  }

  deleteUser(id: number){
    return this.http.delete(`${this.api}/usuarios/${id}`)
  }

  editUser(body: any, id: number){
    return this.http.put(`${this.api}/usuarios/${id}`, body)
  }




}
