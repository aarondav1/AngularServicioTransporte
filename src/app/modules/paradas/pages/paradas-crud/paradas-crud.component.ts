import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ParadaInterface } from '../../interfaces/parada-interface';
import { ParadaService } from '../../services/parada.service';
import { ParadasFormularioComponent } from '../paradas-formulario/paradas-formulario.component';
import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-paradas-crud',
  templateUrl: './paradas-crud.component.html',
  styleUrls: ['./paradas-crud.component.css']
})
export class ParadasCrudComponent implements OnInit {
  constructor(private dialog: MatDialog, private paradaService: ParadaService) { }

  @ViewChild(MatPaginator) _paginator!:MatPaginator;
  @ViewChild(MatSort) _sort!:MatSort;
  idBusqueda?: number;
  paradadata!: ParadaInterface[];
  finaldata!: MatTableDataSource<ParadaInterface>;
  displayColums: string[] = ["id", "direccion", "action"]

  ngOnInit(): void {
    this.CargarParadas();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.finaldata.filter = filterValue.trim().toLowerCase();
    if (this.finaldata.paginator) {
      this.finaldata.paginator.firstPage();
    }
    const filterDireccion = filterValue.trim().toLowerCase();
    this.finaldata.filterPredicate = (data: { direccion: string; }, filter: string) => {
      const direccion = data.direccion.trim().toLowerCase();
      return direccion.includes(filter);
    };
    this.finaldata.filter = filterDireccion;
  }

  BuscarParadas(idBusqueda: number){
    this.paradaService.GetParada(idBusqueda).subscribe(response => {
      const parada = response;
      this.finaldata = new MatTableDataSource<ParadaInterface>([parada]);
      this.finaldata.paginator=this._paginator;
      this.finaldata.sort=this._sort;
    });
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
      this.finaldata=new MatTableDataSource<ParadaInterface>(this.paradadata);
      this.finaldata.paginator=this._paginator;
      this.finaldata.sort=this._sort;
    });
  };
  EditarParada(id: number){
    this.AbrirFormularioParada(id);
  };
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
  };
}
