import { Component, EventEmitter, Input, OnInit, Output, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConductorConBusInterface } from 'src/app/modules/conductores/interfaces/ConductorConBus-interface';
import { BotonTabla } from '../../interfaces/boton-tabla';
import { ButtonClickData } from '../../interfaces/button-click-data';
import { DataInterface } from '../../interfaces/types';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, OnChanges {
  @Input() displayColumns: string[] = [];
  @Input() headerColumns: string[] = [];
  @Input() finaldata!: MatTableDataSource<DataInterface>;
  @Input() buttons: BotonTabla[] = [];
  @Input() headerComponent: string = "";
  @Output() buttonClicked: EventEmitter<ButtonClickData> = new EventEmitter();
  
  @ViewChild(MatPaginator) _paginator!:MatPaginator;
  @ViewChild(MatSort) _sort!:MatSort;
  myfinaldata!: MatTableDataSource<DataInterface>;
  
  constructor() { }

  ngOnInit(): void {
    console.log(this.buttons);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.finaldata && changes.finaldata.currentValue) {
      console.log(this.buttons);
      this.myfinaldata = changes.finaldata.currentValue;
      this.myfinaldata.paginator = this._paginator;
      this.myfinaldata.sort = this._sort;
      this._sort.sortChange.subscribe(() => {
        this.myfinaldata.sort = this._sort;
      });
    }
  }

  onButtonClick(rowId: number, buttonInfo: BotonTabla) {
    const data: ButtonClickData = {
      id: rowId,
      buttonInfo: buttonInfo
    };
    //console.log('click');
    this.buttonClicked.emit(data);
  }

}
