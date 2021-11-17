import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.scss']
})


export class AddVendorComponent implements OnInit {
  vendorsForm: FormGroup;
  selectedIndex: number = 0;
  constructor(private _formBuilder: FormBuilder, private vendorsService: VendorService, private http: HttpClient, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.vendorsForm = this._formBuilder.group({
      name:['', [Validators.required]],
      addressLine1:  ['', [Validators.required]],
      addressLine2:   [''],
      city:   ['', [Validators.required]],
      state:   ['', [Validators.required]],
      country:   ['', [Validators.required]],
      zip:   ['', [Validators.required]],
      company: this._formBuilder.group({
        companyName: ['', [Validators.required]],
        companyType: ['', [Validators.required]]
      }),
      bankAccountType:   ['', [Validators.required]],
      bankAccountName :  ['', [Validators.required]],
      bankAccountDetails:   this._formBuilder.group({
        accountNo: ['', [Validators.required]],
        ifsc: ['', [Validators.required]]
      }),
      panNumber:   ['', [Validators.required]],
      gstNumber:   ['', [Validators.required]],
      memberShip:   ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required]],
      active: [false, [Validators.required]],
    })
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedIndex = tabChangeEvent.index;
    console.log(this.selectedIndex)
  }

  nextStep() {
    const maxNumberOfTabs = 11
    if (this.selectedIndex != maxNumberOfTabs) {
      this.selectedIndex = this.selectedIndex + 1;
    }
    console.log(this.selectedIndex);
  }

  previousStep() {
    if (this.selectedIndex != 0) {
      this.selectedIndex = this.selectedIndex - 1;
    }
    console.log(this.selectedIndex);
  }

  postData() {
    this.vendorsForm.markAllAsTouched();
    if (this.vendorsForm.invalid) {
      console.log('this.vendors', this.vendorsForm.value)
      this._snackBar.open('All fields are required', '', {
        duration: 2000,
        verticalPosition: 'top'
      })
      return false;
    }
    this.vendorsService.addVendors(this.vendorsForm.value).subscribe(
      (res: any) => {
        console.log(res);
        this.vendorsForm.reset();
        this._snackBar.open(res.message, '', {
          duration: 2000,
          verticalPosition: 'top'
        })
      },
      errors => {
        console.log(errors);
        this._snackBar.open(errors.error.message, '', {
          duration: 2000,
          verticalPosition: 'top'
        })
      }
    )
    
  }

}
