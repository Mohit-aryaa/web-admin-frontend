import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrandService } from '../brand.service';
import { CategoriesService } from '../categories.service';
import { ProductsService } from '../products.service';
import { SubCategoriesService } from '../sub-Categories.service';
import { VendorService } from '../vendor.service';
import { BundleProductService } from '../bundle-product.service';
@Component({
  selector: 'app-add-bundle-product',
  templateUrl: './add-bundle-product.component.html',
  styleUrls: ['./add-bundle-product.component.scss']
})
export class AddBundleProductComponent implements OnInit {

  addBundleProductsForm:FormGroup;
  selectedProduct: any;
  storeImg :any = File;
  imgUploading: boolean = false;
  previewImg: any;
  getProductList: any[];
  getCategoriesList: any[];
  getSubCategoriesList: any[];
  getBrandsList : any [];
  getVendorsList : any [];
  showPreview:boolean = false;
  urls = [];
  constructor(private productsService: ProductsService,private categoriesService: CategoriesService , private subCategoriesService: SubCategoriesService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar,private brandsService: BrandService,private vendorsService: VendorService, private bundleProductsService: BundleProductService) { }

  

  ngOnInit(): void {
    this.getCategories();
    this.getBrands();
    this.getVendors();
    this.getProducts();
    this.addBundleProductsForm = this._formBuilder.group({
      productName:['', [Validators.required]],
      products: ['', [Validators.required]],
      productDescription:['', [Validators.required]],
      productImagepicture: ['', [Validators.required]],
      productImages:[''],
      productCode:['',[Validators.required]],
      productModel: ['', [Validators.required]],
      productCategory:['', [Validators.required]],
      productSubCategory: ['',[Validators.required]],
      productBrand:['', [Validators.required]],
      vendor: ['', [Validators.required]],
      tags:['', [Validators.required]],
      stock: ['', [Validators.required]],
      todaysDeal:[false, ],
      publish:[false, ],
      featured:[false, ],
      price:['',[Validators.required]]
    })
  }

  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const
  tags: any = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our fruit
    if (value) {
      this.tags.push({name: value});
      this.addBundleProductsForm.patchValue({
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
      this.addBundleProductsForm.patchValue({
        'tags': this.tags
      })
    }
  }

  getCategories() {
    this.categoriesService.listCategories().subscribe((res: any) => {
      this.getCategoriesList = res.Categories
      //console.log('subcat',this.getCategoriesList)
    }, (errors:any) => {
      console.log(errors)
    })
  }

  getCategoryValue(e:any) {
    console.log(e.target.value)
    this.getSubCategories(e.target.value)
  }

  getSubCategories(data: any) {
    this.subCategoriesService.getDataByCategoryId(data).subscribe((res: any) => {
      this.getSubCategoriesList = res.SubCategory
      console.log('getSubCategoriesList',this.getSubCategoriesList)
    }, (errors:any) => {
      console.log(errors)
    })
  }

  getBrands() {
    this.brandsService.listBrands().subscribe((res: any) => {
      this.getBrandsList = res.Brands
      //console.log('subcat',this.getSubCategoriesList)
    }, (errors:any) => {
      console.log(errors)
    })
  }

  getProducts() {
    this.productsService.listProduct().subscribe((res:any) => {
      console.log(res);
      this.getProductList = res.Products;
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

  uploadProductImage(event:any) {
    this.showPreview = true
    this.urls = [];
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
    }    
    
    this.storeImg = event.target.files; 
  }

  postFormInput() {
    console.log(this.addBundleProductsForm.value.products)
    if(this.addBundleProductsForm.invalid || this.imgUploading) {
      console.log(this.addBundleProductsForm.value)
      //alert('error')
      return false;
    } 

    this.bundleProductsService.addBundleProducts(this.addBundleProductsForm.value).subscribe((res:any) => {
      console.log(res);
        
      this.addBundleProductsForm.reset();
      this.tags = [];
      this.urls = [];
      this.showPreview = false;

      this._snackBar.open(res.message, '', {
        duration: 2000,
        verticalPosition: 'top'
      });
      //this.getNextData();
    },(errors) => {
      console.log(errors)
      this._snackBar.open(errors.error.message, '', {
        duration: 2000,
        verticalPosition: 'top'
      });
    })
    
  }

  postData() {
    this.addBundleProductsForm.markAllAsTouched();
    console.log(this.storeImg)
    const formData = new FormData();
    var filename = [];
    if (this.showPreview == false ) {
      this._snackBar.open('At least one image is required',  '', {
        duration: 2000,
        verticalPosition: 'top'
      })
      return false
    } 
    for (let i = 0; i < this.storeImg.length; i++) { 
      formData.append('images[]', this.storeImg[i]) 
      filename.push(this.storeImg[i].name.split('.').pop()) 
    }
    const file = filename.toString();
    console.log(formData)
    this.imgUploading = true
    if (this.addBundleProductsForm.invalid) {
      this._snackBar.open('All fields are required',  '', {
        duration: 2000,
        verticalPosition: 'top'
      })
      return false;
    } 
    if(file.match(/png/g)  || file.match(/jpeg/g) || file.match(/jpg/g)) {
      this.productsService.uploadProductImage(formData).subscribe((res:any)=> {
        console.log(res.imagePath)
          this.addBundleProductsForm.patchValue({
            'productImages': res.imagePath
          })
          this.imgUploading = false
          this.postFormInput();
          console.log(this.addBundleProductsForm.value)
        },(errors) => {
          console.log(errors)
      })
    } else {
      this._snackBar.open('Only jpg, png and jpeg formats are allowed',  '', {
        duration: 2000,
        verticalPosition: 'top'
      })
      console.log(file)
      return false
    } 
  }

  applyProductFilter(filterValue: string) {
    var filterData = filterValue.trim().toLowerCase();
    //this.getNextData();
    this.productsService.filterProduct(filterData).subscribe((res: any) => {
      //this.loading = false;
      this.getProductList = res.Products;
      console.log('this.Products', this.getProductList)
    })

  }
  

  

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
