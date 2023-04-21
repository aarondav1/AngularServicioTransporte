import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatTableDataSource } from '@angular/material/table';
import { ParadaInterface } from '../../interfaces/parada-interface';
import { ParadaService } from '../../services/parada.service';
import { ParadasFormularioComponent } from '../paradas-formulario/paradas-formulario.component';
import * as alertify from 'alertifyjs'
import { DataInterface } from 'src/app/shared/interfaces/types';
import { BotonTabla } from 'src/app/shared/interfaces/boton-tabla';
import { ButtonClickData } from 'src/app/shared/interfaces/button-click-data';

@Component({
  selector: 'app-paradas-crud',
  templateUrl: './paradas-crud.component.html',
  styleUrls: ['./paradas-crud.component.css']
})
export class ParadasCrudComponent implements OnInit {
  constructor(private dialog: MatDialog, private paradaService: ParadaService) { }

  // @ViewChild(MatPaginator) _paginator!:MatPaginator;
  // @ViewChild(MatSort) _sort!:MatSort;
  headerComponent: string = "Paradas";
  paradadata!: ParadaInterface[];
  finaldata!: MatTableDataSource<DataInterface>;
  displayColumns: string[] = ["id", "direccion", "action"];
  headerColumns: string[] = ["ID", "Direccion", "Acciones"];

  botones: BotonTabla[] = [
    { nombre: 'Editar', accion: 'editar', color: "primary", visible: () => true },
    { nombre: 'Eliminar', accion: 'eliminar', color: "accent", visible: () => true }
  ]
  
  ngOnInit(): void {
    this.CargarParadas();
  }

  onButtonTableClicked(argumento: ButtonClickData) {
    switch (argumento.buttonInfo.accion) {
      case 'editar':
        this.EditarParada(argumento.id);
        break;
      case 'eliminar':
        this.EliminarParada(argumento.id)
        break;
      default:
        break;
    }
  }

  onButtonAddClick(){
    this.AbrirFormularioParada();
  }

  applyFilter(filterValue: string) {
    this.finaldata.filter = filterValue.trim().toLowerCase();
    if (this.finaldata.paginator) {
      this.finaldata.paginator.firstPage();
    }
    const filterDireccion = filterValue.trim().toLowerCase();
    this.finaldata.filterPredicate = (data: DataInterface, filter: string) => {
      if ('direccion' in data) {
        const direccion = data.direccion.trim().toLowerCase();
        return direccion.includes(filter);
      }
      return false;
    };
    this.finaldata.filter = filterDireccion;
  }

  AbrirFormularioParada(id?: number) {
    const paradaForm = this.dialog.open(ParadasFormularioComponent, {
      width: '500px',
      data: {
        id: id
      }
    })
    paradaForm.afterClosed().subscribe(r => {
      this.CargarParadas();
    });
  }

  CargarParadas(){
    this.paradaService.ListarParadas().subscribe(response => {
      this.paradadata = response;
      this.finaldata=new MatTableDataSource<DataInterface>(this.paradadata);
      // this.finaldata.paginator=this._paginator;
      // this.finaldata.sort=this._sort;
    });
  }

  EditarParada(id: number){
    this.AbrirFormularioParada(id);
  }

  EliminarParada(id: number){
    alertify.confirm("Eliminar parada", "Seguro que quiere eliminar esta parada?", () => {
      this.paradaService.EliminarParada(id).subscribe(
        r => {
          this.CargarParadas();
          alertify.success(r);
        },
        error => {
          alertify.error(error.error);
        }
      );
    }, function () {})
  }

}
