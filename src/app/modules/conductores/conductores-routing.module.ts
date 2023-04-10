import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConductoresCrudComponent } from "./pages/conductores-crud/conductores-crud.component";


const rutas: Routes = [
    {
        path: '',
        children: [
            { path: 'crud', component: ConductoresCrudComponent },
            { path: '**', redirectTo: 'crud' }
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
export class ConductoresRoutingModule { }
