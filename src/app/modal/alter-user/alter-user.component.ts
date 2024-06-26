import { Component, Input } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { DepartmentListService } from '../../components/department-list/department-list.service';
import { UserService } from '../../components/user/user.service';
import { CommonModule } from '@angular/common';
import { User } from '../../model/user.model';
import { Departamento } from '../../model/department.model';
import Swal from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-alter-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './alter-user.component.html',
  styleUrl: './alter-user.component.css',
  providers: [UserService, DepartmentListService],
})
export class AlterUserComponent {
  editForm: FormGroup;
  // user: User[] = [];
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

  ngOnInit() {
    this.getDepartments();
  }

  getDepartments() {
    this.departmentService.getDepartments().subscribe((res: any) => {
      this.departments = res;
    });
  }

  onSubmit() {
    const id = this.user.id;

    if (this.editForm.valid) {
      const updatedUser: any = {
        nome: this.editForm.get('nome')?.value,
        dataNascimento: this.editForm.get('dataNascimento')?.value,
        email: this.editForm.get('email')?.value,
        departamento: this.editForm.get('departamento')?.value,

      };
      console.log(updatedUser);


      this.userService.editUser(updatedUser, id).subscribe((res) => {
        if (res) {
          Swal.fire({
            title: 'Sucesso',
            text: 'Usuário alterado com sucesso',
            icon: 'success',
            showCloseButton: true,
          });
        }
      });
    }
  }
}
