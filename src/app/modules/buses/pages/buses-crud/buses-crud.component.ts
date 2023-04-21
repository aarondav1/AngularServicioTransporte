import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { BusService } from '../../services/bus.service';
import { BusesFormularioComponent } from '../../modals/buses-formulario/buses-formulario.component';
import * as alertify from 'alertifyjs'
import { BusConRutasInterface } from '../../interfaces/BusConRutas-interface';
import { AsignacionBusRutaComponent } from '../../modals/asignacion-bus-ruta/asignacion-bus-ruta.component';
import { ModalAsignacionData } from '../../interfaces/modal-asignacion-data';
import { BotonTabla } from 'src/app/shared/interfaces/boton-tabla';
import { DataInterface } from 'src/app/shared/interfaces/types';
import { ButtonClickData } from 'src/app/shared/interfaces/button-click-data';

@Component({
  selector: 'app-buses-crud',
  templateUrl: './buses-crud.component.html',
  styleUrls: ['./buses-crud.component.css']
})
export class BusesCrudComponent implements OnInit {
  constructor(private dialog: MatDialog, private busService: BusService) { }

  // @ViewChild(MatPaginator) _paginator!:MatPaginator;
  // @ViewChild(MatSort) _sort!:MatSort;
  headerComponent: string = "Buses";
  busdata!: BusConRutasInterface[];
  finaldata!: MatTableDataSource<DataInterface>;
  displayColumns: string[] = ["id", "numero", "placa", "modelo", "capacidad", "anio", "rutas", "action"]
  headerColumns: string[] = ["ID", "Numero", "Placa", "Modelo", "Capacidad", "Año", "Rutas", "Acciones"]
  botones: BotonTabla[] = [
    { nombre: 'Editar', accion: 'editar', color: "primary", visible: () => true },
    { nombre: 'Eliminar', accion: 'eliminar', color: "accent", visible: () => true },
    { nombre: 'Asignar rutas', accion: 'asignar', color: "primary", visible: () => true },
    { 
      nombre: 'Eliminar rutas', accion: 'eliminarAsignacion', color: "accent", 
      visible: (element?: DataInterface) => {
        if(element){
          if ('rutasDTO' in element) {
            return !!element.rutasDTO[0]?.id
          }
        }
        return false;
      }
    }
  ];
  
  ngOnInit(): void {
    this.CargarBuses();
  }

  onButtonTableClicked(argumento: ButtonClickData) {
    switch (argumento.buttonInfo.accion) {
      case 'editar':
        this.EditarBus(argumento.id);
        break;
      case 'eliminar':
        this.EliminarBus(argumento.id)
        break;
      case 'asignar':
        this.AgregarAsignacionBusRuta(argumento.id)
        break;
      case 'eliminarAsignacion':
        this.EliminarAsignacionBusRuta(argumento.id)
        break;
      default:
        break;
    }
  }

  onButtonAddClick(){
    this.AbrirFormularioBus();
  }

  applyFilter(filterValue: string) {
    this.finaldata.filter = filterValue.trim().toLowerCase();
    if (this.finaldata.paginator) {
      this.finaldata.paginator.firstPage();
    }
    const filterPlaca = filterValue.trim().toLowerCase(); 
    this.finaldata.filterPredicate = (data: DataInterface, filter: string) => {
      if ('placa' in data) {
      const placa = data.placa.trim().toLowerCase();
      const filterPlaca = filter.trim().toLowerCase();
      return placa.includes(filterPlaca);
      }
      return false;
    };
    this.finaldata.filter = filterPlaca;
  }

  AbrirFormularioBus(id?: number) {
    const busForm = this.dialog.open(BusesFormularioComponent, {
      width: '500px',
      data: {
        id: id
      }
    })
    busForm.afterClosed().subscribe(r => {
      this.CargarBuses();
    });
  }

  CargarBuses() {
    this.busService.ListarBuses().subscribe(response => {
      this.busdata = response;
      this.finaldata=new MatTableDataSource<DataInterface>(this.busdata);
      // this.finaldata.paginator=this._paginator;
      // this.finaldata.sort=this._sort;
    });
  }

  EditarBus(id: number){
    this.AbrirFormularioBus(id);
  };

  EliminarBus(id: number) {
    alertify.confirm("Eliminar bus", "Seguro que quiere eliminar este bus?", () => {
      this.busService.EliminarBus(id).subscribe(
        r => {
          this.CargarBuses();
          alertify.success(r);
        },
        error => {
          alertify.error(error.error); // Mostrar el mensaje de error devuelto por la API utilizando Alertify
        }
      );
    }, function () {})
   }

   AgregarAsignacionBusRuta(id: number){
    const datos: ModalAsignacionData = {
      idBus: id,
      modo: 'agregar'
    }
    const modal = this.dialog.open(AsignacionBusRutaComponent, {
      width: '1000px',
      data: datos
    })
    modal.afterClosed().subscribe(r => {
      this.CargarBuses();
    });
   }

   EliminarAsignacionBusRuta(id: number){
    const datos: ModalAsignacionData = {
      idBus: id,
      modo: 'eliminar'
    }
    const modal = this.dialog.open(AsignacionBusRutaComponent, {
      width: '1000px',
      data: datos
    })
    modal.afterClosed().subscribe(r => {
      this.CargarBuses();
    });
   }
}
