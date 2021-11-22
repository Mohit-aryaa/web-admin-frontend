import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BundleProductService } from "app/modules/services/bundle-product.service";
import { CategoriesService } from "app/modules/services/categories.service";
import { CouponService } from "app/modules/services/coupon.service";
import { ProductsService } from "app/modules/services/products.service";
import { SubCategoriesService } from "app/modules/services/sub-categories.service";
import { SubChildCategoryService } from "app/modules/services/sub-child-category.service";

@Component({
    selector: "app-coupon",
    templateUrl: "./coupon.component.html",
    styleUrls: ["./coupon.component.scss"],
})
export class CouponComponent implements OnInit {
    couponForm: FormGroup;
    selectedCoupon: any;
    coupons: any[];

    getDiscountOnData: any[];
    setBulkItems = [];
    loading:boolean = true;

    showCategory: boolean = false;
    showSubCategory: boolean = false;
    showSubChildCategory: boolean = false;
    showProduct: boolean = false;
    showBundleproduct: boolean = false;

    @ViewChild("content") content: any;
    @ViewChild(MatSort) sort!: MatSort;
    dataSource = new MatTableDataSource<any>();
    @ViewChild("Paginator") Paginator!: MatPaginator;
    tablePaging = {
        offset: 0,
        limit: 20,
        previousSize: 0,
      };
      userDataPromise: any;
    chooseDiscountOnValue: any;
    constructor(
        private _formBuilder: FormBuilder,
        private couponsService: CouponService,
        private _snackBar: MatSnackBar,
        private modalService: NgbModal,
        private categoryService: CategoriesService,
        private subCategoriesService: SubCategoriesService,
        private subChildCategoriesService: SubChildCategoryService,
        private productsService: ProductsService,
        private bundleProductService: BundleProductService
    ) { }

    displayedColumnsOne: string[] = [
        "check",
        "title",
        "code",
        "CustomerGroup",
        "publish",
        "action",
      ];

    ngOnInit(): void {
        this.couponForm = this._formBuilder.group({
            title: ["", [Validators.required]],
            validFrom: ["", [Validators.required]],
            validTill: ["", [Validators.required]],
            discountOn: ["", [Validators.required]],
            discountOnField: [""],
            couponCode: ["", [Validators.required]],
            discountType: ["", [Validators.required]],
            discountValue: ["", [Validators.required]],
            customerGroup: ["", [Validators.required]],
            deviceType: ["", [Validators.required]],
            paymentType: ["", [Validators.required]],
            cartAmount: ["", [Validators.required]],
            maxDiscount: ["", [Validators.required]],
            usePerCoupon: ["", [Validators.required]],
            couponDescription: ["", [Validators.required]],
            publish: ["", [Validators.required]]
        });
    }

    ngAfterViewInit() {
        this.getData();
      }

      getData() {
        this.couponsService
          .getCoupons({ params: this.tablePaging })
          .subscribe((res: any) => {
            this.loading = false;
            this.coupons = res.Coupons;
            this.coupons.length = res.total;
            this.dataSource = new MatTableDataSource<any>(this.coupons);
            this.dataSource.paginator = this.Paginator;
          });
      }

