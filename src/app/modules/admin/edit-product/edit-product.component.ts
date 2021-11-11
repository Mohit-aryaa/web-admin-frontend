import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '../brand.service';
import { CategoriesService } from '../categories.service';
import { ProductsService } from '../products.service';
import { SubCategoriesService } from '../sub-Categories.service';
import { VendorService } from '../vendor.service';
import { of } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  getId: any;
  getBrandsList: any[];
  productsEditForm:FormGroup;
  storeImg :any = File;
  imgUploading: boolean = false;
  previewImg: any;
  getCategoriesList: any[];
  getEditData: any;
  getSubCategoriesList: any[];
  getVendorsList: any [];
  getRes: any;
  urls = [];
  getProductImages = [];
  showPreview: boolean;
  constructor(private http: HttpClient, private productsService: ProductsService,private categoriesService: CategoriesService , private subCategoriesService: SubCategoriesService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar, private router: Router, private brandsService: BrandService, private vendorsService: VendorService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCategories();
    this.getVendors();
    this.getBrands();
    this.productsEditForm = this._formBuilder.group({
      productName:['', [Validators.required]],
      productDescription:['', [Validators.required]],
      productImagepicture: [''],
      productImage:[''],
      productCode:['',[Validators.required]],
      productModel: ['', [Validators.required]],
      productCategory:['', [Validators.required]],
      productSubCategory:['', [Validators.required]],
      productBrand:['', [Validators.required]],
      vendor: ['', [Validators.required]],
      tags:['', [Validators.required]],
      productCountry:['', [Validators.required]],
      manfactureDate:['', [Validators.required]],
      stock: ['', [Validators.required]],
      todaysDeal:[false, ],
      publish:[false, ],
      featured:[false, ],
      price:['',[Validators.required]]
    })
    
    
    this.getId = this.route.snapshot.paramMap.get('id');
    this.getData(this.getId)
  }

  


  getBrands() {
    this.brandsService.listBrands().subscribe((res: any) => {
      this.getBrandsList = res.Brands
      //console.log('subcat',this.getSubCategoriesList)
    }, (errors:any) => {
      console.log(errors)
    })
  }

  getCategories() {
    this.categoriesService.listCategories().subscribe((res: any) => {
      this.getCategoriesList = res.Categories
      console.log('subcat',this.getCategoriesList)
    }, (errors:any) => {
      console.log(errors)
    })
  }

  getCategoryValue(e:any) {
    console.log(e.target.value)
    this.getSubCategories(e.target.value)
    this.productsEditForm.patchValue({
      'productSubCategory' : ''
    })
  }

  getSubCategories(data: any) {
    this.subCategoriesService.getDataByCategoryId(data).subscribe((res: any) => {
      this.getSubCategoriesList = res.SubCategory
      console.log('getSubCategoriesList',this.getSubCategoriesList)
    }, (errors:any) => {
      console.log(errors)
    })
  }

  getVendors() {
    this.vendorsService.listVendors().subscribe((res:any) => {
      this.getVendorsList = res.Vendors
    }, (errors:any) => {
      console.log(errors)
    })
  }

  

  getData(data:any) {
    this.productsService.showProduct(data).subscribe((res:any) =>{
      console.log(res);
      this.getEditData = res;
      //this.getRes = res;
      this.tags = res.tags
      this.getProductImages =  res.productImages;
      this.getSubCategories(res.productCategory);
      this.productsEditForm.patchValue(res)
    })
  }

  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const
  tags: any = []

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our fruit
    if (value) {
      this.tags.push({name: value});
      this.productsEditForm.patchValue({
        'tags': this.tags
      })
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tags: any): void {
    const index = this.tags.indexOf(tags);
    if (index >= 0) {
      this.tags.splice(index, 1);
      this.productsEditForm.patchValue({
        'tags': this.tags
      })
    }
  } 
  
  uploadProductImage(e:any) {
    
    this.showPreview = true
    this.previewImg = "";

    //console.log(e.target.files[0].name)
    this.previewImg
    const that = this;
    //this.isUploading = true;
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function() {
        that.previewImg = reader.result;
        //console.log(that.previewImg)
      }
      reader.readAsDataURL(e.target.files[0]);
    }
    this.storeImg = e.target.files[0];
    console.log(this.storeImg)
    
  }

  postFormInput() {
    if(this.productsEditForm.invalid || this.imgUploading) {
      console.log(this.productsEditForm.value)
      //alert('error')
      return false;
    } 

    this.productsService.updateProducts( this.getId,this.productsEditForm.value).subscribe((res:any) => {
      console.log(res); 
      this.tags = undefined;
      this.productsEditForm.reset();
      this.previewImg = undefined
      this._snackBar.open(res.message, '', {
        duration: 2000,
        verticalPosition: 'top'
      });
      setTimeout(()=> {
        this.router.navigate(['/products'])
      }, 2000)
      //this.getNextData();
    },(errors) => {
      console.log(errors);
      this._snackBar.open(errors.message, '', {
        duration: 2000,
        verticalPosition: 'top'
      });
    })
    
  }

  postData() {
    this.productsEditForm.markAllAsTouched();
    console.log(this.productsEditForm.value)
    const formData = new FormData();
    formData.append('productImage', this.storeImg);
    console.log(formData)
    this.imgUploading = true
    const filename = this.storeImg.name.split('.').pop();
    if (this.productsEditForm.invalid) {
      console.log('error');
      return false;
    } 
    
    if(this.productsEditForm.value.productImagepicture !==  '') {
      if(filename !== 'png'  && filename !== 'jpeg' && filename !== 'jpg') {
        this._snackBar.open('Only jpg, png and jpeg formats are allowed',  '', {
          duration: 2000,
          verticalPosition: 'top'
        })
        console.log('Only jpg, png and jpeg formats are allowed')
        return false
      } 
      this.productsService.uploadProductImage(formData).subscribe((res:any)=> {
        console.log(res)
          this.productsEditForm.patchValue({
            'productImage': res.path
          })
          this.imgUploading = false
          this.postFormInput();
        },(errors) => {
          console.log(errors)
      })
    } else {
      this.imgUploading = false
      this.postFormInput();
    }
    
  }
  

  removeImage(e: any, data:any) {
    console.log(e, this.getId)
    const removeImageData: any = {
      id : this.getId,
      image: e
    }
    if (confirm("Are you sure to delete ?")) {
      this.http.post('http://localhost:3000/products/removeImage/', removeImageData).subscribe((res:any) => {
        console.log(res)
      },(errors:any) => {
        console.log(errors)
      })
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
