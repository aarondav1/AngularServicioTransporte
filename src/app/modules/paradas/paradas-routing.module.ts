import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ParadasCrudComponent } from "./pages/paradas-crud/paradas-crud.component";


const rutas: Routes = [
    {
        path: '',
        children: [
            { path: 'crud', component: ParadasCrudComponent },
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
export class ParadasRoutingModule { }
