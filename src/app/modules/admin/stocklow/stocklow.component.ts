import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stocklow',
  templateUrl: './stocklow.component.html',
  styleUrls: ['./stocklow.component.scss']
})
export class StocklowComponent implements OnInit {

  @ViewChild('content') content:any
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  @ViewChild('Paginator') Paginator!: MatPaginator;
  stockForm:FormGroup;
  selectedStock: boolean;
  selectedStockId: any;
  loading: boolean = false;
  Stocks: any[];
  getCategoriesList :any[];
  tablePaging = {
    offset: 0,
    limit: 20,
    previousSize: 0
  };
  userDataPromise: any;
  constructor(private http: HttpClient, private modalService: NgbModal, private _formBuilder: FormBuilder, private stockService: StockService) { }

  displayedColumnsOne: string[] = ['name', 'stock', 'action'];
  ngOnInit(): void {
    this.stockForm = this._formBuilder.group({
      productName: ['', [Validators.required]],
      stock: ['', [Validators.required]]
    })
    this.getData();
  }

  ngAfterViewInit() {
    this.getData()
  }

  

  getData() {
    this.stockService.getStock({ params: this.tablePaging }).subscribe((res: any) => {
      //console.log('getdata', res);
      this.loading = false;
      this.Stocks = res.Stocks;
      console.log('this.users', this.Stocks)
      this.Stocks.length = res.total;
      this.dataSource = new MatTableDataSource<any>(this.Stocks);
      this.dataSource.paginator = this.Paginator;
    })
  }

  getNextData() {
    this.loading = true
    if(this.userDataPromise){
      this.userDataPromise.unsubscribe();
    }
    this.userDataPromise = this.stockService.getStock({ params: this.tablePaging }).subscribe((response: any) => {
        this.loading = false;
        console.log(response.Stocks)
        this.Stocks.length = this.tablePaging['previousSize'];
        this.Stocks.push(...response.Stocks);

        this.Stocks.length = response.total;
        this.dataSource = new MatTableDataSource<any>(this.Stocks);
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

  applyCategoryFilter(filterValue: string) {
    console.log('this.tablePaging', this.tablePaging);
    var filterData = filterValue.trim().toLowerCase();
    //this.getNextData();
    this.userDataPromise = this.stockService.filterStock(filterData).subscribe((res: any) => {
      this.loading = false;
      this.Stocks = res.Stocks;
      console.log('this.Products', this.Stocks)
      this.Stocks.length = res.total;
      this.dataSource = new MatTableDataSource<any>(this.Stocks);
      this.dataSource.paginator = this.Paginator;
    })
  }

  openUpdateModal(data: any) {
    
    console.log(data);
    this.selectedStock = data.isBundle
    this.selectedStockId = data._id;
    console.log(this.selectedStock)
    this.stockForm.patchValue(data);
    console.log('openModal',this.selectedStock)
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
     
    }, (reason) => {
      this.stockForm.reset();
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });
  }

  

  postData() {

    console.log('postData',this.stockForm.value)
    this.stockForm.markAllAsTouched();
    if (this.stockForm.invalid) {
      console.log('this.vendors', this.stockForm.value)
      return false;
    }
    if(this.selectedStock) {
      this.stockService.updateBundleStock(this.selectedStockId, this.stockForm.value).subscribe(
        (results: any) => {
          //console.log(results);
          this.modalService.dismissAll();
          this.stockForm.reset();
          console.log(this.Stocks.length)
          
          this.getNextData()
          
        },
        errors => {
          console.log(errors);
        }
      )
    } else  {
        this.stockService.updateStock(this.selectedStockId, this.stockForm.value).subscribe(
          (results: any) => {
            console.log(results);
            this.modalService.dismissAll();
            this.stockForm.reset();
            console.log(this.Stocks.length)
            
            this.getNextData()
            
          },
          errors => {
            console.log(errors);
          }
        )
      }
    
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}


