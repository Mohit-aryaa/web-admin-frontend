import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '../brand.service';
import { CategoriesService } from '../categories.service';
import { ProductsService } from '../products.service';
import { SubCategoriesService } from '../sub-Categories.service';
import { VendorService } from '../vendor.service';
import { BundleProductService } from '../bundle-product.service';

@Component({
  selector: 'app-edit-bundle-product',
  templateUrl: './edit-bundle-product.component.html',
  styleUrls: ['./edit-bundle-product.component.scss']
})
export class EditBundleProductComponent implements OnInit {

   getId: any;
  getBrandsList: any[];
  editBundleProductsForm:FormGroup;
  storeImg :any = File;
  imgUploading: boolean = false;
  previewImg: any;
  getCategoriesList: any[];
  getSubCategoriesList: any[];
  getVendorsList: any [];
  getProductList: any[];
  getRes: any;
  constructor(private productsService: ProductsService,private categoriesService: CategoriesService , private subCategoriesService: SubCategoriesService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar, private router: Router, private brandsService: BrandService, private vendorsService: VendorService, private bundleproductsService: BundleProductService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCategories();
    this.getVendors();
    this.getBrands();
    this.getProducts();
    this.editBundleProductsForm = this._formBuilder.group({
      productName:['', [Validators.required]],
      products: ['', [Validators.required]],
      productDescription:[''],
      productImagepicture: [''],
      productImage:[''],
      productCode:['',[Validators.required]],
      productModel: ['', [Validators.required]],
      productCategory:['', [Validators.required]],
      productSubCategory: ['', [Validators.required]],
      productBrand:['', [Validators.required]],
      vendor: ['', [Validators.required]],
      tags:['', [Validators.required]],
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
    this.editBundleProductsForm.patchValue({
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

  getProducts() {
    this.productsService.listProduct().subscribe((res:any) => {
      console.log(res);
      this.getProductList = res.Products;
    }, (errors:any) => {
      console.log(errors)
    })
  }

  

  getData(data:any) {
    this.bundleproductsService.showProduct(data).subscribe((res:any) =>{
      console.log(res);
      this.getRes = res;
      console.log('getdata',this.getRes.tags)
      this.tags = res.tags;
      this.previewImg = 'http://localhost:3000/'+ res.productImage;
      this.editBundleProductsForm.patchValue({
        'products': res.products
      })
      this.getSubCategories(res.productCategory);
      this.editBundleProductsForm.patchValue(res)
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
      this.editBundleProductsForm.patchValue({
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
      this.editBundleProductsForm.patchValue({
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
    if(this.editBundleProductsForm.invalid || this.imgUploading) {
      console.log(this.editBundleProductsForm.value)
      //alert('error')
      return false;
    } 

    this.bundleproductsService.updateBundleProducts( this.getId,this.editBundleProductsForm.value).subscribe((res:any) => {
      console.log(res); 
      this.tags = undefined;
      this.editBundleProductsForm.reset();
      this.previewImg = undefined
      this._snackBar.open(res.message, '', {
        duration: 2000,
        verticalPosition: 'top'
      });
      setTimeout(()=> {
        this.router.navigate(['/bundle-products'])
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
    this.editBundleProductsForm.markAllAsTouched();
    console.log(this.storeImg)
    const formData = new FormData();
    formData.append('productImage', this.storeImg);
    console.log(formData)
    this.imgUploading = true
    const filename = this.storeImg.name.split('.').pop();
    if (this.editBundleProductsForm.invalid) {
      console.log('error');
      return false;
    } 
    
    if(this.editBundleProductsForm.value.productImagepicture !==  '') {
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
          this.editBundleProductsForm.patchValue({
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
