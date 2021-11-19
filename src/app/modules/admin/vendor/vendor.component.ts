import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VendorService } from 'app/modules/services/vendor.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {

  @ViewChild('content') content:any
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  @ViewChild('Paginator') Paginator!: MatPaginator;
  vendorsForm:FormGroup;
  selectedVendor: any;

  loading: boolean = false;
  Vendors: any[];
  getCategoriesList :any[];
  tablePaging = {
    offset: 0,
    limit: 20,
    previousSize: 0
  };
  userDataPromise: any;
  setBulkDeleteItems = [];
  constructor(private http: HttpClient, private modalService: NgbModal, private _formBuilder: FormBuilder, private vendorsService: VendorService, private _snackBar: MatSnackBar) { }

  displayedColumnsOne: string[] = ['check','name', 'status', 'action'];
  ngOnInit(): void {
    
    this.getData();
  }

  ngAfterViewInit() {
    this.getData()
  }

  checkAllDeleteItems(e:any) {
    //console.log(e)
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
    //console.log('bulkDelete')
    if(typeof this.setBulkDeleteItems !== undefined && this.setBulkDeleteItems.length > 0) {
      if (confirm("Are you sure to delete ?")) {
        this.vendorsService.bulkDelete(this.setBulkDeleteItems).subscribe((res:any) => {
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

  

  getData() {
    this.vendorsService.getVendors({ params: this.tablePaging }).subscribe((res: any) => {
      this.loading = false;
      this.Vendors = res.Vendors;
      this.Vendors.length = res.total;
      this.dataSource = new MatTableDataSource<any>(this.Vendors);
      this.dataSource.paginator = this.Paginator;
    })
  }

  getNextData() {
    this.loading = true
    if(this.userDataPromise){
      this.userDataPromise.unsubscribe();
    }
    this.userDataPromise = this.vendorsService.getVendors({ params: this.tablePaging }).subscribe((response: any) => {
      this.loading = false;
      this.Vendors.length = this.tablePaging['previousSize'];
      this.Vendors.push(...response.Vendors);
      this.Vendors.length = response.total;
      this.dataSource = new MatTableDataSource<any>(this.Vendors);
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
    var filterData = filterValue.trim().toLowerCase();
    //this.getNextData();
    this.userDataPromise = this.vendorsService.filterVendors(filterData).subscribe((res: any) => {
      this.loading = false;
      this.Vendors = res.Vendors;
      console.log('this.Products', this.Vendors)
      this.Vendors.length = res.total;
      this.dataSource = new MatTableDataSource<any>(this.Vendors);
      this.dataSource.paginator = this.Paginator;
    })
  }

  openModal(id = null) {
    this.selectedVendor = id;
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
      this.vendorsForm.reset();
    });
  }

  openUpdateModal(data: any) {
    this.openModal(data._id);
    this.vendorsForm.patchValue(data);
  }

  

  deleteVendors(deleteVendors: any) {
    if (confirm("Are you sure to delete ?")) {
      this.vendorsService.deleteVendors(deleteVendors).subscribe(
        (res: any) => {
         this.getNextData()
        }
      )
    }
  }
}
