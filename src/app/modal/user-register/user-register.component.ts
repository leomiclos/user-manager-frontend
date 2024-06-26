import { Component } from '@angular/core';
import { UserService } from '../../components/user/user.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DepartmentListService } from '../../components/department-list/department-list.service';
import Swal from 'sweetalert2';
import { Departamento } from '../../model/department.model';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css',
  providers: [UserService, DepartmentListService]
})
export class UserRegisterComponent {


  registerForm: FormGroup;
  departments: Departamento[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private departmentService: DepartmentListService
  ) {
    this.registerForm = this.fb.group({
      nome: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      email: ['', Validators.required],
      departamento: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getDepartments();
  }

  getDepartments() {
    this.departmentService.getDepartments().subscribe((res: any) => {
      this.departments = res
    })

  }

  onSubmit(){
    this.userService.newUser(this.registerForm.value).subscribe((res) => {
      if(res){
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Usuário cadastrado com sucesso'
        }).then(res => {
          if(res.isConfirmed){
            window.location.reload()
          }
        })
      }
    })
  }

}
