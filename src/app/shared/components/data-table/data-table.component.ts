import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ConductorConBusInterface } from 'src/app/modules/conductores/interfaces/ConductorConBus-interface';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @Input() displayColums: string[] = [];
  @Input() finaldata!: MatTableDataSource<ConductorConBusInterface>;
  @Input() buttons: any[] = [];
  @Output() buttonClicked: EventEmitter<any> = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

}
