import { Routes } from '@angular/router';
import { ExpenseComponent } from './pages/expense/expense.component';
import { ExpenseFormComponent } from './pages/expense-form/expense-form.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: ExpenseComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'expense-form',
    component: ExpenseFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'expense-form/:id',
    component: ExpenseFormComponent,
  },
];
