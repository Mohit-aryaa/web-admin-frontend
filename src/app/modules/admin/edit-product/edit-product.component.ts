import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BrandService } from '../brand.service';
import { CategoriesService } from '../categories.service';
import { ProductsService } from '../products.service';
import { SubCategoriesService } from '../sub-Categories.service';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  productId: any;
  getBrandsList: any[];
  productsEditForm:FormGroup;
  storeImg: File;
  imgUploading: boolean = false;
  previewImg: any;
  getCategoriesList: any[];
  getSubCategoriesList: any[];
  getVendorsList: any [];
  getRes: any;
  constructor(private productsService: ProductsService,private categoriesService: CategoriesService , private subCategoriesService: SubCategoriesService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar, private router: Router, private brandsService: BrandService, private vendorsService: VendorService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getSubCategories();
    this.getVendors();
    this.getBrands();
    this.productsEditForm = this._formBuilder.group({
      productName:['', [Validators.required]],
      productDescription:['', [Validators.required]],
      productImagepicture: ['', [Validators.required]],
      productImage:['',[Validators.required]],
      productCode:['',[Validators.required]],
      productModel: ['', [Validators.required]],
      productCategory:['', [Validators.required]],
      productBrand:['', [Validators.required]],
      vendor: ['', [Validators.required]],
      tags:['', [Validators.required]],
      productCountry:['', [Validators.required]],
      manfactureDate:['', [Validators.required]],
      todaysDeal:[false, ],
      publish:[false, ],
      featured:[false, ],
      price:['',[Validators.required]]
    })
    
    var url = new URL('localhost:4200/'+this.router.url);
    this.productId = url.searchParams.get('id')
    console.log(this.productId)
    console.log(this.router.url);
    this.getData(this.productId)
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

  getVendors() {
    this.vendorsService.listVendors().subscribe((res:any) => {
      this.getVendorsList = res.Vendors
    }, (errors:any) => {
      console.log(errors)
    })
  }

  getSubCategories() {
    this.subCategoriesService.listSubCategories().subscribe((res: any) => {
      this.getSubCategoriesList = res.SubCategories
      console.log('subcat',this.getSubCategoriesList)
    }, (errors:any) => {
      console.log(errors)
    })
  }

  getData(data:any) {
    this.productsService.showProduct(data).subscribe((res:any) =>{
      console.log(res);
      this.getRes = res;
      console.log(this.getRes.tags)
      this.tags = res.tags
      delete res.productImage;

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

    this.productsService.updateProducts( this.productId,this.productsEditForm.value).subscribe((res:any) => {
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
    
    if (this.productsEditForm.value.productName !== '' && this.productsEditForm.value.productCode !== '' && this.productsEditForm.value.productCategory !== ''  && this.productsEditForm.value.productSubCategory !== ''  && this.productsEditForm.value.productImagepicture !== '' && this.productsEditForm.value.price !== '' ) {
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
    } else{
      console.log('error')
    } 
    
  }
  

  uppercaseOnly(e: any) {
    var getResult = e.key
    console.log(getResult.toUpperCase( ))
  } 

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
