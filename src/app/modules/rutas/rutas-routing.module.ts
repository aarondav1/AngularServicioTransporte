import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RutasCrudComponent } from "./pages/rutas-crud/rutas-crud.component";


const rutas: Routes = [
    {
        path: '',
        children: [
            { path: 'crud', component: RutasCrudComponent },
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
export class RutasRoutingModule { }
