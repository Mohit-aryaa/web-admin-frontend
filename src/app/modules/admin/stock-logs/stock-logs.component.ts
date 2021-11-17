import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StockLogsService } from '../../services/stock-logs.service';
import { StockService } from '../../services//stock.service';

@Component({
  selector: 'app-stock-logs',
  templateUrl: './stock-logs.component.html',
  styleUrls: ['./stock-logs.component.scss']
})
export class StockLogsComponent implements OnInit {

  @ViewChild('content') content:any
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  @ViewChild('Paginator') Paginator!: MatPaginator;
  stockForm:FormGroup;
  selectedStock: boolean;
  selectedStockId: any;
  loading: boolean = false;
  StockLogs: any[];
  getCategoriesList :any[];
  setBulkDeleteItems = [];
  tablePaging = {
    offset: 0,
    limit: 20,
    previousSize: 0
  };
  userDataPromise: any;
  constructor(private http: HttpClient, private modalService: NgbModal, private _formBuilder: FormBuilder, private stockService: StockService, private stockLogsService: StockLogsService, private _snackBar: MatSnackBar) { }

  displayedColumnsOne: string[] = ['check', 'name', 'logType',  'entryType', 'stock', 'action'];
  ngOnInit(): void {
   
    this.getData();
  }

  ngAfterViewInit() {
    this.getData()
  }

  

  getData() {
    this.stockLogsService.getStockLogs({ params: this.tablePaging }).subscribe((res: any) => {
      console.log('getdata', res);
      this.loading = false;
      this.StockLogs = res.StockLogs;
      console.log('this.users', this.StockLogs)
      this.StockLogs.length = res.total;
      this.dataSource = new MatTableDataSource<any>(this.StockLogs);
      this.dataSource.paginator = this.Paginator;
    })
  }

  getNextData() {
    this.loading = true
    if(this.userDataPromise){
      this.userDataPromise.unsubscribe();
    }
    this.userDataPromise = this.stockLogsService.getStockLogs({ params: this.tablePaging }).subscribe((response: any) => {
        this.loading = false;
        console.log(response.StockLogs)
        this.StockLogs.length = this.tablePaging['previousSize'];
        this.StockLogs.push(...response.StockLogs);

        this.StockLogs.length = response.total;
        this.dataSource = new MatTableDataSource<any>(this.StockLogs);
        this.dataSource._updateChangeSubscription();
        this.dataSource.paginator = this.Paginator;
      })
  }


  pageChanged(event: any) {
    this.tablePaging['limit'] = event.pageSize;
    this.tablePaging['offset'] = event.pageIndex.toString();
    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;
    let previousIndex = event.previousPageIndex;
    let previousSize = pageSize * pageIndex;
    this.tablePaging['previousSize'] = previousSize;
    this.getNextData();
    //this.dataTableSize = event.pageSize
  }

  applyFilter(filterValue: string) {
    console.log('this.tablePaging', this.tablePaging);
    var filterData = filterValue.trim().toLowerCase();
    //this.getNextData();
    this.userDataPromise = this.stockLogsService.filterStockLogs(filterData).subscribe((res: any) => {
      this.loading = false;
      this.StockLogs = res.StockLogs;
      console.log('this.StockLogs', this.StockLogs)
      this.StockLogs.length = res.total;
      this.dataSource = new MatTableDataSource<any>(this.StockLogs);
      this.dataSource.paginator = this.Paginator;
    })
  }

  deleteStockLog(deleteStockLog: any) {
    //console.log(delsubsubCategories);
    if (confirm("Are you sure to delete ?")) {
      //console.log("Implement delete functionality here");
      this.stockLogsService.deleteStockLogs(deleteStockLog).subscribe(
        (res: any) => {
         this.getNextData()
        }
      )
    }
  }

  checkAllDeleteItems(e:any) {
    //console.log(e)
    var items:any =  document.getElementsByClassName("deleteChecks");
    if(e.target.checked) {
      for (let i = 0; i < items.length; i++) {
        let element = items[i];
        element.checked = true
        let getId = element.getAttribute('id')
        console.log(element);
        this.setBulkDeleteItems.push(getId)
      
      }
    } else {
      for (let i = 0; i < items.length; i++) {
        let element = items[i];
        element.checked = false
        console.log(element);
        this.setBulkDeleteItems = []
      }
   }

   
  }

  getDeleteItems(event: any, index:any) {
    let checkElement = <HTMLInputElement> document.getElementById('deleteAll');
    checkElement.checked = false
    var element = <HTMLInputElement> document.getElementById(event._id);
    var isChecked = element.checked;  
    console.log('index', this.setBulkDeleteItems)
    //console.log('element', event)
    if(isChecked) {
      this.setBulkDeleteItems.push(event._id);
    } else {

      this.setBulkDeleteItems.splice(index, 1)
    }
      console.log(this.setBulkDeleteItems) 
  }


  BulkDelete() {
    //console.log('bulkDelete')
    if(typeof this.setBulkDeleteItems !== undefined && this.setBulkDeleteItems.length > 0) {
      if (confirm("Are you sure to delete ?")) {
        this.stockLogsService.bulkDelete(this.setBulkDeleteItems).subscribe((res:any) => {
          console.log('response', res)
          let element = <HTMLInputElement> document.getElementById('deleteAll');
          element.checked = false
          this._snackBar.open(res.message, '', {
            duration: 2000,
            verticalPosition: 'top'
          });
          this.getNextData();
        }, (errors:any) => {
          console.log(errors)
        })
      }
    }
    else {
      this._snackBar.open('No product selected', '', {
        duration: 2000,
        verticalPosition: 'top'
      });
    }
  }

  

}
