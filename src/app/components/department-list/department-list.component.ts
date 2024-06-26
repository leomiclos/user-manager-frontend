import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentListService } from './department-list.service';
import { HttpClientModule } from '@angular/common/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DepartmentRegisterComponent } from '../../modal/department-register/department-register.component';
import { Departamento } from '../../model/department.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.css',
  providers: [DepartmentListService, BsModalService],
})
export class DepartmentListComponent {
  departments!: Departamento[];
  modalRef?: BsModalRef

  constructor(
    private router: Router,
    private departmentService: DepartmentListService,
    private modalService: BsModalService,

  ) {}

  ngOnInit() {
    this.getDepartments();
  }

  getDepartments() {
    this.departmentService.getDepartments().subscribe((res: any) => {
      this.departments = res
    });
  }

  back() {
    this.router.navigate(['/home']);
  }
  alter() {
    throw new Error('Method not implemented.');
  }
  exclude(department: any) {
    const id = department.id
    Swal.fire({
      icon: 'warning',
      title: 'Confirmar Exclusão',
      text: 'Tem certeza que deseja excluir?',
      confirmButtonText: 'Sim, excluir',
      showCancelButton: true,
      cancelButtonText: 'Não, voltar'
    }).then(res => {
      if(res.isConfirmed){
        this.departmentService.deleteDepartment(id).subscribe(res => {
          Swal.fire({
            title: 'Sucesso',
            text: 'Departamento excluido com sucesso',
            icon: 'success',
            showConfirmButton: true

          }).then(res => {
            if(res.isConfirmed){
              window.location.reload()
            }
          })
        })
      }
    })

  }
  newDepartment() {
    this.modalRef = this.modalService.show(DepartmentRegisterComponent)
  }
}
