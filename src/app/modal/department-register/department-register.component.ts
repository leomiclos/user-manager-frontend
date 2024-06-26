import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DepartmentListService } from '../../components/department-list/department-list.service';
import Swal from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-department-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './department-register.component.html',
  styleUrl: './department-register.component.css',
  providers: [DepartmentListService]
})
export class DepartmentRegisterComponent {
  registerForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentListService
  ){
    this.registerForm = this.fb.group({
      departamento: ['', Validators.required]
    });
  }

  onSubmit() {
    this.departmentService.newDepartment(this.registerForm.value).subscribe(res => {
      if(res){
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Departamento cadastrado com sucesso'
        }).then(res => {
          if(res.isConfirmed){
            window.location.reload()
          }
        })
      }
    })
  }
}
