import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserComponent } from './components/user/user.component';
import { DepartmentRegisterComponent } from './components/department-register/department-register.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'user-register', component: UserRegisterComponent},
      { path: 'user-list', component: UserComponent},
      { path: 'department-register', component: DepartmentRegisterComponent},
      { path: 'department-list', component: DepartmentListComponent}

    ]
  },

];
