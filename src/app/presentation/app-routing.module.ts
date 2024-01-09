//import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'tasks',
        loadChildren: () => import('./task/task.module').then(m => m.TaskModule)
      }
    ]
  }
];