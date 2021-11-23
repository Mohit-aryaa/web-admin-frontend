import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CategoriesService } from "app/modules/services/categories.service";
import { ProductsService } from "../../services/products.service";
import { VendorService } from "../../services/vendor.service";

@Component({
    selector: "app-products",
    templateUrl: "./products.component.html",
    styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
    @ViewChild("content") content: any;
    @ViewChild(MatSort) sort!: MatSort;
    dataSource = new MatTableDataSource<any>();
    @ViewChild("Paginator") Paginator!: MatPaginator;
    publishProduct = new FormControl();
    loading: boolean = true;
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
    setBulkItems = [];
    searchForm: FormGroup;
    getProductsLength: number;
    constructor(
        private http: HttpClient,
        private _formBuilder: FormBuilder,
        private productsService: ProductsService,
        private _snackBar: MatSnackBar,
        private vendorsService: VendorService,
        private categoryService: CategoriesService
    ) { }

    displayedColumnsOne: string[] = [
        "check",
        "name",
        "image",
        "productSku",
        "stock",
        "category",
        "subCategory",
        "todayDeal",
        "publish",
        "feature",
        "action",
    ];
    ngOnInit(): void {
        this.getData();
        this.getVendors();
        this.getCategories();
        this.searchForm = this._formBuilder.group({
            searchInput: [""],
            product: ["", [Validators.required]],
            category: ["", [Validators.required]],
            vendor: ["", [Validators.required]],
            publish: ["", [Validators.required]],
        });
    }

    ngAfterViewInit() {
        this.searchForm.patchValue({
            product: "productName",
        });
    }

    filterTable() {
        console.log(this.searchForm.value);
        this.productsService.filterTable(this.searchForm.value).subscribe(
            (res: any) => {
                console.log(res);
                this.loading = false;
                this.products = res.Products;
                this.products.length = res.total;
                this.dataSource = new MatTableDataSource<any>(this.products);
                this.dataSource.paginator = this.Paginator;
            },
            (errors: any) => {
                console.log(errors);
            }
        );
    }

    unSubscribeFilterTable() {
        this.getNextData();
        this.searchForm.reset();
        this.searchForm.patchValue({
            product: "productName",
            category: "",
            vendor: "",
            publish: "",
        });
    }

    getVendors() {
        this.vendorsService.listVendors().subscribe(
            (res: any) => {
                this.vendorsList = res.Vendors;
            },
            (errors: any) => {
                console.log(errors);
            }
        );
    }

    getCategories() {
        this.categoryService.listCategories().subscribe(
            (res: any) => {
                this.categoriesList = res.Categories;
            },
            (errors: any) => {
                console.log(errors);
            }
        );
    }

    //check all checks in table
    getBulkItems(e: any) {
        this.setBulkItems = [];
        var items: any = document.getElementsByClassName("bulkChecks");
        if (e.target.checked) {
            for (let i = 0; i < items.length; i++) {
                let element = items[i];
                element.checked = true;
                let getId = element.getAttribute("id");
                this.setBulkItems.push(getId);
            }
        } else {
            for (let i = 0; i < items.length; i++) {
                let element = items[i];
                element.checked = false;
                console.log(element);
                this.setBulkItems = [];
            }
        }
        console.log(this.setBulkItems);
    }

    //check only single item
    getCheckedItem(event: any, index: any) {
        let checkElement = <HTMLInputElement>document.getElementById("checkAll");
        checkElement.checked = false;
        var element = <HTMLInputElement>document.getElementById(event._id);
        var isChecked = element.checked;
        if (isChecked) {
            this.setBulkItems.push(event._id);
        } else {
            this.setBulkItems.splice(index, 1);
        }
        console.log(this.setBulkItems);
    }

    BulkDelete() {
        if ( typeof this.setBulkItems !== undefined && this.setBulkItems.length > 0  ) {
            if (confirm("Are you sure to delete ?")) {
                this.productsService.bulkDelete(this.setBulkItems).subscribe(
                    (res: any) => {
                        let element = <HTMLInputElement>(
                            document.getElementById("checkAll")
                        );
                        element.checked = false;
                        this.setBulkItems = [];
                        this._snackBar.open(res.message, "", {
                            duration: 2000,
                            verticalPosition: "top",
                        });
                        this.getNextData();
                    },
                    (errors: any) => {
                        console.log(errors);
                    }
                );
            }
        } else {
            this._snackBar.open("No product selected", "", {
                duration: 2000,
                verticalPosition: "top",
            });
        }
    }

    BulkPublish() {
        if ( typeof this.setBulkItems !== undefined && this.setBulkItems.length > 0  ) {
            if (confirm("Are you sure to Publish ?")) {
                this.productsService.bulkPublish(this.setBulkItems).subscribe(
                    (res: any) => {
                        let element = <HTMLInputElement>(
                            document.getElementById("checkAll")
                        );
                        this.setBulkItems = [];
                        element.checked = false;
                        this._snackBar.open(res.message, "", {
                            duration: 2000,
                            verticalPosition: "top",
                        });
                        this.getNextData();
                    },
                    (errors: any) => {
                        console.log(errors);
                    }
                );
            }
        } else {
            this._snackBar.open("No product selected", "", {
                duration: 2000,
                verticalPosition: "top",
            });
        }
    }

    BulkUnpublish() {
        if ( typeof this.setBulkItems !== undefined && this.setBulkItems.length > 0  ) {
            if (confirm("Are you sure to Publish ?")) {
                this.productsService.bulkUnpublish(this.setBulkItems).subscribe(
                    (res: any) => {
                        let element = <HTMLInputElement>(
                            document.getElementById("checkAll")
                        );
                        this.setBulkItems = [];
                        element.checked = false;
                        this._snackBar.open(res.message, "", {
                            duration: 2000,
                            verticalPosition: "top",
                        });
                        this.getNextData();
                    },
                    (errors: any) => {
                        console.log(errors);
                    }
                );
            }
        } else {
            this._snackBar.open("No product selected", "", {
                duration: 2000,
                verticalPosition: "top",
            });
        }
    }

    getData() {
        this.productsService
            .getProducts({ params: this.tablePaging })
            .subscribe((res: any) => {
                this.loading = false;
                this.products = res.Products;
                this.getProductsLength = this.products.length;
                console.log("this.users", this.products);
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
        this.userDataPromise = this.productsService
            .getProducts({ params: this.tablePaging })
            .subscribe((response: any) => {
                this.loading = false;
                this.products.length = this.tablePaging["previousSize"];
                this.products.push(...response.Products);
                this.products.length = response.total;
                this.dataSource = new MatTableDataSource<any>(this.products);
                this.dataSource._updateChangeSubscription();
                this.dataSource.paginator = this.Paginator;
            });
    }

    pageChanged(event: any) {
        this.tablePaging["limit"] = event.pageSize;
        this.tablePaging["offset"] = event.pageIndex.toString();
        let pageIndex = event.pageIndex;
        let pageSize = event.pageSize;
        let previousIndex = event.previousPageIndex;
        let previousSize = pageSize * pageIndex;
        this.tablePaging["previousSize"] = previousSize;
        this.getNextData();
    }

    applyProductFilter(filterValue: string) {
        var filterData = filterValue.trim().toLowerCase();
        this.userDataPromise = this.productsService
            .filterProduct(filterData)
            .subscribe((res: any) => {
                this.loading = false;
                this.products = res.Products;
                this.products.length = res.total;
                this.dataSource = new MatTableDataSource<any>(this.products);
                this.dataSource.paginator = this.Paginator;
            });
    }

    setPublish(e: any, el: any) {
        this.loading = true;
        const setData = {
            id: e,
            publish: el,
        };
        this.productsService.setPublish(setData).subscribe(
            (res: any) => {
                this._snackBar.open(res.message, "", {
                    duration: 2000,
                    verticalPosition: "top",
                });
                this.getNextData();
                this.loading = false;
            },
            (errors: any) => {
                console.log(errors);
            }
        );
    }

    setTodaysDeal(e: any, el: any) {
        this.loading = true;
        const setTodaysDealData = {
            id: e,
            todaysDeal: el,
        };
        this.productsService.setTodaysDeal(setTodaysDealData).subscribe(
            (res: any) => {
                this._snackBar.open(res.message, "", {
                    duration: 2000,
                    verticalPosition: "top",
                });
                this.getNextData();
                this.loading = false;
            },
            (errors: any) => {
                console.log(errors);
            }
        );
    }
    setFeatured(e: any, el: any) {
        this.loading = true;
        const setFeaturedData = {
            id: e,
            featured: el,
        };
        this.productsService.setFeatured(setFeaturedData).subscribe(
            (res: any) => {
                this._snackBar.open(res.message, "", {
                    duration: 2000,
                    verticalPosition: "top",
                });
                this.getNextData();
                this.loading = false;
            },
            (errors: any) => {
                console.log(errors);
            }
        );
    }
    deleteProduct(deleteProduct: any) {
        if (confirm("Are you sure to delete ?")) {
            console.log(deleteProduct);
            this.productsService
                .deleteProducts(deleteProduct)
                .subscribe((res: any) => {
                    this.getNextData();
                });
        }
    }
}
