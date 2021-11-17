import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { VendorService } from '../../services/vendor.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-vendor',
  templateUrl: './edit-vendor.component.html',
  styleUrls: ['./edit-vendor.component.scss']
})
export class EditVendorComponent implements OnInit {
  vendorsEditForm: FormGroup;
  selectedIndex: number = 0;
  getId: any;
  constructor(private vendorsService: VendorService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.vendorsEditForm = this._formBuilder.group({
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
     
    this.getId = this.route.snapshot.paramMap.get('id');
    this.getData(this.getId)
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

  getData(data:any) {
    this.vendorsService.showVendor(data).subscribe((res:any) =>{
      console.log(res)
      //this.getRes = res;
      delete res.password;
      this.vendorsEditForm.patchValue(res)
    })
  }

  postData() {
    this.vendorsEditForm.markAllAsTouched();
    if (this.vendorsEditForm.invalid) {
      console.log('this.vendors', this.vendorsEditForm.value)
      this._snackBar.open('All fields are required', '', {
        duration: 2000,
        verticalPosition: 'top'
      })
      return false;
    }
    this.vendorsService.updateVendors(this.getId, this.vendorsEditForm.value).subscribe(
      (res: any) => {
        console.log(res);
        this.vendorsEditForm.reset();
        this._snackBar.open(res.message, '', {
          duration: 2000,
          verticalPosition: 'top'
        })
      },
      errors => {
        console.log(errors);
      }
    )
    
  }

}
