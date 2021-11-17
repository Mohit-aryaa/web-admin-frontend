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
import { MatTabChangeEvent } from '@angular/material/tabs';
import { colors } from "../colors";
@Component({
  selector: 'app-edit-bundle-product',
  templateUrl: './edit-bundle-product.component.html',
  styleUrls: ['./edit-bundle-product.component.scss']
})
export class EditBundleProductComponent implements OnInit {

   getId: any;
  getBrandsList: any[];
  editBundleProductsForm:FormGroup;
  storeImg :any = FileList;
  imgUploading: boolean = false;
  previewImg: any;
  getCategoriesList: any[];
  getSubCategoriesList: any[];
  getVendorsList: any [];
  getProductList: any[];
  getRes: any;
  getProductImages = [];
  showPreview: boolean = false;
  urls = [];
  similarProducts: any = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  blogPosts: any = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  selectedIndex: number = 0;
  color: any;
  constructor(private productsService: ProductsService,private categoriesService: CategoriesService , private subCategoriesService: SubCategoriesService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar, private router: Router, private brandsService: BrandService, private vendorsService: VendorService, private bundleproductsService: BundleProductService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.color = colors;
    this.getCategories();
    this.getVendors();
    this.getBrands();
    this.getProducts();
    this.editBundleProductsForm = this._formBuilder.group({
      productName:['', [Validators.required]],
      products: ['', [Validators.required]],
      productDescription:[''],
      productImagepicture: [''],
      productImages:[''],
      productCode:['',[Validators.required]],
      productModel: ['', [Validators.required]],
      productCategory:['', [Validators.required]],
      productSubCategory: ['', [Validators.required]],
      productBrand:['', [Validators.required]],
      vendor: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      dimensions: this._formBuilder.group({
        length:['', [Validators.required]],
        breadth:['', [Validators.required]],
        height: ['', [Validators.required]]
      }),
      weight: ['', [Validators.required]],
      tags:['', [Validators.required]],
      stock: ['', [Validators.required]],
      todaysDeal:[false, ],
      publish:[false, ],
      featured:[false, ],
      price:['',[Validators.required]],
      mrp : ['',[Validators.required]],
      purchasePrice: ['',[Validators.required]],
      shippingCost: ['',[Validators.required]],
      productTax: ['',[Validators.required]],
      productDiscount: ['',[Validators.required]],
      maxQuantity: ['',[Validators.required]],
      minimumQuantity: ['',[Validators.required]],
      customersOptions: this._formBuilder.group({
        color:['', [Validators.required]],
        choiceStyle:['', [Validators.required]]
      }),
      seoKeyWords: ['',[Validators.required]],
      metaTagKeywords: ['',[Validators.required]],
      metaTagDescription: ['',[Validators.required]],
      metaTagTitle: ['',[Validators.required]],
      imageAltTag: ['',[Validators.required]],
      seoUrl : ['',[Validators.required]],
      youtubeVideoId : ['',[Validators.required]],
      question: this._formBuilder.group({
        productQuestion: ['',[Validators.required]],
        productAnswer: ['',[Validators.required]],
      }),
      blogPost: ['',[Validators.required]],
      similarProduct: ['',[Validators.required]],
      delivery:  this._formBuilder.group({
        pincode: ['',[Validators.required]],
        description: ['',[Validators.required]],
      }),
      bulkDiscount : this._formBuilder.group({
        quantity: ['', [Validators.required]],
        discountAmount: ['',[Validators.required]],
        discountType: ['',[Validators.required]],
      }),
      cashBack : this._formBuilder.group({
        cashBackAmount: ['',[Validators.required]],
        customerGroup: ['',[Validators.required]],
      }),
      variant : ['',[Validators.required]],
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
      this.getProductImages =  res.productImages;
      this.editBundleProductsForm.patchValue({
        'products': res.products
      })
      this.getSubCategories(res.productCategory);
      delete res.productImages;
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

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedIndex = tabChangeEvent.index;
    console.log(this.selectedIndex)
  }

  nextStep() {
    const maxNumberOfTabs = 11
    if (this.selectedIndex != maxNumberOfTabs) {
      this.selectedIndex = this.selectedIndex + 1;
    }
    console.log(this.selectedIndex);
  }

  previousStep() {
    if (this.selectedIndex != 0) {
      this.selectedIndex = this.selectedIndex - 1;
    }
    console.log(this.selectedIndex);
  }
  
  onSelectdProductImage(event:any) {
    this.showPreview = true
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
    console.log(this.editBundleProductsForm.value)
    const formData = new FormData();
    var filename = [];
    console.log(this.getProductImages.length)
    if (this.showPreview == false  &&  this.getProductImages.length == 0) {
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
    this.imgUploading = true
    if (this.editBundleProductsForm.invalid) {
      this._snackBar.open('All fields are required',  '', {
        duration: 2000,
        verticalPosition: 'top'
      })
      return false;
    } 
    if(this.editBundleProductsForm.value.productImagepicture !==  '') {
      if(file.match(/png/g)  || file.match(/jpeg/g) || file.match(/jpg/g)) {
        this.productsService.uploadProductImage(formData).subscribe((res:any)=> {
          console.log(res)
            this.editBundleProductsForm.patchValue({
              'productImages': res.imagePath
            })
            this.imgUploading = false
            this.postFormInput();
            console.log(this.editBundleProductsForm.value)
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
      this.bundleproductsService.removeImage(removeImageData).subscribe((response:any) => {
        console.log(response.images)
        this.getProductImages = response.images;

      },(errors:any) => {
        console.log(errors)
      })
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
