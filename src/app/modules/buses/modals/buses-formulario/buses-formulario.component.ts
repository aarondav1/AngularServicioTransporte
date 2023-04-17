import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BusInterface } from '../../interfaces/bus-interface';
import { BusService } from '../../services/bus.service';
import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-buses-formulario',
  templateUrl: './buses-formulario.component.html',
  styleUrls: ['./buses-formulario.component.css']
})
export class BusesFormularioComponent implements OnInit {

  constructor(private builder: FormBuilder, private dialog: MatDialog, 
    private busService: BusService, @Inject(MAT_DIALOG_DATA) public data: {id: number}) { }

  editdata!: BusInterface;

  ngOnInit(): void {
    if (this.data.id != null) {
      this.busService.GetBusConRutasAsociadas(this.data.id).subscribe(response => {
        this.editdata = response;
        this.busForm.setValue({
          id: this.editdata.id, id_estado: this.editdata.id_Estado, numero: this.editdata.numero,
          placa: this.editdata.placa, modelo: this.editdata.modelo, capacidad: this.editdata.capacidad,
          anio: this.editdata.anio
        });
      });
    }
  }

  busForm=this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    id_estado: this.builder.control({ value: '', disabled: true }),
    numero: this.builder.control('', Validators.required),
    placa: this.builder.control('', Validators.required),
    modelo: this.builder.control('', Validators.required),
    capacidad: this.builder.control('', Validators.required),
    anio: this.builder.control('', Validators.required)
  });

  AgregarBus() {
    if (this.busForm.valid) {
      const Editid = this.busForm.getRawValue().id;
      if (Editid != '' && Editid != null) {
        this.busService.ActualizarBus(Editid, this.busForm.getRawValue()).subscribe(response => {
          this.CerrarFormulario();
          alertify.success(response);
        });
      } else {
        this.busService.PostBus(this.busForm.value).subscribe(response => {
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
