import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatTableDataSource } from '@angular/material/table';
import { RutaService } from '../../services/ruta.service';
import { RutasFormularioComponent } from '../../modals/rutas-formulario/rutas-formulario.component'; 
import * as alertify from 'alertifyjs'
import { ModalAsignacionRutaParadaData } from '../../interfaces/modal-asignacion-ruta-parada-data';
import { AsignacionRutaParadaComponent } from '../../modals/asignacion-ruta-parada/asignacion-ruta-parada.component';
import { RutaConParadasInterface } from '../../interfaces/ruta-con-paradas-interface';
import { DataInterface } from 'src/app/shared/interfaces/types';
import { ButtonClickData } from 'src/app/shared/interfaces/button-click-data';
import { BotonTabla } from 'src/app/shared/interfaces/boton-tabla';

@Component({
  selector: 'app-rutas-crud',
  templateUrl: './rutas-crud.component.html',
  styleUrls: ['./rutas-crud.component.css']
})
export class RutasCrudComponent implements OnInit {
  constructor(private dialog: MatDialog, private rutaService: RutaService) { }

  // @ViewChild(MatPaginator) _paginator!:MatPaginator;
  // @ViewChild(MatSort) _sort!:MatSort;
  rutadata!: RutaConParadasInterface[];
  headerComponent: string = "Rutas";
  finaldata!: MatTableDataSource<DataInterface>;
  displayColumns: string[] = ["id", "nombre", "origen", "destino", "paradas", "action"]
  headerColumns: string[] = ["ID", "Nombre", "Origen", "Destino", "Paradas", "Acciones"];

  botones: BotonTabla[] = [
    { nombre: 'Editar', accion: 'editar', color: "primary", visible: () => true },
    { nombre: 'Eliminar', accion: 'eliminar', color: "accent", visible: () => true },
    { nombre: 'Asignar paradas', accion: 'asignar', color: "primary", visible: () => true },
    { 
      nombre: 'Eliminar paradas', accion: 'eliminarAsignacion', color: "accent", 
      visible: (element?: DataInterface) => {
        if(element){
          if ('paradasDTO' in element) {
            return !!element.paradasDTO[0]?.id
          }
        }
        return false;
      }
    }
  ];
  
  ngOnInit(): void {
    this.CargarRutas();
  }

  onButtonTableClicked(argumento: ButtonClickData) {
    switch (argumento.buttonInfo.accion) {
      case 'editar':
        this.EditarRuta(argumento.id);
        break;
      case 'eliminar':
        this.EliminarRuta(argumento.id)
        break;
      case 'asignar':
        this.AgregarAsignacionRutaParada(argumento.id)
        break;
      case 'eliminarAsignacion':
      this.EliminarAsignacionRutaParada(argumento.id)
      break;
      default:
        break;
    }
  }

  onButtonAddClick(){
    this.AbrirFormularioRuta();
  }

  applyFilter(filterValue: string) {
    this.finaldata.filter = filterValue.trim().toLowerCase();
    if (this.finaldata.paginator) {
      this.finaldata.paginator.firstPage();
    }
    const filterNombre = filterValue.trim().toLowerCase();
    this.finaldata.filterPredicate = (data: DataInterface, filter: string) => {
      if ('nombre' in data) {
        const nombre = data.nombre.trim().toLowerCase();
        return nombre.includes(filter);
      }
      return false;
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
      this.finaldata=new MatTableDataSource<DataInterface>(this.rutadata);
      // this.finaldata.paginator=this._paginator;
      // this.finaldata.sort=this._sort;
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
