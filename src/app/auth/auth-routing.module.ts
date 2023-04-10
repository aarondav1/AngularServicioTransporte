import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";


const rutas: Routes = [
    {
        path: '',
        children: [
            { path: 'ingresar', component: LoginComponent },
            { path: '**', redirectTo: 'ingresar' }
        ]
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
export class AuthRoutingModule { }
