import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterOutlet } from '@angular/router';



@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    RouterOutlet,
    CommonModule
  ]
})
export class LayoutModule { }
