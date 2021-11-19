import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesService } from '../../services/categories.service';
import { SubCategoriesService } from 'app/modules/services/sub-Categories.service';
import { SubChildCategoryService } from 'app/modules/services/sub-child-category.service';

@Component({
  selector: 'app-sub-child-category',
  templateUrl: './sub-child-category.component.html',
  styleUrls: ['./sub-child-category.component.scss']
})
export class SubChildCategoryComponent implements OnInit {

 

  @ViewChild('content') content:any
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  @ViewChild('Paginator') Paginator!: MatPaginator;
  subChildCategoriesForm:FormGroup;
  seletedSubCategory: any;
  previewImg: any;
  loading: boolean = false;
  setBulkDeleteItems = [];
  getCategoriesList :any[];
  subChildCategories: any[];
  getSubCategoriesList: any[];
  tablePaging = {
    offset: 0,
    limit: 5,
    previousSize: 0
  };
  userDataPromise: any;
  showPreview : boolean = false;
  showImageBox : boolean = false;
  storeImg:any = File;
  url: any;
  ImageBox: any;
  imgUploading : boolean = false;
  constructor(private http: HttpClient, private modalService: NgbModal, private _formBuilder: FormBuilder, private categoriesService: CategoriesService , private subCategoriesService: SubCategoriesService, private subChildCategoryService: SubChildCategoryService, private _snackBar: MatSnackBar) { }

  displayedColumnsOne: string[] = ['check', 'banner', 'name', 'description', 'category', 'subCategory', 'action'];
  ngOnInit(): void {
    this.subChildCategoriesForm = this._formBuilder.group({
      subChildCategoryName:['', [Validators.required]],
      category: ['', [Validators.required]],
      subCategory: ['', [Validators.required]],
      subChildCategoryBannerPicture: [''],
      subChildCategoryBanner: [''],
      subChildCategoryDescription: ['', [Validators.required]],
      metaTitle: ['', [Validators.required]],
      metaDescription: ['', [Validators.required]],
      seoUrl: ['', [Validators.required]]
    })
    this.getCategories();
    this.getData();
  }

  ngAfterViewInit() {
    this.getData()
  }

  getCategories() {
    this.categoriesService.listCategories().subscribe((res:any) => {
      this.getCategoriesList = res.Categories;
    },(errors:any) => {
       console.log(errors)
    })
  }

  getCategoryValue(e:any) {
    this.getSubCategories(e.target.value)
  }

  getSubCategories(data: any) {
    this.subCategoriesService.getDataByCategoryId(data).subscribe((res: any) => {
      this.getSubCategoriesList = res.SubCategory;
      console.log(this.getSubCategoriesList)
    }, (errors:any) => {
      console.log(errors)
    })
  }

  getData() {
    this.subChildCategoryService.getSubChildCategories({ params: this.tablePaging }).subscribe((res: any) => {
      this.loading = false;
      this.subChildCategories = res.SubChildCategories;
      this.subChildCategories.length = res.total;
      this.dataSource = new MatTableDataSource<any>(this.subChildCategories);
      this.dataSource.paginator = this.Paginator;
    })
  }

