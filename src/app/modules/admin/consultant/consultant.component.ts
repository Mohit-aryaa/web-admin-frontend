import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CategoriesService } from "app/modules/services/categories.service";
import { ConsultantService } from "app/modules/services/consultant.service";

@Component({
    selector: "app-consultant",
    templateUrl: "./consultant.component.html",
    styleUrls: ["./consultant.component.scss"],
})
export class ConsultantComponent implements OnInit {
    @ViewChild("content") content: any;
    @ViewChild("viewProfile") viewProfile  :any;
    @ViewChild(MatSort) sort!: MatSort;
    dataSource = new MatTableDataSource<any>();
    @ViewChild("Paginator") Paginator!: MatPaginator;
    consultants: any[];
    consultantForm: FormGroup;
    loading: Boolean = false;
    showPreview: Boolean = false;
    showOldImage: Boolean = false;
    storeImg: any = File;
    tablePaging = {
        offset: 0,
        limit: 20,
        previousSize: 0,
    };
    userDataPromise: any;
    setBulkDeleteItems = [];
    setCheckInputs: any[];
    url: any;
    imgUploading: boolean = false;
    ImageBox: any;
    selectedConsultant: any;
    selectedIndex: number = 0;
    viewConsultantProfile: any;
    constructor(
        private modalService: NgbModal,
        private _formBuilder: FormBuilder,
        private consultantService: ConsultantService,
        private _snackBar: MatSnackBar
    ) { }

    displayedColumnsOne: string[] = [
        "check",
        "logo",
        "displayName",
        "name",
        "status",
        "action",
    ];

    ngOnInit(): void {
        this.consultantForm = this._formBuilder.group({
            name: ["", [Validators.required]],
            displayName: ["", [Validators.required]],
            email: ["", [Validators.required]],
            phone: ["", [Validators.required]],
            logo: [""],
            logoPicture: [""],
            address: this._formBuilder.group({
                addressLine1: ["", [Validators.required]],
                addressLine2: [""],
                city: ["", [Validators.required]],
                state: ["", [Validators.required]],
                country: ["", [Validators.required]],
                zip: ["", [Validators.required]],
            }),
            company: this._formBuilder.group({
                companyName: ["", [Validators.required]],
                companyType: ["", [Validators.required]],
            }),
            bankAccountType: ["", [Validators.required]],
            bankAccountName: ["", [Validators.required]],
            bankAccountDetails: this._formBuilder.group({
                accountNo: ["", [Validators.required]],
                ifsc: ["", [Validators.required]],
            }),
            panNumber: ["", [Validators.required]],
            gstNumber: ["", [Validators.required]],
            memberShip: ["", [Validators.required]],
            status: ["", [Validators.required]],
        });
    }

    ngAfterViewInit() {
        this.getData();
    }

    getData() {
        this.consultantService
            .getConsultants({ params: this.tablePaging })
            .subscribe((res: any) => {
                console.log('res',res)
                this.loading = false;
                this.consultants = res.Consultants;
                this.consultants.length = res.total;
                this.dataSource = new MatTableDataSource<any>(this.consultants);
                this.dataSource.paginator = this.Paginator;
            });
    }

