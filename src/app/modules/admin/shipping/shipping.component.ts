import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShippingService } from '../../services//shipping.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {

  @ViewChild('content') content:any
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  @ViewChild('Paginator') Paginator!: MatPaginator;
  shippingForm:FormGroup;
  selectedShipping: any;
  loading: boolean = false;
  Shippings: any[];
  getCategoriesList :any[];
  setBulkDeleteItems = [];
  tablePaging = {
    offset: 0,
    limit: 20,
    previousSize: 0
  };
  userDataPromise: any;
  constructor(private http: HttpClient, private modalService: NgbModal, private _formBuilder: FormBuilder,  private _snackBar: MatSnackBar, private shippingservice: ShippingService) { }

  displayedColumnsOne: string[] = ['check', 'shippingCost', 'shippingFrom',  'shippingTo', 'shippingTime', 'minimumOrder',  'action'];
  ngOnInit(): void {
   
    this.getData();
  }

  ngAfterViewInit() {
    this.getData()
    this.shippingForm = this._formBuilder.group({
      shippingCost : ['', [Validators.required]],
      shippingFrom : ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6) ]],
      shippingTo : ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6) ]],
      shippingTime : ['', [Validators.required]],
      minimumOrder : ['', [Validators.required]],
      prePaid : [false, ],
      postPaid : [false,]
    })
  }

  get shippingFrom() {
    return this.shippingForm.get('shippingFrom');
  } 
  
  get shippingTo() {
    return this.shippingForm.get('shippingTo');
  } 
  

  getData() {
    this.shippingservice.getShipping({ params: this.tablePaging }).subscribe((res: any) => {
      console.log('getdata', res);
      this.loading = false;
      this.Shippings = res.Shippings;
      console.log('this.Shippings', this.Shippings)
      this.Shippings.length = res.total;
      this.dataSource = new MatTableDataSource<any>(this.Shippings);
      this.dataSource.paginator = this.Paginator;
    })
  }

  getNextData() {
    this.loading = true
    if(this.userDataPromise){
      this.userDataPromise.unsubscribe();
    }
    this.userDataPromise = this.shippingservice.getShipping({ params: this.tablePaging }).subscribe((response: any) => {
        this.loading = false;
        this.Shippings.length = this.tablePaging['previousSize'];
        this.Shippings.push(...response.Shippings);
        this.Shippings.length = response.total;
        this.dataSource = new MatTableDataSource<any>(this.Shippings);
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
    var filterData = filterValue.trim().toLowerCase();
    //this.getNextData();
    this.userDataPromise = this.shippingservice.filterShipping(filterData).subscribe((res: any) => {
      this.loading = false;
      this.Shippings = res.Shippings;
      this.Shippings.length = res.total;
      this.dataSource = new MatTableDataSource<any>(this.Shippings);
      this.dataSource.paginator = this.Paginator;
    })
  }

  openModal(id = null) {
    this.selectedShipping = id;
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
      this.shippingForm.reset();
    });
  }

  openUpdateModal(data: any) {
    this.openModal(data._id);
    this.shippingForm.patchValue(data);
  }

  postData() {
    console.log('this.vendors', this.shippingForm.value)
    this.shippingForm.markAllAsTouched();
    if (this.shippingForm.invalid) {
      console.log('this.shippings', this.shippingForm.value)
      return false;
    }
    if (this.selectedShipping) {
      this.shippingservice.updateShipping(this.selectedShipping, this.shippingForm.value).subscribe(
        (results: any) => {
          this.modalService.dismissAll();
          this.shippingForm.reset();
          this.getNextData()
        },
        errors => {
          console.log(errors);
        }
      )
    } else {
      this.shippingservice.addShipping(this.shippingForm.value).subscribe(
        (res: any) => {
          this.modalService.dismissAll();
          this.shippingForm.reset();
          this.getNextData();
        },
        errors => {
          console.log(errors);
        }
      )
    }
  }

  deleteStockLog(deleteStockLog: any) {
    if (confirm("Are you sure to delete ?")) {
      this.shippingservice.deleteShipping(deleteStockLog).subscribe(
        (res: any) => {
         this.getNextData()
        }
      )
    }
  }

  checkAllDeleteItems(e:any) {
    var items:any =  document.getElementsByClassName("deleteChecks");
    if(e.target.checked) {
      for (let i = 0; i < items.length; i++) {
        let element = items[i];
        element.checked = true
        let getId = element.getAttribute('id')
        this.setBulkDeleteItems.push(getId)
      }
    } else {
      for (let i = 0; i < items.length; i++) {
        let element = items[i];
        element.checked = false
        this.setBulkDeleteItems = []
      }
   }   
  }

  getDeleteItems(event: any, index:any) {
    let checkElement = <HTMLInputElement> document.getElementById('deleteAll');
    checkElement.checked = false
    var element = <HTMLInputElement> document.getElementById(event._id);
    var isChecked = element.checked;  
    if(isChecked) {
      this.setBulkDeleteItems.push(event._id);
    } else {
      this.setBulkDeleteItems.splice(index, 1)
    } 
  }


  BulkDelete() {
    if(typeof this.setBulkDeleteItems !== undefined && this.setBulkDeleteItems.length > 0) {
      if (confirm("Are you sure to delete ?")) {
        this.shippingservice.bulkDelete(this.setBulkDeleteItems).subscribe((res:any) => {
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

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
