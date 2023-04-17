import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RutaInterface } from '../../interfaces/ruta-interface';
import { RutaService } from '../../services/ruta.service';
import * as alertify from 'alertifyjs'
import { RutaConParadasInterface } from '../../interfaces/ruta-con-paradas-interface';

@Component({
  selector: 'app-rutas-formulario',
  templateUrl: './rutas-formulario.component.html',
  styleUrls: ['./rutas-formulario.component.css']
})
export class RutasFormularioComponent implements OnInit {

  constructor(private builder: FormBuilder, private dialog: MatDialog, 
    private rutaService: RutaService, @Inject(MAT_DIALOG_DATA) public data: {id: number}) { }

  editdata!: RutaConParadasInterface;
  rutaForm=this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    id_estado: this.builder.control({ value: '', disabled: true }),
    nombre: this.builder.control('', Validators.required),
    origen: this.builder.control('', Validators.required),
    destino: this.builder.control('', Validators.required),
  });

  ngOnInit(): void {
    if (this.data.id != null) {
      this.rutaService.GetRuta(this.data.id).subscribe(response => {
        this.editdata = response;
        this.rutaForm.setValue({
          id: this.editdata.id, id_estado: this.editdata.id_Estado,
          nombre: this.editdata.nombre, origen: this.editdata.origen,
          destino: this.editdata.destino, 
        });
      });
    }
  }

  AgregarRuta() {
    if (this.rutaForm.valid) {
      const Editid = this.rutaForm.getRawValue().id;
      if (Editid != '' && Editid != null) {
        this.rutaService.ActualizarRuta(Editid, this.rutaForm.getRawValue()).subscribe(response => {
          this.CerrarFormulario();
          alertify.success(response);
        });
      } else {
        this.rutaService.PostRuta(this.rutaForm.value).subscribe(response => {
          this.CerrarFormulario();
          alertify.success(response);
        });
      }
    }
  }

  CerrarFormulario(){
    this.dialog.closeAll();
  }

}
