import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {
  @ViewChild('content') content: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  addProductCategoryForm: FormGroup;
  selectedProductCategory: any;

  constructor(private http: HttpClient, private modalService: NgbModal, private _formBuilder: FormBuilder, private _authService: AuthService) { }
  

  displayedColumns: string[] = ['name', 'description', 'action'];
 
  ngAfterViewInit(): void {
    this.compileTable();
    this.getData();
    //console.log(this.dataSource);
  }

  

  ngOnInit(): void {
    this.addProductCategoryForm = this._formBuilder.group({
      categoryName: ['', [Validators.required]],
      categoryDescription: ['', [Validators.required]],
    })
  }

  getData(): void {
    this._authService.getProductCategory().subscribe((res: any) => {
      //console.log(res);
      res.sort((a, b) => {
        var dateA = new Date(a.registerationDateTime).getTime();
        var dateB = new Date(b.registerationDateTime).getTime();
        return dateA > dateB ? 1 : -1;
      })
      this.compileTable(res);
    })
  }

  postData() {
    console.log(this.addProductCategoryForm.value)
    if (this.addProductCategoryForm.invalid) {
      alert('all fields are required');
      return false;
    }
    if(this.selectedProductCategory) {
      this._authService.updateProductCategory(this.selectedProductCategory, this.addProductCategoryForm.value).subscribe(
        (results: any) => {
            //console.log(results);
            this.addProductCategoryForm.reset();
            this.modalService.dismissAll();
            this.getData();
        },
        errors => {
            console.log(errors);
        }
      )
    } else {
      this._authService.addNewProductCategory(this.addProductCategoryForm.value).subscribe(
        (results: any) => {
            //console.log(results);
            this.addProductCategoryForm.reset();
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
      this._authService.deleteProductCategory(delCategory).subscribe(
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
    this.selectedProductCategory = id;
    //console.log(data);
     
    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  
  openUpdateModal(data:any) {
    console.log(data.categoryName);
    this.openModal(data._id);
    // this.countryFlag = ''
    this.addProductCategoryForm.patchValue({
      'categoryName': data.categoryName,
      'categoryDescription': data.categoryDescription
    });
  }

}
