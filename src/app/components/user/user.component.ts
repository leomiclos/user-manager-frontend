import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from './user.service';

interface User {
  id: number;
  name: string;
  dateOfBirth: string;
  department: string;
}

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  providers: [UserService]
})
export class UserComponent {
  users: User[] = [
    { id: 1, name: 'John Doe', dateOfBirth: '1990-01-01', department: 'HR' },
    { id: 2, name: 'Jane Smith', dateOfBirth: '1985-05-15', department: 'IT' },
  ];

  constructor(
    private router: Router,
    private userService: UserService
  ){}

  ngOnInit(){
    this.getUser()
  }

  alter() {
    throw new Error('Method not implemented.');
  }
  exclude() {
    throw new Error('Method not implemented.');
  }
  newUser() {
    throw new Error('Method not implemented.');
  }

  getUser(){
    this.userService.getUser().subscribe(res => {
      console.log(res);

    })
  }
  back(){
    this.router.navigate(['/home'])
  }
}
