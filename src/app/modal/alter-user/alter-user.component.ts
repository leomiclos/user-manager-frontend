import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import Swal from 'sweetalert2';

import { Departamento } from '../../model/department.model';
import { User } from '../../model/user.model';
import { UserService } from '../../components/user/user.service';
import { DepartmentListService } from '../../components/department-list/department-list.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-alter-user',
  templateUrl: './alter-user.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  styleUrls: ['./alter-user.component.css'],
  providers: [UserService, DepartmentListService],
})
export class AlterUserComponent implements OnInit {
  editForm: FormGroup;
  departments: Departamento[] = [];

  @Input() user!: User;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private departmentService: DepartmentListService
  ) {
    this.editForm = this.fb.group({
      nome: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      email: ['', Validators.required],
      departamento: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getDepartments();
    this.initializeForm();
  }

  getDepartments(): void {
    this.departmentService.getDepartments().subscribe((res: any) => {
      this.departments = res;
    });
  }

  initializeForm(): void {
    if (this.user) {
      const { nome, dataNascimento, email, departamento } = this.user;
      this.editForm.patchValue({
        nome: nome || '',
        dataNascimento: dataNascimento || '',
        email: email || '',
        departamento: departamento || '',
      });
    }
  }

  onSubmit(): void {
    const id = this.user.id;

    if (this.editForm.valid) {
      const updatedUser: any = {
        nome: this.editForm.get('nome')?.value || '',
        dataNascimento: this.editForm.get('dataNascimento')?.value || '',
        email: this.editForm.get('email')?.value || '',
        departamento: this.editForm.get('departamento')?.value || '',
      };

      Swal.fire({
        icon: 'warning',
        title: 'Confirmar Edição',
        text: 'Tem certeza que deseja editar?',
        confirmButtonText: 'Sim, editar',
        showCancelButton: true,
        cancelButtonText: 'Não, voltar',
      }).then((res) => {
        if (res.isConfirmed) {
          this.userService.editUser(updatedUser, id).subscribe((res: any) => {
            if (res) {
              Swal.fire({
                title: 'Sucesso',
                text: 'Usuário alterado com sucesso',
                icon: 'success',
                showCloseButton: true,
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload(); // Reload the page or navigate to another route upon success
                }
              });
            }
          });
        }
      });
    }
  }
}