      getNextData() {
        this.loading = true;
        if (this.userDataPromise) {
          this.userDataPromise.unsubscribe();
        }
        this.userDataPromise = this.couponsService
          .getCoupons({ params: this.tablePaging })
          .subscribe((response: any) => {
            this.loading = false;
            this.coupons.length = this.tablePaging["previousSize"];
            this.coupons.push(...response.Coupons);
            this.coupons.length = response.total;
            this.dataSource = new MatTableDataSource<any>(this.coupons);
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

      applyCouponFilter(filterValue: string) {
        var filterData = filterValue.trim().toLowerCase();
        this.userDataPromise = this.couponsService
          .filterCoupons(filterData)
          .subscribe((res: any) => {
            this.loading = false;
            this.coupons = res.Coupons;
            this.coupons.length = res.total;
            this.dataSource = new MatTableDataSource<any>(this.coupons);
            this.dataSource.paginator = this.Paginator;
          });
      }

      setPublish(e: any, el: any) {
        this.loading = true;
        const setData = {
            id: e,
            publish: el,
        };
        this.couponsService.setPublish(setData).subscribe(
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
                this.couponsService.bulkDelete(this.setBulkItems).subscribe(
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
                this.couponsService.bulkPublish(this.setBulkItems).subscribe(
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
                this.couponsService.bulkUnpublish(this.setBulkItems).subscribe(
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

    openModal(id = null) {
        this.selectedCoupon = id;
        this.modalService
          .open(this.content, { ariaLabelledBy: "modal-basic-title" })
          .result.then(
            (result) => {},
            (reason) => {
              this.couponForm.reset();
            }
          );
      }

      openUpdateModal(data: any) {
        this.openModal(data._id);
        this.getChooseDiscountOn(data.discountOn);
        this.couponForm.patchValue(data);
      }

    chooseDiscountOn(e:any) {
        this.getChooseDiscountOn(e.target.value)
    }

    getChooseDiscountOn(e:any) {
        this.chooseDiscountOnValue = e;
        if(this.chooseDiscountOnValue == 'category') {
            this.showCategory = true;
            this.getCategories();
        } else {
            this.showCategory = false
        }

        if(this.chooseDiscountOnValue == 'subCategory') {
            this.showSubCategory = true
            this.getSubCategories();
        } else {
            this.showSubCategory = false
        }

        if(this.chooseDiscountOnValue == 'subChildCategory') {
            this.showSubChildCategory = true
            this.getSubChildCategories();
        } else {
            this.showSubChildCategory = false
        }

        if(this.chooseDiscountOnValue == 'product') {
            this.showProduct = true
            this.getProducts();
        } else {
            this.showProduct = false
        }

        if(this.chooseDiscountOnValue == 'bundleProduct') {
            this.showBundleproduct = true
            this.getBundleProducts();
        } else {
            this.showBundleproduct = false
        }
    }

    getCategories() {
        this.categoryService.listCategories().subscribe((res:any) => {
            this.getDiscountOnData = res.Categories;
            console.log(this.getDiscountOnData)
        }, (errors:any) => {
            console.log(errors);
        })
    }

    getSubCategories() {
        this.subCategoriesService.listSubCategories().subscribe((res:any) => {
            this.getDiscountOnData = res.SubCategories;
            console.log(this.getDiscountOnData)
        }, (errors:any) => {
            console.log(errors);
        })
    }

    getSubChildCategories() {
        this.subChildCategoriesService.listSubChildCategories().subscribe((res:any) => {
            this.getDiscountOnData = res.SubChildCategories;
            console.log(this.getDiscountOnData)
        }, (errors:any) => {
            console.log(errors);
        })
    }

    getProducts() {
        this.productsService.listProduct().subscribe((res:any) => {
            this.getDiscountOnData = res.Products;
            console.log(this.getDiscountOnData)
        }, (errors:any) => {
            console.log(errors);
        })
    }

    postData() {
        this.couponForm.markAllAsTouched();
        if (this.couponForm.invalid) {
            console.log("this.consultantForm", this.couponForm.value);
            this._snackBar.open('All fields are required', '', {
                duration: 2000,
                verticalPosition: "top",
            })
            return false;
        }
        if(this.couponForm.value.discountOn !== 'allProducts') {
            if(this.couponForm.value.discountOnField == '') {
                this._snackBar.open('All fields are required', '', {
                    duration: 2000,
                    verticalPosition: "top",
                })
                return false;
            }
        }
        if (this.selectedCoupon) {
            this.couponsService
                .updateCoupon(this.selectedCoupon, this.couponForm.value)
                .subscribe(
                    (results: any) => {
                        this.modalService.dismissAll();
                        this.couponForm.reset();
                        this.getNextData();
                    },
                    (errors) => {
                        console.log(errors);
                    }
                );
        } else {
                this.couponsService
                    .addCoupon(this.couponForm.value)
                    .subscribe(
                        (res: any) => {
                            this.modalService.dismissAll();
                            this.couponForm.reset();
                            this.getNextData();
                        },
                        (errors) => {
                            console.log(errors);
                        }
                    );
        }
    }

    getBundleProducts() {
        this.bundleProductService.listBundleProduct().subscribe((res:any) => {
            this.getDiscountOnData = res.BundleProducts;
            console.log(this.getDiscountOnData)
        }, (errors:any) => {
            console.log(errors);
        })
    }


    deleteProduct(deleteProduct: any) {
        if (confirm("Are you sure to delete ?")) {
            console.log(deleteProduct);
            this.couponsService
                .deleteCoupons(deleteProduct)
                .subscribe((res: any) => {
                    this.getNextData();
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
