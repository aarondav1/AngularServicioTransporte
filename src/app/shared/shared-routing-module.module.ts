import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';


const rutas: Routes = [
  {
    path: '404', component: ErrorPageComponent  
  }
];


@NgModule({
  imports: [
      RouterModule.forChild(rutas)
  ],
  exports: [
      RouterModule
  ]
})
export class SharedRoutingModuleModule { }
