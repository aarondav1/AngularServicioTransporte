import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BusesCrudComponent } from "./pages/buses-crud/buses-crud.component";


const rutas: Routes = [
    {
        path: '',
        children: [
            { path: 'crud', component: BusesCrudComponent },
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
  export class BusesRoutingModule { }