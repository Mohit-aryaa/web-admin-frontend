import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  @ViewChild('content') content:any
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  @ViewChild('Paginator') Paginator!: MatPaginator;
  categoriesForm:FormGroup;
  selectedCategory: any;
  previewImg: any;
  loading: boolean = false;
  categories: any[];
  tablePaging = {
    offset: 0,
    limit: 5,
    previousSize: 0
  };
  userDataPromise: any;
  constructor(private http: HttpClient, private modalService: NgbModal, private _formBuilder: FormBuilder, private categoryService: CategoriesService) { }

  displayedColumnsOne: string[] = ['name', 'description', 'action'];
  ngOnInit(): void {
    this.categoriesForm = this._formBuilder.group({
      categoryName:['', [Validators.required]],
      categoryDescription: ['', [Validators.required]]
    })
  }

  ngAfterViewInit() {
    this.getData()
  }

 

  getData() {
    this.categoryService.getCategories({ params: this.tablePaging }).subscribe((res: any) => {
      //console.log('getdata', res);
      this.loading = false;
      this.categories = res.Categories;
      console.log('this.users', this.categories)
      this.categories.length = res.total;
      this.dataSource = new MatTableDataSource<any>(this.categories);
      this.dataSource.paginator = this.Paginator;
    })
  }

  getNextData() {
    this.loading = true
    if(this.userDataPromise){
      this.userDataPromise.unsubscribe();
    }
    this.userDataPromise = this.categoryService.getCategories({ params: this.tablePaging }).subscribe((response: any) => {
        this.loading = false;
        console.log(response.Categories)
        this.categories.length = this.tablePaging['previousSize'];
        this.categories.push(...response.Categories);

        this.categories.length = response.total;
        this.dataSource = new MatTableDataSource<any>(this.categories);
        this.dataSource._updateChangeSubscription();
        this.dataSource.paginator = this.Paginator;

      })
  }


  pageChanged(event: any) {
    this.tablePaging['limit'] = event.pageSize;
    this.tablePaging['offset'] = event.pageIndex.toString();
    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;
    let previousIndex = event.previousPageIndex;
    let previousSize = pageSize * pageIndex;
    this.tablePaging['previousSize'] = previousSize;
    this.getNextData();
    //this.dataTableSize = event.pageSize
  }

  applyCategoryFilter(filterValue: string) {
    console.log('this.tablePaging', this.tablePaging);
    var filterData = filterValue.trim().toLowerCase();
    //this.getNextData();
    this.userDataPromise = this.categoryService.filterCategories(filterData).subscribe((res: any) => {
      this.loading = false;
      this.categories = res.categories;
      console.log('this.Products', this.categories)
      this.categories.length = res.total;
      this.dataSource = new MatTableDataSource<any>(this.categories);
      this.dataSource.paginator = this.Paginator;
    })
  }

  openModal(id = null) {
    this.selectedCategory = id;
    //console.log(data);
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.categoriesForm.reset();
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });
  }

  openUpdateModal(data: any) {
    console.log(data);
    this.openModal(data._id);
    this.categoriesForm.patchValue(data);
  }

  postData() {
    this.categoriesForm.markAllAsTouched();
    if (this.categoriesForm.invalid) {
      console.log('this.categoriesForm', this.categoriesForm.value)
      return false;
    }
    if (this.selectedCategory) {
      this.categoryService.updateCategories(this.selectedCategory, this.categoriesForm.value).subscribe(
        (results: any) => {
          //console.log(results);
          this.modalService.dismissAll();
          this.categoriesForm.reset();
          console.log(this.categories.length)
          
          this.getNextData()
          
        },
        errors => {
          console.log(errors);
        }
      )
    } else {
      this.categoryService.addCategories(this.categoriesForm.value).subscribe(
        (res: any) => {
          console.log(res);
          this.modalService.dismissAll();
          this.categoriesForm.reset();
          console.log(this.categories.length)
          this.getNextData();
          
        },
        errors => {
          console.log(errors);
        }
      )
    }
  }

  deleteCategory(deleteCategory: any) {
    //console.log(delSubCategory);
    if (confirm("Are you sure to delete ?")) {
      //console.log("Implement delete functionality here");
      this.categoryService.deleteCategories(deleteCategory).subscribe(
        (res: any) => {
         this.getNextData()
        }
      )
    }
  }


}
