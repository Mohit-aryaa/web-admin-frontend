import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource  } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'app/core/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('content') content: any;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource;
  addAdminForm: FormGroup;
  getInterestCategories: [];
  selectedUser: any;
  countryPhoneCode: any;
  countryFlag: string = 'in';
  telObject: any;

  constructor(private _authService: AuthService, private http: HttpClient, 
    private modalService: NgbModal, private _formBuilder: FormBuilder) { }

  displayedColumns: string[] = ['name', 'email', 'gender', 'phone', 'registerdWith', 'action'];

  

  ngOnInit(): void {
    this.addAdminForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      countryPhoneCode: ['+91', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      registerdWith: ['', [Validators.required]],
      interestCategories: ['', [Validators.required]],
      roleType: ['', [Validators.required]],
      phoneVerified: [false],
      emailVerified: [false],
      isActive:  [false]
    })
  }

  ngAfterViewInit(): void {
    this.compileTable();
    this.getData();
    this.getInterestedCategory();
  }

  getData() {
    this._authService.getAdminUsers().subscribe((res) => {
      res.sort((a, b) => {
        var dateA = new Date(a.registerationDateTime).getTime();
        var dateB = new Date(b.registerationDateTime).getTime();
        return dateA > dateB ? 1 : -1;
      })
      this.compileTable(res);

      //console.log(res);
    })
  }

 
 

  compileTable(data = []) {
    this.dataSource = new MatTableDataSource<any>(data)
    this.dataSource.paginator = this.paginator;
  }

  openModal(id = null) {
    this.selectedUser = id;
    //console.log(data);
    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
       
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  postAdminData() {
    //console.log(this.addAdminForm.value);
    if(this.addAdminForm.invalid) {
      alert('All fields are required');
      return false;
    }
      if(this.selectedUser) {
        this._authService.updateAdminUsers(this.selectedUser, this.addAdminForm.value).subscribe(
          (res: any) => {
            //console.log(res);
            this.getData();
            const dialCode = this.addAdminForm.value.countryPhoneCode;
            this.addAdminForm.reset();
            console.log(dialCode);
            this.addAdminForm.patchValue({
              'countryPhoneCode': dialCode
            })
            this.modalService.dismissAll();
          },
          (errors) => {
            console.log(errors);
          }
        )
      } else {
        this._authService.addAdminUsers(this.addAdminForm.value).subscribe(
          (res: any) => {
            //console.log(res);
            this.getData();
            this.addAdminForm.reset();
           
            this.modalService.dismissAll();
           
          },
          (errors) => {
            console.log(errors);
          }
        )
      }
    
  }

  // telInputObject(obj) {
  //   this.telObject = obj;
  //   console.log('this.telObject', this.telObject)
  //   this.telObject.setCountry(this.telObject.q[1][0]);
  // }

  openUpdateModal(data:any) {
    console.log(data.name);
    this.openModal(data._id);
    
    console.log(data.countryPhoneCode);
    // this.countryFlag = ''
    this.addAdminForm.patchValue({
      'name': data.name,
      'gender': data.gender,
      'dateOfBirth': data.dateOfBirth,
      'email': data.email,
      'countryPhoneCode': data.countryPhoneCode,
      'phone': data.phone,
      'registerdWith': data.registerdWith,
      'interestCategories': data.interestCategories,
      'roleType':data.roleType,
      'phoneVerified': data.phoneVerified,
      'emailVerified': data.emailVerified,
      'isActive': data.isActive

    });

    // console.log(this.addAdminForm.patchValue(this.addAdminForm.value));
    // console.log('update click');

  }

  deleteAdminUser(data: any) {
    if(confirm("Are you sure to delete?")) {
      console.log("Implement delete functionality here");
    }
  }

  getInterestedCategory() {
    this._authService.getInterestedCategory().subscribe((res: any) => {
      this.getInterestCategories = res;
      //console.log('getInterestCategories', this.getInterestCategories);
    })
  }

  onCountryChange(event: any) {
    console.log('dial', event.dialCode);
    console.log(event);
    this.countryPhoneCode = '+' +event.dialCode;
    console.log(this.countryPhoneCode);
    this.addAdminForm.patchValue({'countryPhoneCode': this.countryPhoneCode});
    //this.countryFlag = event.iso2
  }

  

  

}
