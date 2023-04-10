import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AsignacionBusConductorCreacionInterface } from '../../interfaces/asignacion-bus-conductor-creacion';
import { AsignacionBusConductorService } from '../../services/asignacion-bus-conductor.service';
import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-asignacion-bus-conductor-formulario',
  templateUrl: './asignacion-bus-conductor-formulario.component.html',
  styleUrls: ['./asignacion-bus-conductor-formulario.component.css']
})
export class AsignacionBusConductorFormularioComponent implements OnInit {

  constructor(private builder: FormBuilder, private dialog: MatDialog, 
    private asignacionService: AsignacionBusConductorService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  asignacionForm = this.builder.group({
    id: ['', [Validators.required, this.onlyNumbersValidator]]
  });

  onlyNumbersValidator(control: AbstractControl): { [key: string]: any } | null {
    const valid = /^\d+$/.test(control.value);
    return valid ? null : { 'notNumber': true };
  }

  CrearAsignacionBusConductor(){
    const idBus = this.asignacionForm.controls['id'].value;
    const asignacion: AsignacionBusConductorCreacionInterface = {
      id_bus: idBus,
      id_conductor: this.data.id
    }
    this.asignacionService.PostAsignacionBusConductor(asignacion).subscribe(
      r => {
        this.CerrarFormulario();
        alertify.success(r);
      },
      error => {
        alertify.error(error.error);
      }
    );
  }

  CerrarFormulario(){
    this.dialog.closeAll();
  }
}
