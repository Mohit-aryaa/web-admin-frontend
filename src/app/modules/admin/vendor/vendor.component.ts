import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VendorService } from '../vendor.service';

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
    limit: 5,
    previousSize: 0
  };
  userDataPromise: any;
  constructor(private http: HttpClient, private modalService: NgbModal, private _formBuilder: FormBuilder, private vendorsService: VendorService) { }

  displayedColumnsOne: string[] = ['name', 'status', 'action'];
  ngOnInit(): void {
    this.vendorsForm = this._formBuilder.group({
      name:['', [Validators.required]],
      status: ['', [Validators.required]],
    })
    this.getData();
  }

  ngAfterViewInit() {
    this.getData()
  }

  

  getData() {
    this.vendorsService.getVendors({ params: this.tablePaging }).subscribe((res: any) => {
      //console.log('getdata', res);
      this.loading = false;
      this.Vendors = res.Vendors;
      console.log('this.users', this.Vendors)
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
        console.log(response.Vendors)
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
    console.log('this.tablePaging', this.tablePaging);
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
    //console.log(data);
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.vendorsForm.reset();
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });
  }

  openUpdateModal(data: any) {
    console.log(data);
    this.openModal(data._id);
    this.vendorsForm.patchValue(data);
  }

  postData() {
    this.vendorsForm.markAllAsTouched();
    if (this.vendorsForm.invalid) {
      console.log('this.vendors', this.vendorsForm.value)
      return false;
    }
    if (this.selectedVendor) {
      this.vendorsService.updateVendors(this.selectedVendor, this.vendorsForm.value).subscribe(
        (results: any) => {
          //console.log(results);
          this.modalService.dismissAll();
          this.vendorsForm.reset();
          console.log(this.Vendors.length)
          
          this.getNextData()
          
        },
        errors => {
          console.log(errors);
        }
      )
    } else {
      this.vendorsService.addVendors(this.vendorsForm.value).subscribe(
        (res: any) => {
          console.log(res);
          this.modalService.dismissAll();
          this.vendorsForm.reset();
          console.log(this.Vendors.length)
          this.getNextData();
          
        },
        errors => {
          console.log(errors);
        }
      )
    }
  }

  deleteVendors(deleteVendors: any) {
    //console.log(delsubsubCategories);
    if (confirm("Are you sure to delete ?")) {
      //console.log("Implement delete functionality here");
      this.vendorsService.deleteVendors(deleteVendors).subscribe(
        (res: any) => {
         this.getNextData()
        }
      )
    }
  }
}
