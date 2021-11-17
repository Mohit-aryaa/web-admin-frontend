import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesService } from '../../services/categories.service';

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
  storeImg :any = File;
  showPreview : boolean = false;
  showImageBox: boolean = false;
  selectedCategory: any;
  previewImg: any;
  loading: boolean = false;
  categories: any[];
  tablePaging = {
    offset: 0,
    limit: 20,
    previousSize: 0
  };
  userDataPromise: any;
  setBulkDeleteItems = [];
  setCheckInputs: any[];
  url:any;
  imgUploading: boolean = false;
  ImageBox: any;
  constructor(private http: HttpClient, private modalService: NgbModal, private _formBuilder: FormBuilder, private categoryService: CategoriesService,private _snackBar: MatSnackBar) { }

  displayedColumnsOne: string[] = ['check','banner', 'name', 'description', 'action'];
  ngOnInit(): void {
    this.categoriesForm = this._formBuilder.group({
      categoryName:['', [Validators.required]],
      categoryBannerPicture: [''],
      categoryBanner: [''],
      categoryDescription: ['', [Validators.required]],
      metaTitle: ['', [Validators.required]],
      metaDescription: ['', [Validators.required]],
      seoUrl: ['', [Validators.required]]
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
      console.log('this.categories', this.categories)
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
    this.modalService.open(this.content, {size:'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.categoriesForm.reset();
      this.url = '';
      this.showPreview = false;
      this.showImageBox = false;
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });
  }

  openUpdateModal(data: any) {
    console.log(data);
    this.openModal(data._id);
    this.categoriesForm.patchValue(data);
    this.showImageBox = true;
    this.ImageBox = data.categoryBanner;
    console.log(this.ImageBox)
  }

  onSelectedImage(e: any) {
      this.showPreview = true
      const that = this;
    //this.isUploading = true;
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = function() {
          that.url = reader.result;
          //console.log(that.previewImg)
        }
        reader.readAsDataURL(e.target.files[0]);
      }
      this.storeImg = e.target.files[0];
    
  }

  postFormInput() {
    this.categoriesForm.markAllAsTouched();
    if (this.categoriesForm.invalid) {
      console.log('this.categoriesForm', this.categoriesForm.value)
      return false;
    }
    if (this.selectedCategory) {
      if(this.categoriesForm.value.categoryBannerPicture == '') {
        this.categoriesForm.patchValue({
          'categoryBanner': undefined
        })
      }
      this.categoryService.updateCategories(this.selectedCategory, this.categoriesForm.value).subscribe(
        (results: any) => {
          //console.log(results);
          this.modalService.dismissAll();
          this.categoriesForm.reset();
          this.showImageBox = false;
          console.log(this.categories.length)
          
          this.getNextData()
          
        },
        errors => {
          console.log(errors);
        }
      )
    } else  {
      if (this.showPreview == false ) {
        this._snackBar.open('Banner is required',  '', {
          duration: 2000,
          verticalPosition: 'top'
        })
        return false
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
  }

  postData() {
    this.categoriesForm.markAllAsTouched();
    if(this.categoriesForm.invalid) {
      this._snackBar.open('All fields are required',  '', {
        duration: 2000,
        verticalPosition: 'top'
      })
      return false
    }
    console.log(this.storeImg)
    const formData = new FormData();
    
    formData.append('images', this.storeImg) 
    const filename = this.storeImg.name.split('.').pop(); 
    const file = filename.toLowerCase(); 
    console.log(formData)
    this.imgUploading = true
    if(this.categoriesForm.value.categoryBannerPicture !==  '') {
      if(file.match(/png/g)  || file.match(/jpeg/g) || file.match(/jpg/g)) {
        this.categoryService.uploadCategoryBanner(formData).subscribe((res:any)=> {
          console.log(res)
            this.categoriesForm.patchValue({
              'categoryBanner': res.imagePath
            })
            this.imgUploading = false
            this.postFormInput();
            console.log(this.categoriesForm.value)
          },(errors) => {
            console.log(errors)
        })
      } else {
        this._snackBar.open('Only jpg, png and jpeg formats are allowed',  '', {
          duration: 2000,
          verticalPosition: 'top'
        })
        console.log('Only jpg, png and jpeg formats are allowed')
        console.log(file)
        return false
      } 
    } else {
      this.imgUploading = false;
      this.postFormInput();
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

  checkAllDeleteItems(e:any) {
    //console.log(e)
    var items:any =  document.getElementsByClassName("deleteChecks");
    if(e.target.checked) {
      for (let i = 0; i < items.length; i++) {
        let element = items[i];
        element.checked = true
        let getId = element.getAttribute('id')
        console.log(element);
        this.setBulkDeleteItems.push(getId)
      
      }
    } else {
      for (let i = 0; i < items.length; i++) {
        let element = items[i];
        element.checked = false
        console.log(element);
        this.setBulkDeleteItems = []
      }
   }

   
  }

  getDeleteItems(event: any, index:any) {
    let checkElement = <HTMLInputElement> document.getElementById('deleteAll');
    checkElement.checked = false
    var element = <HTMLInputElement> document.getElementById(event._id);
    var isChecked = element.checked;  
    console.log('index', this.setBulkDeleteItems)
    //console.log('element', event)
    if(isChecked) {
      this.setBulkDeleteItems.push(event._id);
    } else {

      this.setBulkDeleteItems.splice(index, 1)
    }
      console.log(this.setBulkDeleteItems) 
  }


  BulkDelete() {
    //console.log('bulkDelete')
    if(typeof this.setBulkDeleteItems !== undefined && this.setBulkDeleteItems.length > 0) {
      if (confirm("Are you sure to delete ?")) {
        this.categoryService.bulkDelete(this.setBulkDeleteItems).subscribe((res:any) => {
          console.log('response', res)
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
    console.log(this.categoriesForm.value.categoryDescription)
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
