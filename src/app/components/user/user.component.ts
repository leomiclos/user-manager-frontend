import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { UserRegisterComponent } from '../../modal/user-register/user-register.component';
import { AlterUserComponent } from '../../modal/alter-user/alter-user.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from '../../model/user.model'
import Swal from 'sweetalert2';
import { DepartmentListService } from '../department-list/department-list.service';
import { map } from 'rxjs';




@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  providers: [UserService, BsModalService, DepartmentListService]
})
export class UserComponent {


  users: User[] = []
  selectedUser: any
  departments: Map<number, string> = new Map();


  modalRef?: BsModalRef

  constructor(
    private router: Router,
    private userService: UserService,
    private modalService: BsModalService,
    private departmentService: DepartmentListService

  ){}

  ngOnInit(){
    this.getUser()
  }

  alter(user: User) {
    this.selectedUser = user
    const initialState = {
      user: this.selectedUser
    }
    this.modalRef = this.modalService.show(AlterUserComponent, { initialState })
  }

  exclude(user: any) {
    const id = user.id
    this.userService.deleteUser(id).subscribe(res => {
        Swal.fire({
          icon: 'success',
          title: 'Usuário excluído com sucesso',
          showConfirmButton: true
        }).then(res => {
          if(res.isConfirmed){
            window.location.reload()
          }
        })
      })
  }


  newUser() {
    this.modalRef = this.modalService.show(UserRegisterComponent)
  }

  getUser() {
    this.userService.getUser().subscribe((res: any) => {
      this.users = res;
      this.users.forEach(user => {
        this.getDepartmentsById(Number(user.departamento));
      });
    });
  }

  getDepartmentsById(id: number) {
    this.departmentService.getDepartmentsById(id).pipe(
      map((res: any) => res.departamento)
    ).subscribe(departmentName => {
      this.departments.set(id, departmentName);
    });
  }

  getDepartmentName(id: string): string {
    return this.departments.get(Number(id)) || 'N/A';
  }

  formatarData(dataStr: string): string {
    const data = new Date(dataStr);
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }


  back(){
    this.router.navigate(['/home'])
  }
}
