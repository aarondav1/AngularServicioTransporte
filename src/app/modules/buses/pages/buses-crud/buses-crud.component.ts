import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { BusService } from '../../services/bus.service';
import { BusesFormularioComponent } from '../../modals/buses-formulario/buses-formulario.component';
import * as alertify from 'alertifyjs'
import { BusConRutasInterface } from '../../interfaces/BusConRutas-interface';
import { AsignacionBusRutaComponent } from '../../modals/asignacion-bus-ruta/asignacion-bus-ruta.component';
import { ModalAsignacionData } from '../../interfaces/modal-asignacion-data';

@Component({
  selector: 'app-buses-crud',
  templateUrl: './buses-crud.component.html',
  styleUrls: ['./buses-crud.component.css']
})
export class BusesCrudComponent implements OnInit {
  constructor(private dialog: MatDialog, private busService: BusService) { }

  @ViewChild(MatPaginator) _paginator!:MatPaginator;
  @ViewChild(MatSort) _sort!:MatSort;
  idBusqueda?: number;
  busdata!: BusConRutasInterface[];
  finaldata!: MatTableDataSource<BusConRutasInterface>;
  displayColums: string[] = ["id", "numero", "placa", "modelo", "capacidad", "anio", "rutas", "action"]

  ngOnInit(): void {
    this.CargarBuses();
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.finaldata.filter = filterValue.trim().toLowerCase();
    if (this.finaldata.paginator) {
      this.finaldata.paginator.firstPage();
    }
    const filterPlaca = filterValue.trim().toLowerCase(); 
    this.finaldata.filterPredicate = (data: BusConRutasInterface, filter: string) => {
      const placa = data.placa.trim().toLowerCase();
      const filterPlaca = filter.trim().toLowerCase();
      return placa.includes(filterPlaca);
    };
    this.finaldata.filter = filterPlaca;
  }

  BuscarBuses(idBusqueda: number){
    this.busService.GetBusConRutasAsociadas(idBusqueda).subscribe(response => {
      const bus = response;
      this.finaldata = new MatTableDataSource<BusConRutasInterface>([bus]);
      this.finaldata.paginator=this._paginator;
      this.finaldata.sort=this._sort;
    });
  }

  CargarBuses() {
    this.busService.ListarBuses().subscribe(response => {
      this.busdata = response;
      this.finaldata=new MatTableDataSource<BusConRutasInterface>(this.busdata);
      this.finaldata.paginator=this._paginator;
      this.finaldata.sort=this._sort;
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