  getNextData() {
    this.loading = true
    if(this.userDataPromise){
      this.userDataPromise.unsubscribe();
    }
    this.userDataPromise = this.subChildCategoryService.getSubChildCategories({ params: this.tablePaging }).subscribe((response: any) => {
      this.loading = false;
      this.subChildCategories.length = this.tablePaging['previousSize'];
      this.subChildCategories.push(...response.SubChildCategories);
      this.subChildCategories.length = response.total;
      this.dataSource = new MatTableDataSource<any>(this.subChildCategories);
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
    var filterData = filterValue.trim().toLowerCase();
    //this.getNextData();
    this.userDataPromise = this.subChildCategoryService.filterSubChildCategories(filterData).subscribe((res: any) => {
      this.loading = false;
      this.subChildCategories = res.SubChildCategories;
      this.subChildCategories.length = res.total;
      this.dataSource = new MatTableDataSource<any>(this.subChildCategories);
      this.dataSource.paginator = this.Paginator;
    })
  }

  openModal(id = null) {
    this.seletedSubCategory = id;
    //console.log(data);
    this.modalService.open(this.content, {size: 'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
      this.subChildCategoriesForm.reset();
      this.url = '';
      this.showPreview = false;
      this.showImageBox = false;
    });
  }

  openUpdateModal(data: any) {
    this.openModal(data._id);
    this.subChildCategoriesForm.patchValue(data);
    this.subChildCategoriesForm.patchValue({
      'category': data.category._id
    })
    this.subChildCategoriesForm.patchValue({
      'subCategory': data.subCategory._id
    })
    this.showImageBox = true;
    this.ImageBox = data.subChildCategoryBanner;
  }

  onSelectedImage(e: any) {
    this.showPreview = true
    const that = this;
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function() {
        that.url = reader.result;
      }
      reader.readAsDataURL(e.target.files[0]);
    }
    this.storeImg = e.target.files[0];
  }

  postFormInput() {
    this.subChildCategoriesForm.markAllAsTouched();
    if (this.subChildCategoriesForm.invalid) {
      console.log('this.subChildCategoriesForm', this.subChildCategoriesForm.value)
      return false;
    }
    if (this.seletedSubCategory) {
      if(this.subChildCategoriesForm.value.subChildCategoryBannerPicture == '') {
        this.subChildCategoriesForm.patchValue({
          'subChildCategoryBanner': undefined
        })
      }
      this.subChildCategoryService.updateSubChildCategories(this.seletedSubCategory, this.subChildCategoriesForm.value).subscribe(
        (results: any) => {
          this.modalService.dismissAll();
          this.subChildCategoriesForm.reset();
          this.getNextData()
        },
        errors => {
          console.log(errors);
        }
      )
    } else {
      if (this.showPreview == false ) {
        this._snackBar.open('Banner is required',  '', {
          duration: 2000,
          verticalPosition: 'top'
        })
        return false
      } else {
        this.subChildCategoryService.addSubChildCategories(this.subChildCategoriesForm.value).subscribe(
          (res: any) => {
            this.modalService.dismissAll();
            this.subChildCategoriesForm.reset();
            this.getNextData();
          },
          errors => {
            console.log(errors);
          }
        )
      }
    }
  }

  postData() {
    this.subChildCategoriesForm.markAllAsTouched();
    if(this.subChildCategoriesForm.invalid) {
      this._snackBar.open('All fields are required',  '', {
        duration: 2000,
        verticalPosition: 'top'
      })
      return false
    }
    const formData = new FormData();
    formData.append('banner', this.storeImg) 
    const filename = this.storeImg.name.split('.').pop(); 
    const file = filename.toLowerCase();
    this.imgUploading = true
    if(this.subChildCategoriesForm.value.subChildCategoryBannerPicture !==  '') {
      if(file.match(/png/g)  || file.match(/jpeg/g) || file.match(/jpg/g)) {
        this.subChildCategoryService.uploadSubChildCategoryBanner(formData).subscribe((res:any)=> {
            this.subChildCategoriesForm.patchValue({
              'subChildCategoryBanner': res.imagePath
            })
            this.imgUploading = false
            this.postFormInput();
          },(errors) => {
            console.log(errors)
        })
      } else {
        this._snackBar.open('Only jpg, png and jpeg formats are allowed',  '', {
          duration: 2000,
          verticalPosition: 'top'
        })
        return false
      } 
    } else {
      this.imgUploading = false;
      this.postFormInput();
    }
  }

  deleteCategory(deleteCategory: any) {
    if (confirm("Are you sure to delete ?")) {
      this.subChildCategoryService.deleteSubChildCategories(deleteCategory).subscribe(
        (res: any) => {
         this.getNextData()
        }
      )
    }
  }

  checkAllDeleteItems(e:any) {
    var items:any =  document.getElementsByClassName("deleteChecks");
    if(e.target.checked) {
      for (let i = 0; i < items.length; i++) {
        let element = items[i];
        element.checked = true
        let getId = element.getAttribute('id')
        this.setBulkDeleteItems.push(getId)
      }
    } else {
      for (let i = 0; i < items.length; i++) {
        let element = items[i];
        element.checked = false
        this.setBulkDeleteItems = []
      }
   }
  }

  getDeleteItems(event: any, index:any) {
    let checkElement = <HTMLInputElement> document.getElementById('deleteAll');
    checkElement.checked = false
    var element = <HTMLInputElement> document.getElementById(event._id);
    var isChecked = element.checked;  
    if(isChecked) {
      this.setBulkDeleteItems.push(event._id);
    } else {
      this.setBulkDeleteItems.splice(index, 1)
    } 
  }


  BulkDelete() {
    if(typeof this.setBulkDeleteItems !== undefined && this.setBulkDeleteItems.length > 0) {
      if (confirm("Are you sure to delete ?")) {
        this.subChildCategoryService.bulkDelete(this.setBulkDeleteItems).subscribe((res:any) => {
          let element = <HTMLInputElement> document.getElementById('deleteAll');
          element.checked = false
          this._snackBar.open(res.message, '', {
            duration: 2000,
            verticalPosition: 'top'
          });
          this.getNextData();
        }, (errors:any) => {
          console.log(errors)
        })
      }
    }
    else {
      this._snackBar.open('No product selected', '', {
        duration: 2000,
        verticalPosition: 'top'
      });
    }
  }

  hasFocus = false;

  quillConfig={
    //toolbar: '.toolbar',
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
    
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
    
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
    
        ['clean'],                                         // remove formatting button
    
        ['link', 'image', 'video']                         // link and image, video
      ]
      
    },
  }

  onSelectionChanged = (event: any) =>{
    console.log(this.subChildCategoriesForm.value.categoryDescription)
    if(event.oldRange == null){
      this.onFocus();
    }
    if(event.range == null){
      this.onBlur();
    }
  }

  onContentChanged = (event) =>{
    //console.log(event.html);
  }

  onFocus = () =>{
    console.log("On Focus");
  }
  onBlur = () =>{
    console.log("Blurred");
  }

}
