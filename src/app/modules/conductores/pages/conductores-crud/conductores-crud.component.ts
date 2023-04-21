import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { ConductorService } from '../../services/conductor.service';
import { ConductoresFormularioComponent } from '../../modals/conductores-formulario/conductores-formulario.component';
import * as alertify from 'alertifyjs'
import { ConductorConBusInterface } from '../../interfaces/ConductorConBus-interface';
import { AsignacionBusConductorService } from '../../services/asignacion-bus-conductor.service';
import { AsignacionBusConductorFormularioComponent } from '../../modals/asignacion-bus-conductor-formulario/asignacion-bus-conductor-formulario.component';

import { DataInterface } from 'src/app/shared/interfaces/types';
import { BotonTabla } from 'src/app/shared/interfaces/boton-tabla';
import { ButtonClickData } from 'src/app/shared/interfaces/button-click-data';

@Component({
  selector: 'app-conductores-crud',
  templateUrl: './conductores-crud.component.html',
  styleUrls: ['./conductores-crud.component.css']
})
export class ConductoresCrudComponent implements OnInit {

  constructor(private dialog: MatDialog, private api: ConductorService,
    private asignacionServicio: AsignacionBusConductorService) { }
    
  // @ViewChild(MatPaginator) _paginator!:MatPaginator;
  // @ViewChild(MatSort) _sort!:MatSort;
  headerComponent: string = "Conductores";
  conductordata!: ConductorConBusInterface[];
  finaldata!: MatTableDataSource<DataInterface>;
  displayColumns: string[] = ["id", "nombres", "apellidos", "cedula", "id_Tipo_Licencia", "placa_Bus", "action"]
  headerColumns: string[] = ["ID", "Nombres", "Apellidos", "Cedula", "Licencia", "Placa Bus", "Acciones"]

  botones: BotonTabla[] = [
    { nombre: 'Editar', accion: 'editar', color: "primary", visible: () => true },
    { nombre: 'Eliminar', accion: 'eliminar', color: "accent", visible: () => true },
    {
      nombre: 'Asignar bus',
      accion: 'asignar',
      color: "primary",
      visible: (element?: DataInterface) => {
        if(element){
          if ('busesDTO' in element) {
            return !element.busesDTO[0]?.id;
          }
        }
        return false;
      }
    },
    { 
      nombre: 'Eliminar bus',
      accion: 'eliminarAsignacion',
      color: "accent",
      visible: (element?: DataInterface) => {
        if(element){
          if ('busesDTO' in element) {
            return !!element.busesDTO[0]?.id;
          }
        }
        return false;
      }
    }
  ];

  ngOnInit(): void {
    this.CargarConductores();
  }

  onButtonTableClicked(argumento: ButtonClickData) {
    switch (argumento.buttonInfo.accion) {
      case 'editar':
        this.EditarConductor(argumento.id);
        break;
      case 'eliminar':
        this.EliminarConductor(argumento.id)
        break;
      case 'asignar':
        this.AgregarAsignacionBusConductor(argumento.id)
        break;
      case 'eliminarAsignacion':
        this.EliminarBus(argumento.id)
        break;
      default:
        break;
    }
  }

  onButtonAddClick(){
    this.AbrirFormularioConductor();
  }

  applyFilter(filterValue: string) {
    this.finaldata.filter = filterValue.trim().toLowerCase();
    if (this.finaldata.paginator) {
      this.finaldata.paginator.firstPage();
    }
    const filterCedula = filterValue.trim().toLowerCase();
    this.finaldata.filterPredicate = (data: DataInterface, filter: string) => {
      if ('cedula' in data) {
        const cedula = data.cedula.trim().toLowerCase();
        const filterCedula = filter.trim().toLowerCase();
        return cedula.includes(filterCedula);
      }
      return false;
    };
    this.finaldata.filter = filterCedula;
  }

  AbrirFormularioConductor(id?: number) {
    const modal = this.dialog.open(ConductoresFormularioComponent, {
      width: '500px',
      data: {
        id: id
      }
    })
    modal.afterClosed().subscribe(r => {
      this.CargarConductores();
    });
  }

  CargarConductores() {
    this.api.ListarConductores().subscribe(response => {
      this.conductordata = response;
      this.finaldata=new MatTableDataSource<DataInterface>(this.conductordata);
      // this.finaldata.paginator=this._paginator;
      // this.finaldata.sort=this._sort;
    });
  }

  EditarConductor(id: number) {
    this.AbrirFormularioConductor(id);
  }
  
  EliminarConductor(id: number) {
  alertify.confirm("Eliminar conductor", "Seguro que quiere eliminar este conductor?", () => {
    this.api.EliminarConductor(id).subscribe(
      r => {
        this.CargarConductores();
        alertify.success(r);
      },
      error => {
        alertify.error(error.error);
      }
    );
  }, function () {})
 }

  EliminarBus(idConductor: number){
    alertify.confirm("Eliminar bus", "Seguro que quiere eliminar la asociacion a este bus?", () => {
      this.asignacionServicio.EliminarAsignacionBusConductor(idConductor).subscribe(
        r => {
          this.CargarConductores();
          alertify.success(r);
        },
        error => {
          alertify.error(error.error);
        }
      );
    }, function () {})
  }

  AgregarAsignacionBusConductor(id?: number) {
    const modal = this.dialog.open(AsignacionBusConductorFormularioComponent, {
      width: '500px',
      data: {
        id: id
      }
    })
    modal.afterClosed().subscribe(r => {
      this.CargarConductores();
    });
  }
}
