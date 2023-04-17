import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ParadaInterface } from '../../interfaces/parada-interface';
import { ParadaService } from '../../services/parada.service';
import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-paradas-formulario',
  templateUrl: './paradas-formulario.component.html',
  styleUrls: ['./paradas-formulario.component.css']
})
export class ParadasFormularioComponent implements OnInit {

  constructor(private builder: FormBuilder, private dialog: MatDialog, 
    private paradaService: ParadaService, @Inject(MAT_DIALOG_DATA) public data: {id:number}) { }

  editdata!: ParadaInterface;
  paradaForm=this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    id_estado: this.builder.control({ value: '', disabled: true }),
    direccion: this.builder.control('', Validators.required),
  });

  ngOnInit(): void {
    if (this.data.id != null) {
      this.paradaService.GetParada(this.data.id).subscribe(response => {
        this.editdata = response;
        this.paradaForm.setValue({
          id: this.editdata.id, id_estado: this.editdata.id_Estado,
          direccion: this.editdata.direccion
        });
      });
    }
  }

  AgregarParada() {
    if (this.paradaForm.valid) {
      const Editid = this.paradaForm.getRawValue().id;
      if (Editid != '' && Editid != null) {
        this.paradaService.ActualizarParada(Editid, this.paradaForm.getRawValue()).subscribe(response => {
          this.CerrarFormulario();
          alertify.success(response);
        });
      } else {
        this.paradaService.PostParada(this.paradaForm.value).subscribe(response => {
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
