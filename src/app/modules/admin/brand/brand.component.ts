import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BrandService } from '../../services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

  @ViewChild('content') content:any
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  @ViewChild('Paginator') Paginator!: MatPaginator;
  brandsForm:FormGroup;
  selectedBrand: any;
  previewImg: any;
  loading: boolean = false;
  Brands: any[];
  getCategoriesList :any[];
  tablePaging = {
    offset: 0,
    limit: 20,
    previousSize: 0
  };
  userDataPromise: any;
  setBulkDeleteItems = [];
  showPreview: Boolean = false;
  url: any;
  storeImg :any = File;
  imgUploading: Boolean = false;
  ImageBox: any;
  showImageBox: boolean = false;
  constructor(private http: HttpClient, private modalService: NgbModal, private _formBuilder: FormBuilder, private brandsService: BrandService, private _snackBar: MatSnackBar) { }

  displayedColumnsOne: string[] = ['check','banner', 'name', 'description', 'action'];
  ngOnInit(): void {
    this.brandsForm = this._formBuilder.group({
      brandName:['', [Validators.required]],
      brandDescription: ['', [Validators.required]],
      brandBannerPicture: [''],
      brandBanner : [''],
      metaTitle: ['', [Validators.required]],
      metaDescription: ['', [Validators.required]],
      seoUrl: ['', [Validators.required]],
    })
    this.getData();
  }

  ngAfterViewInit() {
    this.getData()
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
   console.log(this.setBulkDeleteItems)
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
    console.log(isChecked)
    console.log(this.setBulkDeleteItems)
  }

  BulkDelete() {
    if(typeof this.setBulkDeleteItems !== undefined && this.setBulkDeleteItems.length > 0) {
      if (confirm("Are you sure to delete ?")) {
        this.brandsService.bulkDelete(this.setBulkDeleteItems).subscribe((res:any) => {
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

  getData() {
    this.brandsService.getBrands({ params: this.tablePaging }).subscribe((res: any) => {
      this.loading = false;
      this.Brands = res.Brands;
      this.Brands.length = res.total;
      this.dataSource = new MatTableDataSource<any>(this.Brands);
      this.dataSource.paginator = this.Paginator;
    })
  }

  getNextData() {
    this.loading = true
    if(this.userDataPromise){
      this.userDataPromise.unsubscribe();
    }
    this.userDataPromise = this.brandsService.getBrands({ params: this.tablePaging }).subscribe((response: any) => {
      this.loading = false;
      this.Brands.length = this.tablePaging['previousSize'];
      this.Brands.push(...response.Brands);
      this.Brands.length = response.total;
      this.dataSource = new MatTableDataSource<any>(this.Brands);
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
    this.userDataPromise = this.brandsService.filterBrands(filterData).subscribe((res: any) => {
      this.loading = false;
      this.Brands = res.Brands;
      this.Brands.length = res.total;
      this.dataSource = new MatTableDataSource<any>(this.Brands);
      this.dataSource.paginator = this.Paginator;
    })
  }

  openModal(id = null) {
    this.selectedBrand = id;
    this.modalService.open(this.content, {size: 'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
      this.brandsForm.reset();
      this.url = '';
      this.showPreview = false;
      this.showImageBox = false;
    });
  }

  openUpdateModal(data: any) {
    this.openModal(data._id);
    this.brandsForm.patchValue(data);
    this.showImageBox = true;
    this.ImageBox = data.brandBanner;
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
    this.brandsForm.markAllAsTouched();
    if (this.brandsForm.invalid) {
      console.log('this.subCategoriesForm', this.brandsForm.value)
      return false;
    }
    if (this.selectedBrand) {
      if(this.brandsForm.value.brandBannerPicture == '') {
        this.brandsForm.patchValue({
          'brandBanner': undefined
        })
      }
      console.log(this.brandsForm.value)
      this.brandsService.updateBrands(this.selectedBrand, this.brandsForm.value).subscribe(
        (results: any) => {
          this.modalService.dismissAll();
          this.brandsForm.reset();
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
        this.brandsService.addBrands(this.brandsForm.value).subscribe(
          (res: any) => {
            this.modalService.dismissAll();
            this.brandsForm.reset();
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
    this.brandsForm.markAllAsTouched();
    if(this.brandsForm.invalid) {
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
    if(this.brandsForm.value.brandBannerPicture !==  '') {
      if(file.match(/png/g)  || file.match(/jpeg/g) || file.match(/jpg/g)) {
        this.brandsService.uploadBrandBanner(formData).subscribe((res:any)=> {
          console.log(res.imagePath)
            this.brandsForm.patchValue({
              'brandBanner': res.imagePath
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

  deleteBrand(deleteBrand: any) {
    if (confirm("Are you sure to delete ?")) {
      this.brandsService.deleteBrands(deleteBrand._id,deleteBrand).subscribe(
        (res: any) => {
         this.getNextData()
        }
      )
    }
  }

}
