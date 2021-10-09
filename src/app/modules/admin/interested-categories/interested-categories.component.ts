import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'app/core/auth/auth.service';


@Component({
  selector: 'app-interested-categories',
  templateUrl: './interested-categories.component.html',
  styleUrls: ['./interested-categories.component.scss']
})
export class InterestedCategoriesComponent implements OnInit {
 
  @ViewChild('content') content: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource;
  addInterestedCategoryForm: FormGroup;
  selectedInterestedCategory: any;
  constructor(private http: HttpClient, private modalService: NgbModal, private _formBuilder: FormBuilder, private _authService: AuthService) { }

  displayedColumns: string[] = ['name', 'action'];
 
  ngAfterViewInit(): void {
    this.compileTable();
    this.getData();
    //console.log(this.dataSource);
  }

  getData(): void {
    this._authService.getInterestedCategory().subscribe((res: any) => {
      //console.log(res);
      res.sort((a, b) => {
        var dateA = new Date(a.registerationDateTime).getTime();
        var dateB = new Date(b.registerationDateTime).getTime();
        return dateA > dateB ? 1 : -1;
      })
      this.compileTable(res);
    })
  }

  ngOnInit(): void {
    this.addInterestedCategoryForm = this._formBuilder.group({
      name: ['', [Validators.required]]
    })
  }

  postData() {
    console.log(this.addInterestedCategoryForm.value)
    if(this.addInterestedCategoryForm.invalid) {
      alert('All fields are required');
      return false;
    }
    if(this.selectedInterestedCategory) {
      this._authService.updateInterestedCategory(this.selectedInterestedCategory, this.addInterestedCategoryForm.value).subscribe(
        (results: any) => {
            //console.log(results);
            this.addInterestedCategoryForm.patchValue({name: ''})
            this.modalService.dismissAll();
            this.getData();
        },
        errors => {
            console.log(errors);
        }
      )
    } else {
      this._authService.addNewInterestedCategory(this.addInterestedCategoryForm.value).subscribe(
        (results: any) => {
            //console.log(results);
            this.addInterestedCategoryForm.patchValue({name: ''})
            this.modalService.dismissAll();
            this.getData();
        },
        errors => {
            console.log(errors);
        }
      )
    }
   
  }

  deleteCategory(delCategory:any) {
    console.log(delCategory);
    if(confirm("Are you sure to delete ?")) {
      console.log("Implement delete functionality here");
      this._authService.deleteInterestedCategory(delCategory).subscribe(
        (res: any) => {
          //console.log(res);
          //this.modalService.dismissAll();
          this.getData();
        }
      )
    }
    
  }
  compileTable(data = []) {
    this.dataSource = new MatTableDataSource<any>(data)
    this.dataSource.paginator = this.paginator;
  }

  openModal(id = null) {
    this.selectedInterestedCategory = id;
    //console.log(data);
     
    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  
  openUpdateModal(data:any) {
    console.log(data.name);
    this.openModal(data._id);
    
    console.log(data.countryPhoneCode);
    // this.countryFlag = ''
    this.addInterestedCategoryForm.patchValue({
      'name': data.name,
     

    });

  }

 

  

}
