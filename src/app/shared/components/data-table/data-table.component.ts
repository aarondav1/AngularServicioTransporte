import { Component, EventEmitter, Input, OnInit, Output, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConductorConBusInterface } from 'src/app/modules/conductores/interfaces/ConductorConBus-interface';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, OnChanges {
  @Input() displayColums: string[] = [];
  @Input() finaldata!: MatTableDataSource<ConductorConBusInterface>;
  @Input() buttons: any[] = [];
  @Output() buttonClicked: EventEmitter<any> = new EventEmitter();
  
  @ViewChild(MatPaginator) _paginator!:MatPaginator;
  @ViewChild(MatSort) _sort!:MatSort;
  myfinaldata!: MatTableDataSource<ConductorConBusInterface>;
  
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.finaldata && changes.finaldata.currentValue) {
      this.myfinaldata = changes.finaldata.currentValue;
      this.myfinaldata.paginator = this._paginator;
      this.myfinaldata.sort = this._sort;
      this._sort.sortChange.subscribe(() => {
        this.myfinaldata.sort = this._sort;
      });
    }
  }

}
