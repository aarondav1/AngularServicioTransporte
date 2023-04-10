import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RutaInterface } from '../../interfaces/ruta-interface';
import { RutaService } from '../../services/ruta.service';
import { RutasFormularioComponent } from '../../modals/rutas-formulario/rutas-formulario.component'; 
import * as alertify from 'alertifyjs'
import { RutaConParadasInterface } from '../../interfaces/ruta-con-paradas-interface';
import { ModalAsignacionRutaParadaData } from '../../interfaces/modal-asignacion-ruta-parada-data';
import { AsignacionRutaParadaComponent } from '../../modals/asignacion-ruta-parada/asignacion-ruta-parada.component';

@Component({
  selector: 'app-rutas-crud',
  templateUrl: './rutas-crud.component.html',
  styleUrls: ['./rutas-crud.component.css']
})
export class RutasCrudComponent implements OnInit {
  constructor(private dialog: MatDialog, private rutaService: RutaService) { }

  @ViewChild(MatPaginator) _paginator!:MatPaginator;
  @ViewChild(MatSort) _sort!:MatSort;
  nombreBusqueda!: string;
  rutadata!: RutaConParadasInterface[];
  finaldata!: MatTableDataSource<RutaConParadasInterface>;
  displayColums: string[] = ["id", "nombre", "origen", "destino", "paradas", "action"]

  ngOnInit(): void {
    this.CargarRutas();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.finaldata.filter = filterValue.trim().toLowerCase();
    if (this.finaldata.paginator) {
      this.finaldata.paginator.firstPage();
    }
    const filterNombre = filterValue.trim().toLowerCase();
    this.finaldata.filterPredicate = (data: { nombre: string; }, filter: string) => {
      const nombre = data.nombre.trim().toLowerCase();
      return nombre.includes(filter);
    };
    this.finaldata.filter = filterNombre;
  }

  AbrirFormularioRuta(id?: number) {
    const busForm = this.dialog.open(RutasFormularioComponent, {
      width: '500px',
      data: {
        id: id
      }
    })
    busForm.afterClosed().subscribe(r => {
      this.CargarRutas();
    });
  }

  CargarRutas(){
    this.rutaService.ListarRutas().subscribe(response => {
      this.rutadata = response;
      this.finaldata=new MatTableDataSource<RutaConParadasInterface>(this.rutadata);
      this.finaldata.paginator=this._paginator;
      this.finaldata.sort=this._sort;
    });
  };
  
  EditarRuta(id: number){
    this.AbrirFormularioRuta(id);
  };

  EliminarRuta(id: number){
    alertify.confirm("Eliminar ruta", "Seguro que quiere eliminar esta ruta?", () => {
      this.rutaService.EliminarRuta(id).subscribe(
        r => {
          this.CargarRutas();
          alertify.success(r);
        },
        error => {
          alertify.error(error.error);
        }
      );
    }, function () {})
  };

  AgregarAsignacionRutaParada(id: number){
    const datos: ModalAsignacionRutaParadaData = {
      idRuta: id,
      modo: 'agregar'
    }
    const modal = this.dialog.open(AsignacionRutaParadaComponent, {
      width: '500px',
      data: datos
    })
    modal.afterClosed().subscribe(r => {
      this.CargarRutas();
    });
  }
  
  EliminarAsignacionRutaParada(id: number){
    const datos: ModalAsignacionRutaParadaData = {
      idRuta: id,
      modo: 'eliminar'
    }
    const modal = this.dialog.open(AsignacionRutaParadaComponent, {
      width: '500px',
      data: datos
    })
    modal.afterClosed().subscribe(r => {
      this.CargarRutas();
    });
  }
}
