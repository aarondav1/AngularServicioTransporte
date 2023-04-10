import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConductorService } from '../../services/conductor.service'; 
import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-conductores-formulario',
  templateUrl: './conductores-formulario.component.html',
  styleUrls: ['./conductores-formulario.component.css']
})
export class ConductoresFormularioComponent implements OnInit {
  editdata: any;
  constructor(private builder: FormBuilder, private dialog: MatDialog, private api: ConductorService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    //SI EL FORMULARIO RECIBE UN ID SIGNIFICA QUE ES SE QUIERE EDTIAR UN REGISTRO POR LO QUE
    //SE RELLENAN LOS CAMPOS CON EL REGISTRO CUYO ID CONINCIDA CON EL ID INGRESADO.
    if (this.data.id != '' && this.data.id != null) {
      this.api.GetConductor(this.data.id).subscribe(response => {
        this.editdata = response;
        this.conductorForm.setValue({
          id: this.editdata.id, id_estado: this.editdata.id_Estado, nombres: this.editdata.nombres,
          apellidos: this.editdata.apellidos, cedula: this.editdata.cedula, id_tipo_licencia: this.editdata.id_Tipo_Licencia
        });
      });
    }
  }

  conductorForm = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    id_estado: this.builder.control({ value: '', disabled: true }),
    nombres: this.builder.control('', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]),
    apellidos: this.builder.control('', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]),
    cedula: this.builder.control('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
    id_tipo_licencia: this.builder.control('', Validators.required)
  });
  

  AgregarConductor() {
    if (this.conductorForm.valid) {
      const Editid = this.conductorForm.getRawValue().id;
      if (Editid != '' && Editid != null) {
        this.api.ActualizarConductor(Editid, this.conductorForm.getRawValue()).subscribe(response => {
          this.CerrarFormulario();
          alertify.success(response);
        });
      } else {
        this.api.PostConductor(this.conductorForm.value).subscribe(response => {
          this.CerrarFormulario();
          alertify.success(response);
        });
      }
    }
  }

  CerrarFormulario(){
    this.dialog.closeAll();
  }
  ValidarCadenaInput(event: KeyboardEvent) {
    const key = event.keyCode;
    if ((key >= 65 && key <= 90) || (key >= 97 && key <= 122) || key == 8 || key == 32 || key == 9) {
      // Permitir letras, tecla de borrar, espacio y tab
    } else {
      // Bloquear otras teclas
      event.preventDefault();
    }
  }

  ValidarCedulaInput(event: KeyboardEvent) {
    const key = event.keyCode;
    if ((key >= 48 && key <= 57) || key == 8 || key == 9) {
      // Permitir números, tecla de borrar y tab
    } else {
      // Bloquear otras teclas
      event.preventDefault();
    }
  }
  
}
