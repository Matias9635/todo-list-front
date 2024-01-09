import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter, RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    HttpClientModule,
    NgbModule,
    LayoutModule
  ],
  providers: [provideRouter(AppRoutes)],
  bootstrap: [AppComponent]
})
export class AppModule { }
