import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  dataSource = new MatTableDataSource<any>();
  addCategoryForm: FormGroup;
  constructor(private http: HttpClient, private modalService: NgbModal, private _formBuilder: FormBuilder, private _authService: AuthService) { }

  displayedColumns: string[] = ['name', 'action'];
 
  ngAfterViewInit(): void {
    this.compileTable();
    this.getData();
    //console.log(this.dataSource);
  }

  getData(): void {
    this.http.get('http://18.221.25.167:3000/admin/interest').subscribe((res: any) => {
      //console.log(res);
      this.compileTable(res);
    })
  }

  ngOnInit(): void {
    this.addCategoryForm = this._formBuilder.group({
      name: ['', [Validators.required]]
    })
  }

  postData() {
    console.log(this.addCategoryForm.value)
    this._authService.addNewCategory(this.addCategoryForm.value).subscribe(
      (results: any) => {
          //console.log(results);
          this.addCategoryForm.patchValue({name: ''})
          this.modalService.dismissAll();
          this.getData();
      },
      errors => {
          console.log(errors);
      }
  )
  }

  deleteCategory(delCategory:any, index:any) {
    console.log(delCategory);
    this._authService.deleteCategory(delCategory).subscribe(
      (res: any) => {
        //console.log(res);
        //this.modalService.dismissAll();
        this.getData();
      }
    )
  }
  compileTable(data = []) {
    this.dataSource = new MatTableDataSource<any>(data)
    //this.dataSource.paginator = this.paginator;
  }

  openModal() {
    //console.log(data);
     
    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  
  

 

  

}
