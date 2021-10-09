import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-product-subcategory',
  templateUrl: './product-subcategory.component.html',
  styleUrls: ['./product-subcategory.component.scss']
})
export class ProductSubcategoryComponent implements OnInit {
  @ViewChild('content') content: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  addProductSubCategoryForm: FormGroup;
  selectedProductSubCategory: any;
  getProductCategories: [];

  constructor(private http: HttpClient, private modalService: NgbModal, private _formBuilder: FormBuilder, private _authService: AuthService) { }
  

  displayedColumns: string[] = ['name',   'description',  'action'];
 
  ngAfterViewInit(): void {
    this.getCategories();
    this.compileTable();
    this.getData();
  }

  ngOnInit(): void {
    this.addProductSubCategoryForm = this._formBuilder.group({
      subCategoryName: ['', [Validators.required]],
      subCategoryDescription: ['', [Validators.required]],
      categoryId: ['', [Validators.required]]
    })
  }

  getCategories() {
    this._authService.getProductCategory().subscribe((res: any) => {
      //console.log(res);
      this.getProductCategories = res;
    } )
  }

  getData(): void {
    this._authService.getSubProductCategory().subscribe((res: any) => {
     // console.log(res);
       res.sort((a, b) => {
        var dateA = new Date(a.registerationDateTime).getTime();
        var dateB = new Date(b.registerationDateTime).getTime();
        return dateA > dateB ? 1 : -1;
      })
      this.compileTable(res);
    })
  }

  postData() {
    console.log(this.addProductSubCategoryForm.value)
    if(this.addProductSubCategoryForm.invalid) {
      alert('All fields are required');
      return false;
    }
    if(this.selectedProductSubCategory) {
      this._authService.updateProductSubCategory(this.selectedProductSubCategory, this.addProductSubCategoryForm.value).subscribe(
        (results: any) => {
            //console.log(results);
            this.addProductSubCategoryForm.reset();
            this.modalService.dismissAll();
            this.getData();
        },
        errors => {
            console.log(errors);
        }
      )
    } else {
      this._authService.addNewProductSubCategory(this.addProductSubCategoryForm.value).subscribe(
        (results: any) => {
            //console.log(results);
            this.addProductSubCategoryForm.reset();
            this.modalService.dismissAll();
            this.getData();
        },
        errors => {
            console.log(errors);
        }
      )
    }
  }

  deleteSubCategory(delSubCategory:any) {
    //console.log(delSubCategory);
    if(confirm("Are you sure to delete ?")) {
      //console.log("Implement delete functionality here");
      this._authService.deleteProductSubCategory(delSubCategory).subscribe(
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
    this.selectedProductSubCategory = id;
    //console.log(data);
    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openUpdateModal(data:any) {
    //console.log(data.categoryName);
    this.openModal(data._id);
    // this.countryFlag = ''
    this.addProductSubCategoryForm.patchValue({
      'subCategoryName': data.subCategoryName,
      'subCategoryDescription': data.subCategoryDescription
    });
  }

}
