import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RutaInterface } from 'src/app/modules/rutas/interfaces/ruta-interface';
import { RutaService } from 'src/app/modules/rutas/services/ruta.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AsignacionBusRutaService } from '../../services/asignacion-bus-ruta.service';
import * as alertify from 'alertifyjs'
import { BusService } from '../../services/bus.service';
import { ModalAsignacionData } from '../../interfaces/modal-asignacion-data';

@Component({
  selector: 'app-asignacion-bus-ruta',
  templateUrl: './asignacion-bus-ruta.component.html',
  styleUrls: ['./asignacion-bus-ruta.component.css'],
})
export class AsignacionBusRutaComponent implements OnInit {
  @ViewChild(MatPaginator) _paginator!:MatPaginator;
  @ViewChild(MatSort) _sort!:MatSort;
  nombreBusqueda!: string;
  rutadata!: RutaInterface[];
  finaldata!: MatTableDataSource<RutaInterface>;
  selection = new SelectionModel<RutaInterface>(true, []);
  displayColums: string[] = ["select", "nombre", "origen", "destino"]
  hasSelection = false;
  
  constructor(private rutaService: RutaService, private asignacionService:
     AsignacionBusRutaService, private dialog: MatDialog, private busService: BusService ,
     @Inject(MAT_DIALOG_DATA) public data: ModalAsignacionData) {}

  ngOnInit(): void {
    if(this.data.modo == 'agregar'){
      this.CargarRutasNoAsociadas();
    }

    if(this.data.modo == 'eliminar'){
      this.CargarRutasAsociadas();
    }  
  }
  onSelectionChange() {
    this.hasSelection = this.selection.selected.length > 0;
  }
  CargarRutasNoAsociadas(){
    this.busService.GetBusConRutasNoAsociadas(this.data.idBus).subscribe(response => {
      this.rutadata = response.rutasDTO;
      this.finaldata=new MatTableDataSource<RutaInterface>(this.rutadata);
      this.finaldata.paginator=this._paginator;
      this.finaldata.sort=this._sort;
    });
  };

  CargarRutasAsociadas(){
    this.busService.GetBusConRutasAsociadas(this.data.idBus).subscribe(response => {
      this.rutadata = response.rutasDTO;
      this.finaldata=new MatTableDataSource<RutaInterface>(this.rutadata);
      this.finaldata.paginator=this._paginator;
      this.finaldata.sort=this._sort;
    });
  };

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.finaldata.data.forEach(row => this.selection.select(row));
    this.onSelectionChange();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.finaldata.data.length;
    return numSelected === numRows;
  }
  onClose(){
    this.dialog.closeAll();
  }
  
  onAccept() {
    const selectedIds = this.selection.selected.map(row => row.id);
    
    if(this.data.modo == 'agregar'){
      this.asignacionService.AgregarAsignacionesBusRuta(this.data.idBus, selectedIds).subscribe(
        (response: any) => {
          this.CargarRutasNoAsociadas();
          alertify.success(response.message);
        },
        error => {
          alertify.error(error);
        }
      );      
    }

    else if(this.data.modo == 'eliminar'){
      this.asignacionService.EliminarAsignacionesBusRuta(this.data.idBus, selectedIds).subscribe(
        r => {
          this.CargarRutasAsociadas();
          alertify.success(r);
        },
        error => {
          alertify.error(error.error);
        }
      );
    }
    this.dialog.closeAll();
  }
    
  
}
