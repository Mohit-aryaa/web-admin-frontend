/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriesService } from 'app/modules/services/categories.service';
import { ServicesService } from 'app/modules/services/services.service';
import { VendorService } from '../../services/vendor.service';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

    @ViewChild('content') content: any;
    @ViewChild(MatSort) sort!: MatSort;
    dataSource = new MatTableDataSource<any>();
    @ViewChild('Paginator') Paginator!: MatPaginator;

    loading: boolean = false;
    products: any[];
    tablePaging = {
        offset: 0,
        limit: 20,
        previousSize: 0,
    };
    //filterBar
    searchInput: string;
    product: string;
    category: string;
    vendor: string;
    publish: boolean;

    userDataPromise: any;
    vendorsList = [];
    categoriesList = [];
    setBulkDeleteItems = [];
    searchForm: FormGroup;
    constructor(
        private _formBuilder: FormBuilder,
        private servicesService: ServicesService ,
        private _snackBar: MatSnackBar,
        private vendorsService: VendorService,
        private categoryService: CategoriesService
    ) { }

    displayedColumnsOne: string[] = [
        'check',
        'image',
        'title',
        'description',
        'publish',
        'options',
    ];
    ngOnInit(): void {
        this.getData();
        this.getVendors();
        this.getCategories();
        this.searchForm = this._formBuilder.group({
            searchInput: [''],
            product: ['', [Validators.required]],
            category: ['', [Validators.required]],
            vendor: ['', [Validators.required]],
            publish: ['', [Validators.required]]
        });
    }

    ngAfterViewInit() {
        this.searchForm.patchValue({
            'product': 'productName'
        });
    }


    getVendors() {
        this.vendorsService.listVendors().subscribe((res: any) => {
            this.vendorsList = res.Vendors;
        }, (errors: any) => {
            console.log(errors);
        });
    }

    getCategories() {
        this.categoryService.listCategories().subscribe((res: any) => {
            this.categoriesList = res.Categories;
        }, (errors: any) => {
            console.log(errors);
        });
    }

    checkAllDeleteItems(e: any) {
        this.setBulkDeleteItems = [];
        const items: any = document.getElementsByClassName('deleteChecks');
        if (e.target.checked) {
            for (let i = 0; i < items.length; i++) {
                const element = items[i];
                element.checked = true;
                const getId = element.getAttribute('id');
                this.setBulkDeleteItems.push(getId);
            }
        } else {
            for (let i = 0; i < items.length; i++) {
                const element = items[i];
                element.checked = false;
                console.log(element);
                this.setBulkDeleteItems = [];
            }
        }
        console.log(this.setBulkDeleteItems);
    }

    getDeleteItems(event: any, index: any) {
        const checkElement = <HTMLInputElement>document.getElementById('deleteAll');
        checkElement.checked = false;
        const element = <HTMLInputElement>document.getElementById(event._id);
        const isChecked = element.checked;
        if (isChecked) {
            this.setBulkDeleteItems.push(event._id);
        } else {
            this.setBulkDeleteItems.splice(index, 1);
        }
        console.log(this.setBulkDeleteItems);
    }

    BulkDelete() {
        if (
            typeof this.setBulkDeleteItems !== undefined &&
            this.setBulkDeleteItems.length > 0
        ) {
            if (confirm('Are you sure to delete ?')) {
                this.servicesService.bulkDelete(this.setBulkDeleteItems).subscribe(
                    (res: any) => {
                        const element = <HTMLInputElement>(
                            document.getElementById('deleteAll')
                        );
                        element.checked = false;
                        this._snackBar.open(res.message, '', {
                            duration: 2000,
                            verticalPosition: 'top',
                        });
                        this.getNextData();
                    },
                    (errors: any) => {
                        console.log(errors);
                    }
                );
            }
        } else {
            this._snackBar.open('No product selected', '', {
                duration: 2000,
                verticalPosition: 'top',
            });
        }
    }

    getData() {
        this.servicesService
            .getServices({ params: this.tablePaging })
            .subscribe((res: any) => {
                this.loading = false;
                this.products = res.Services;
                console.log('this.users', this.products);
                this.products.length = res.total;
                this.dataSource = new MatTableDataSource<any>(this.products);
                this.dataSource.paginator = this.Paginator;
            });
    }

    getNextData() {
        this.loading = true;
        if (this.userDataPromise) {
            this.userDataPromise.unsubscribe();
        }
        this.userDataPromise = this.servicesService
            .getServices({ params: this.tablePaging })
            .subscribe((response: any) => {
                this.loading = false;
                this.products.length = this.tablePaging['previousSize'];
                this.products.push(...response.Services);
                this.products.length = response.total;
                this.dataSource = new MatTableDataSource<any>(this.products);
                this.dataSource._updateChangeSubscription();
                this.dataSource.paginator = this.Paginator;
            });
    }

    pageChanged(event: any) {
        this.tablePaging['limit'] = event.pageSize;
        this.tablePaging['offset'] = event.pageIndex.toString();
        const pageIndex = event.pageIndex;
        const pageSize = event.pageSize;
        const previousIndex = event.previousPageIndex;
        const previousSize = pageSize * pageIndex;
        this.tablePaging['previousSize'] = previousSize;
        this.getNextData();
    }

    applyProductFilter(filterValue: string) {
        const filterData = filterValue.trim().toLowerCase();
        this.userDataPromise = this.servicesService
            .filterServices(filterData)
            .subscribe((res: any) => {
                this.loading = false;
                this.products = res.Products;
                this.products.length = res.total;
                this.dataSource = new MatTableDataSource<any>(this.products);
                this.dataSource.paginator = this.Paginator;
            });
    }

    deleteProduct(deleteProduct: any) {
        if (confirm('Are you sure to delete ?')) {
            console.log(deleteProduct);
            this.servicesService
                .deleteServices(deleteProduct)
                .subscribe((res: any) => {
                    this.getNextData();
                });
        }
    }
}
