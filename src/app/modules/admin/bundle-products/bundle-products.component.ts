import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BundleProductService } from '../../services/bundle-product.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-bundle-products',
  templateUrl: './bundle-products.component.html',
  styleUrls: ['./bundle-products.component.scss']
})
export class BundleProductsComponent implements OnInit {

  @ViewChild('content') content:any
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  @ViewChild('Paginator') Paginator!: MatPaginator;

  loading: boolean = false;
  BundleProducts: any[];
  tablePaging = {
    offset: 0,
    limit: 20,
    previousSize: 0
  };
  userDataPromise: any;
  vendorsList = [];
  setBulkDeleteItems = [];

  constructor(private http: HttpClient, private _snackBar: MatSnackBar, private bundleProductsService: BundleProductService) { }
  displayedColumnsOne: string[] = ['check','name', 'image',  'productSku', 'category', 'brand', 'products', 'price', 'action'];
  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.getData();
  }

  checkAllDeleteItems(e:any) {
    this.setBulkDeleteItems = [];
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
      this.bundleProductsService.bulkDelete(this.setBulkDeleteItems).subscribe((res:any) => {
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
    else {
      this._snackBar.open('No product selected', '', {
        duration: 2000,
        verticalPosition: 'top'
      });
    }
  }


  getData() {
    this.bundleProductsService.getBundleProducts({ params: this.tablePaging }).subscribe((res: any) => {
      this.loading = false;
      this.BundleProducts = res.BundleProducts;
      console.log('this.users', this.BundleProducts)
      this.BundleProducts.length = res.total;
      this.dataSource = new MatTableDataSource<any>(this.BundleProducts);
      this.dataSource.paginator = this.Paginator;
    })
  }

  getNextData() {
    this.loading = true
    if(this.userDataPromise){
      this.userDataPromise.unsubscribe();
    }
    this.userDataPromise = this.bundleProductsService.getBundleProducts({ params: this.tablePaging }).subscribe((response: any) => {
      this.loading = false;
      this.BundleProducts.length = this.tablePaging['previousSize'];
      this.BundleProducts.push(...response.BundleProducts);
      this.BundleProducts.length = response.total;
      this.dataSource = new MatTableDataSource<any>(this.BundleProducts);
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
  }

  applyProductFilter(filterValue: string) {
    var filterData = filterValue.trim().toLowerCase();
    this.userDataPromise = this.bundleProductsService.filterBundleProducts(filterData).subscribe((res: any) => {
      this.loading = false;
      this.BundleProducts = res.BundleProducts;
      this.BundleProducts.length = res.total;
      this.dataSource = new MatTableDataSource<any>(this.BundleProducts);
      this.dataSource.paginator = this.Paginator;
    })

  }

  deleteBundleProduct(deleteProduct: any) {
    if (confirm("Are you sure to delete ?")) {
      this.bundleProductsService.deleteBundleProducts(deleteProduct).subscribe(
        (res: any) => {
          this.getNextData();
        }
      )
    }
  }


}
