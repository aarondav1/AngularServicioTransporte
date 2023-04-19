import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { SidenavComponent } from './home/sidenav/sidenav.component';



const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
  },
  {
    path: '', component: SidenavComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    children: [{
      path: 'buses',
      loadChildren: () => import('./modules/buses/buses.module').then( m => m.BusesModule ),
    },
    {
      path: 'conductores',
      loadChildren: () => import('./modules/conductores/conductores.module').then( m => m.ConductoresModule ),
    },
    {
      path: 'paradas',
      loadChildren: () => import('./modules/paradas/paradas.module').then( m => m.ParadasModule ),
    },
    {
      path: 'rutas',
      loadChildren: () => import('./modules/rutas/rutas.module').then( m => m.RutasModule ),
    }]
  }
  ,
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