    getNextData() {
        this.loading = true;
        if (this.userDataPromise) {
            this.userDataPromise.unsubscribe();
        }
        this.userDataPromise = this.consultantService
            .getConsultants({ params: this.tablePaging })
            .subscribe((response: any) => {
                this.loading = false;
                this.consultants.length = this.tablePaging["previousSize"];
                this.consultants.push(...response.Consultants);
                this.consultants.length = response.total;
                this.dataSource = new MatTableDataSource<any>(this.consultants);
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

    applyConsultantsFilter(filterValue: string) {
        var filterData = filterValue.trim().toLowerCase();
        this.userDataPromise = this.consultantService
            .filterConsultants(filterData)
            .subscribe((res: any) => {
                this.loading = false;
                this.consultants = res.Consultants;
                this.consultants.length = res.total;
                this.dataSource = new MatTableDataSource<any>(this.consultants);
                this.dataSource.paginator = this.Paginator;
            });
    }

    tabChanged(tabChangeEvent: MatTabChangeEvent): void {
        this.selectedIndex = tabChangeEvent.index;
    }

    nextStep() {
        const maxNumberOfTabs = 11;
        if (this.selectedIndex != maxNumberOfTabs) {
            this.selectedIndex = this.selectedIndex + 1;
        }
        //console.log(this.selectedIndex);
    }

    previousStep() {
        if (this.selectedIndex != 0) {
            this.selectedIndex = this.selectedIndex - 1;
        }
        //console.log(this.selectedIndex);
    }

    onSelectedImage(e: any) {
        this.showPreview = true;
        const that = this;
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function () {
                that.url = reader.result;
            };
            reader.readAsDataURL(e.target.files[0]);
        }
        this.storeImg = e.target.files[0];
    }

    openModal(id = null) {
        this.selectedConsultant = id;
        this.modalService
            .open(this.content, { size: "lg", ariaLabelledBy: "modal-basic-title" })
            .result.then(
                (result) => { },
                (reason) => {
                    this.consultantForm.reset();
                    this.url = "";
                    this.showPreview = false;
                    this.showOldImage = false;
                }
            );
    }

    openUpdateModal(data: any) {
        this.openModal(data._id);
        this.consultantForm.patchValue(data);
        this.showOldImage = true;
        this.ImageBox = data.logo;
    }

    openProfileModal(data: any) {
        this.viewConsultantProfile = {
            logo: data.logo,
            displayName: data.displayName,
            name: data.name,
            company: data.company,
            email: data.email,
            address:data.address,
            phone: data.phone,
            createdAt: data.created_at
        }
        this.modalService
            .open(this.viewProfile, { ariaLabelledBy: "modal-basic-title" })
            .result.then(
                (result) => { },
                (reason) => {

                }
            );
    }

    postFormInput() {
        this.consultantForm.markAllAsTouched();
        if (this.consultantForm.invalid) {
            console.log("this.consultantForm", this.consultantForm.value);
            return false;
        }
        if (this.selectedConsultant) {
            if (this.showPreview == false) {
                this.consultantForm.patchValue({
                    logo: undefined,
                });
            }
            console.log("this.consultantForm", this.consultantForm.value);
            this.consultantService
                .updateConsultant(this.selectedConsultant, this.consultantForm.value)
                .subscribe(
                    (results: any) => {
                        this.modalService.dismissAll();
                        this.consultantForm.reset();
                        this.showOldImage = false;
                        this.getNextData();
                        this.selectedIndex = 0;
                    },
                    (errors) => {
                        console.log(errors);
                    }
                );
        } else {
            if (this.showPreview == false) {
                this._snackBar.open("Logo is required", "", {
                    duration: 2000,
                    verticalPosition: "top",
                });
                return false;
            } else {
                this.consultantService
                    .addConsultant(this.consultantForm.value)
                    .subscribe(
                        (res: any) => {
                            this.modalService.dismissAll();
                            this.consultantForm.reset();
                            this.getNextData();
                            this.selectedIndex = 0;
                        },
                        (errors) => {
                            console.log(errors);
                        }
                    );
            }
        }
    }

    postData() {
        this.consultantForm.markAllAsTouched();
        if (this.consultantForm.invalid) {
            console.log('this.consultantForm', this.consultantForm.value)
            this._snackBar.open("All fields are required", "", {
                duration: 2000,
                verticalPosition: "top",
            });
            return false;
        }
        if (this.showPreview == true) {
            const formData = new FormData();
            formData.append("logo", this.storeImg);
            const filename = this.storeImg.name.split(".").pop();
            const file = filename.toLowerCase();
            this.imgUploading = true;
            if (file.match(/png/g) || file.match(/jpeg/g) || file.match(/jpg/g)) {
                this.consultantService.uploadConsultantLogo(formData).subscribe(
                    (res: any) => {
                        this.consultantForm.patchValue({
                            logo: res.imagePath,
                        });
                        this.imgUploading = false;
                        this.postFormInput();
                    },
                    (errors) => {
                        console.log(errors);
                    }
                );
            } else {
                this._snackBar.open("Only jpg, png and jpeg formats are allowed", "", {
                    duration: 2000,
                    verticalPosition: "top",
                });
                return false;
            }
        } else {
            this.imgUploading = false;
            this.postFormInput();
        }
    }

    deleteConsultant(deleteConsultant: any) {
        if (confirm("Are you sure to delete ?")) {
            this.consultantService
                .deleteConsultant(deleteConsultant)
                .subscribe((res: any) => {
                    this.getNextData();
                });
        }
    }

    checkAllDeleteItems(e: any) {
        var items: any = document.getElementsByClassName("deleteChecks");
        if (e.target.checked) {
            for (let i = 0; i < items.length; i++) {
                let element = items[i];
                element.checked = true;
                let getId = element.getAttribute("id");
                this.setBulkDeleteItems.push(getId);
            }
        } else {
            for (let i = 0; i < items.length; i++) {
                let element = items[i];
                element.checked = false;
                this.setBulkDeleteItems = [];
            }
        }
    }

    getDeleteItems(event: any, index: any) {
        let checkElement = <HTMLInputElement>document.getElementById("deleteAll");
        checkElement.checked = false;
        var element = <HTMLInputElement>document.getElementById(event._id);
        var isChecked = element.checked;
        if (isChecked) {
            this.setBulkDeleteItems.push(event._id);
        } else {
            this.setBulkDeleteItems.splice(index, 1);
        }
    }

    BulkDelete() {
        if (
            typeof this.setBulkDeleteItems !== undefined &&
            this.setBulkDeleteItems.length > 0
        ) {
            if (confirm("Are you sure to delete ?")) {
                this.consultantService.bulkDelete(this.setBulkDeleteItems).subscribe(
                    (res: any) => {
                        let element = <HTMLInputElement>(
                            document.getElementById("deleteAll")
                        );
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
}
