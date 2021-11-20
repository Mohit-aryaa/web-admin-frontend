import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { ActivatedRoute, Router } from "@angular/router";
import { VendorService } from "../../services/vendor.service";

@Component({
    selector: "app-add-vendor",
    templateUrl: "./add-vendor.component.html",
    styleUrls: ["./add-vendor.component.scss"],
})
export class AddVendorComponent implements OnInit {
    vendorsForm: FormGroup;
    selectedIndex: number = 0;
    selectedVendor: any;
    constructor(
        private _formBuilder: FormBuilder,
        private vendorsService: VendorService,
        private http: HttpClient,
        private _snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.vendorsForm = this._formBuilder.group({
            name: ["", [Validators.required]],
            addressLine1: ["", [Validators.required]],
            addressLine2: [""],
            city: ["", [Validators.required]],
            state: ["", [Validators.required]],
            country: ["", [Validators.required]],
            zip: ["", [Validators.required]],
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
            email: ["", [Validators.required]],
            phone: ["", [Validators.required]],
            password: ["", [Validators.required]],
            active: [false, [Validators.required]],
        });
        this.selectedVendor = this.route.snapshot.paramMap.get("id");
        if (this.selectedVendor !== null) {
            this.getData(this.selectedVendor);
        }
    }

    getData(data: any) {
        this.vendorsService.showVendor(data).subscribe((res: any) => {
            delete res.password;
            this.vendorsForm.patchValue(res);
        });
    }

    tabChanged(tabChangeEvent: MatTabChangeEvent): void {
        this.selectedIndex = tabChangeEvent.index;
        console.log(this.selectedIndex);
    }

    nextStep() {
        const maxNumberOfTabs = 4;
        if (this.selectedIndex != maxNumberOfTabs) {
            this.selectedIndex = this.selectedIndex + 1;
        }
    }

    previousStep() {
        if (this.selectedIndex != 0) {
            this.selectedIndex = this.selectedIndex - 1;
        }
    }

    postData() {
        this.vendorsForm.markAllAsTouched();
        if (this.vendorsForm.invalid) {
            console.log("this.vendors", this.vendorsForm.value);
            this._snackBar.open("All fields are required", "", {
                duration: 2000,
                verticalPosition: "top",
            });
            return false;
        }
        if (this.selectedVendor) {
            this.vendorsService
                .updateVendors(this.selectedVendor, this.vendorsForm.value)
                .subscribe(
                    (res: any) => {
                        this.vendorsForm.reset();
                        this._snackBar.open(res.message, "", {
                            duration: 2000,
                            verticalPosition: "top",
                        });
                        setTimeout(() => {
                            this.router.navigate(["/vendors"]);
                        }, 2000);
                    },
                    (errors) => {
                        console.log(errors);
                        this._snackBar.open(errors.error.message, "", {
                            duration: 2000,
                            verticalPosition: "top",
                        });
                    }
                );
        } else {
            this.vendorsService.addVendors(this.vendorsForm.value).subscribe(
                (res: any) => {
                    this.vendorsForm.reset();
                    this._snackBar.open(res.message, "", {
                        duration: 2000,
                        verticalPosition: "top",
                    });
                },
                (errors) => {
                    console.log(errors);
                    this._snackBar.open(errors.error.message, "", {
                        duration: 2000,
                        verticalPosition: "top",
                    });
                }
            );
        }
    }
}
