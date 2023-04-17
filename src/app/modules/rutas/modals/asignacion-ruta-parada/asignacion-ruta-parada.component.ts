import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as alertify from 'alertifyjs'
import { ParadaInterface } from 'src/app/modules/paradas/interfaces/parada-interface';
import { ParadaService } from 'src/app/modules/paradas/services/parada.service';
import { AsignacionResponse } from 'src/app/shared/interfaces/asignacion-response';
import { ModalAsignacionRutaParadaData } from '../../interfaces/modal-asignacion-ruta-parada-data';
import { AsignacionRutaParadaService } from '../../services/asignacion-ruta-parada.service';
import { RutaService } from '../../services/ruta.service';

@Component({
  selector: 'app-asignacion-ruta-parada',
  templateUrl: './asignacion-ruta-parada.component.html',
  styleUrls: ['./asignacion-ruta-parada.component.css']
})
export class AsignacionRutaParadaComponent implements OnInit {
  @ViewChild(MatPaginator) _paginator!:MatPaginator;
  @ViewChild(MatSort) _sort!:MatSort;
  nombreBusqueda!: string;
  paradadata!: ParadaInterface[];
  finaldata!: MatTableDataSource<ParadaInterface>;
  selection = new SelectionModel<ParadaInterface>(true, []);
  displayColums: string[] = ["select", "id", "direccion"]
  hasSelection = false;
  
  constructor(private paradaService: ParadaService, private asignacionService:
     AsignacionRutaParadaService, private dialog: MatDialog, private rutaService: RutaService,
     @Inject(MAT_DIALOG_DATA) public data: ModalAsignacionRutaParadaData) {}

  ngOnInit(): void {
    if(this.data.modo == 'agregar'){
      this.CargarParadasNoAsociadas();
    }

    if(this.data.modo == 'eliminar'){
      this.CargarParadasAsociadas();
    }  
  }
  onSelectionChange() {
    this.hasSelection = this.selection.selected.length > 0;
  }
  CargarParadasNoAsociadas(){
    this.rutaService.GetRutaConParadasNoAsociadas(this.data.idRuta).subscribe(response => {
      this.paradadata = response.paradasDTO;
      this.finaldata=new MatTableDataSource<ParadaInterface>(this.paradadata);
      this.finaldata.paginator=this._paginator;
      this.finaldata.sort=this._sort;
    });
  };

  CargarParadasAsociadas(){
    this.rutaService.GetRutaConParadasAsociadas(this.data.idRuta).subscribe(response => {
      this.paradadata = response.paradasDTO;
      this.finaldata=new MatTableDataSource<ParadaInterface>(this.paradadata);
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
      this.asignacionService.AgregarAsignacionesRutaParada(this.data.idRuta, selectedIds).subscribe(
        (response: AsignacionResponse) => {
          this.CargarParadasNoAsociadas();
          alertify.success(response.message);
        },
        (error: AsignacionResponse) => {
          alertify.error(error.error);
        }
      );      
    }
    else if(this.data.modo == 'eliminar'){
      this.asignacionService.EliminarAsignacionesRutaParada(this.data.idRuta, selectedIds).subscribe(
        r => {
          this.CargarParadasAsociadas();
          alertify.success(r);
        },
        error => {
          alertify.error(error.error);
        }
      );
    }
    this.dialog.closeAll();
  }
    
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.finaldata.filter = filterValue.trim().toLowerCase();
    if (this.finaldata.paginator) {
      this.finaldata.paginator.firstPage();
    }
    const filterParada = filterValue.trim().toLowerCase(); 
    this.finaldata.filterPredicate = (data: ParadaInterface, filter: string) => {
      const parada = data.direccion.trim().toLowerCase();
      const filterParada = filter.trim().toLowerCase();
      return parada.includes(filterParada);
    };
    this.finaldata.filter = filterParada;
  }

}
