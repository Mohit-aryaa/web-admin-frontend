import { Component, OnInit } from "@angular/core";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BrandService } from "../../services/brand.service";
import { CategoriesService } from "../../services//categories.service";
import { ProductsService } from "../../services/products.service";
import { SubCategoriesService } from "../../services//sub-Categories.service";
import { VendorService } from "../../services/vendor.service";
import { HttpClient } from "@angular/common/http";
import { colors } from "../colors";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { countries } from "../country";
import { SubChildCategoryService } from "../../services/sub-child-category.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ThemePalette } from '@angular/material/core';
@Component({
    selector: "app-add-product",
    templateUrl: "./add-product.component.html",
    styleUrls: ["./add-product.component.scss"],
})
export class AddProductComponent implements OnInit {
    productsForm: FormGroup;
    selectedProduct: any;
    storeImg: any = FileList;
    imgUploading: boolean = false;
    showPreview: boolean = false;
    showOldImages: boolean = false;
    getCategoriesList: any[];
    getSubCategoriesList: any[];
    getSubChildCategoriesList: any[];
    getBrandsList: any[];
    getVendorsList: any[];
    getCategoryId: any;
    urls = [];
    getColors: any;
    country: any;
    getProductImages: [];

    similarProducts: any = [
        "Extra cheese",
        "Mushroom",
        "Onion",
        "Pepperoni",
        "Sausage",
        "Tomato",
    ];
    blogPosts: any = [
        "Extra cheese",
        "Mushroom",
        "Onion",
        "Pepperoni",
        "Sausage",
        "Tomato",
    ];
    selectedIndex: number = 0;
    constructor(
        private productsService: ProductsService,
        private categoriesService: CategoriesService,
        private subCategoriesService: SubCategoriesService,
        private _formBuilder: FormBuilder,
        private _snackBar: MatSnackBar,
        private brandsService: BrandService,
        private vendorsService: VendorService,
        private subChildCategoriesService: SubChildCategoryService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.getColors = colors;
        this.country = countries;
        this.getCategories();
        this.getBrands();
        this.getVendors();
        this.productsForm = this._formBuilder.group({
            productName: ["", [Validators.required]],
            productDescription: ["", [Validators.required]],
            productImagepicture: [""],
            productImages: [""],
            productSku: ["", [Validators.required]],
            productModel: ["", [Validators.required]],
            productCategory: ["", [Validators.required]],
            productSubCategory: ["", [Validators.required]],
            productSubChildCategory: ["", [Validators.required]],
            productBrand: ["", [Validators.required]],
            vendor: ["", [Validators.required]],
            unit: ["", [Validators.required]],
            dimensions: this._formBuilder.group({
                length: ["", [Validators.required]],
                breadth: ["", [Validators.required]],
                height: ["", [Validators.required]],
            }),
            weight: ["", [Validators.required]],
            tags: ["", [Validators.required]],
            productCountry: ["", [Validators.required]],
            manfactureDate: ["", [Validators.required]],
            stock: ["", [Validators.required]],
            todaysDeal: [false],
            publish: ["", [Validators.required]],
            featured: [false],
            price: ["", [Validators.required]],
            mrp: ["", [Validators.required]],
            purchasePrice: ["", [Validators.required]],
            shippingCost: ["", [Validators.required]],
            productTax: ["", [Validators.required]],
            productDiscount: ["", [Validators.required]],
            maxQuantity: ["", [Validators.required]],
            minimumQuantity: ["", [Validators.required]],
            customersOptions: this._formBuilder.group({
                color: ["", [Validators.required]],
                customerChoiceInput : ["", [Validators.required]],
                choiceStyle: ["", [Validators.required]],
            }),
            seoKeyWords: ["", [Validators.required]],
            metaTagKeywords: ["", [Validators.required]],
            metaTagDescription: ["", [Validators.required]],
            metaTagTitle: ["", [Validators.required]],
            imageAltTag: ["", [Validators.required]],
            seoUrl: ["", [Validators.required]],
            youtubeVideoId: ["", [Validators.required]],
            question: this._formBuilder.group({
                productQuestion: ["", [Validators.required]],
                productAnswer: ["", [Validators.required]],
            }),
            blogPost: ["", [Validators.required]],
            similarProduct: ["", [Validators.required]],
            delivery: this._formBuilder.group({
                pincode: ["", [Validators.required]],
                description: ["", [Validators.required]],
            }),
            bulkDiscount: this._formBuilder.group({
                quantity: ["", [Validators.required]],
                discountAmount: ["", [Validators.required]],
                discountType: ["", [Validators.required]],
            }),
            cashBack: this._formBuilder.group({
                cashBackAmount: ["", [Validators.required]],
                customerGroup: ["", [Validators.required]],
            }),
            variant: ["", [Validators.required]],
        });

        console.log('color', this.productsForm.value.customersOptions.color)

        this.selectedProduct = this.route.snapshot.paramMap.get("id");
        if (this.selectedProduct !== null) {
            this.getData(this.selectedProduct);
        }
    }

    removeImage(e: any) {
        console.log(e, this.selectedProduct);
        const removeImageData: any = {
            id: this.selectedProduct,
            image: e,
        };
        if (confirm("Are you sure to delete ?")) {
            this.productsService.removeImage(removeImageData).subscribe(
                (response: any) => {
                    console.log(response.images);
                    this.getProductImages = response.images;
                },
                (errors: any) => {
                    console.log(errors);
                }
            );
        }
    }

    selectable = true;
    removable = true;
    addOnBlur = true;
    readonly separatorKeysCodes = [ENTER, COMMA] as const;
    tags: any = [];

    add(event: MatChipInputEvent): void {
        const value = (event.value || "").trim();
        // Add our fruit
        if (value) {
            this.tags.push({ name: value });
            this.productsForm.patchValue({
                tags: this.tags,
            });
        }
        // Clear the input value
        event.chipInput!.clear();
    }

    remove(tags: any): void {
        const index = this.tags.indexOf(tags);
        if (index >= 0) {
            this.tags.splice(index, 1);
            this.productsForm.patchValue({
                tags: this.tags,
            });
        }
    }

    getCategories() {
        this.categoriesService.listCategories().subscribe(
            (res: any) => {
                this.getCategoriesList = res.Categories;
                //console.log('subcat',this.getCategoriesList)
            },
            (errors: any) => {
                console.log(errors);
            }
        );
    }

    getCategoryValue(e: any) {
        this.getSubCategories(e.target.value);
    }

    getSubCategories(data: any) {
        this.subCategoriesService.getDataByCategoryId(data).subscribe(
            (res: any) => {
                this.getSubCategoriesList = res.SubCategory;
            },
            (errors: any) => {
                console.log(errors);
            }
        );
    }

    getSubCategoryValue(e: any) {
        this.getSubChildCategories(e.target.value);
    }

    getSubChildCategories(data: any) {
        this.subChildCategoriesService.getDataBySubCategoryId(data).subscribe(
            (res: any) => {
                this.getSubChildCategoriesList = res.SubChildCategory;
            },
            (errors: any) => {
                console.log(errors);
            }
        );
    }

    getBrands() {
        this.brandsService.listBrands().subscribe(
            (res: any) => {
                this.getBrandsList = res.Brands;
            },
            (errors: any) => {
                console.log(errors);
            }
        );
    }

    getVendors() {
        this.vendorsService.listVendors().subscribe(
            (res: any) => {
                this.getVendorsList = res.Vendors;
            },
            (errors: any) => {
                console.log(errors);
            }
        );
    }

    tabChanged(tabChangeEvent: MatTabChangeEvent): void {
        this.selectedIndex = tabChangeEvent.index;
    }

    nextStep() {
        const maxNumberOfTabs = 11;
        if (this.selectedIndex != maxNumberOfTabs) {
            this.selectedIndex = this.selectedIndex + 1;
        }
        //console.log(this.selectedIndex);
    }

    previousStep() {
        if (this.selectedIndex != 0) {
            this.selectedIndex = this.selectedIndex - 1;
        }
        //console.log(this.selectedIndex);
    }

    getData(data: any) {
        this.showOldImages = true;
        this.productsService.showProduct(data).subscribe((res: any) => {
            console.log(res);
            this.tags = res.tags;
            this.getProductImages = res.productImages;
            this.getSubCategories(res.productCategory);
            this.getSubChildCategories(res.productSubCategory);
            delete res.productImages;
            this.productsForm.patchValue(res);
        });
    }

    onSelectdProductImage(event: any) {
        this.showPreview = true;
        this.urls = [];
        let files = event.target.files;
        if (files) {
            for (let file of files) {
                let reader = new FileReader();
                reader.onload = (e: any) => {
                    this.urls.push(e.target.result);
                };
                reader.readAsDataURL(file);
            }
        }
        this.storeImg = event.target.files;
    }

    postFormInput() {
        console.log(this.productsForm.value);
        if (this.productsForm.invalid || this.imgUploading) {
            console.log(this.productsForm.value);
            return false;
        }

        if (this.selectedProduct) {
            if (this.getProductImages.length == 0 && this.urls.length == 0) {
                this._snackBar.open("At least one image is required", "", {
                    duration: 2000,
                    verticalPosition: "top",
                });
                return false;
            }
            if (this.productsForm.value.productImagepicture == "") {
                this.productsForm.patchValue({
                    productImages: undefined,
                });
            }
            this.productsService
                .updateProducts(this.selectedProduct, this.productsForm.value)
                .subscribe(
                    (res: any) => {
                        this.productsForm.reset();
                        this.tags = [];
                        this.urls = undefined;
                        this.showPreview = false;
                        this.storeImg = undefined;
                        this._snackBar.open(res.message, "", {
                            duration: 2000,
                            verticalPosition: "top",
                        });
                        setTimeout(() => {
                            this.router.navigate(["/products"]);
                        }, 2000);
                    },
                    (errors) => {
                        console.log(errors);
                        this._snackBar.open(errors.error.message, "", {
                            duration: 2000,
                            verticalPosition: "top",
                        });
                    }
                );
        } else {
            if (this.showPreview == false) {
                this._snackBar.open("Banner is required", "", {
                    duration: 2000,
                    verticalPosition: "top",
                });
                return false;
            }
            this.productsService.addProducts(this.productsForm.value).subscribe(
                (res: any) => {
                    this.productsForm.reset();
                    this.tags = [];
                    this.urls = undefined;
                    this.showPreview = false;
                    this.storeImg = undefined;
                    this._snackBar.open(res.message, "", {
                        duration: 2000,
                        verticalPosition: "top",
                    });
                },
                (errors) => {
                    console.log(errors);
                    this._snackBar.open(errors.error.message, "", {
                        duration: 2000,
                        verticalPosition: "top",
                    });
                }
            );
        }
    }

    postData() {
        this.productsForm.markAllAsTouched();
        const formData = new FormData();
        var filename = [];
        if (this.productsForm.invalid) {
            this._snackBar.open("All field are required", "", {
                duration: 2000,
                verticalPosition: "top",
            });
            return false;
        }
        if (this.storeImg.length > 0) {
            for (let i = 0; i < this.storeImg.length; i++) {
                formData.append("images[]", this.storeImg[i]);
                filename.push(this.storeImg[i].name.split(".").pop());
            }
            const file = filename.toString();
            this.imgUploading = true;
            if (file.match(/png/g) || file.match(/jpeg/g) || file.match(/jpg/g)) {
                this.productsService.uploadProductImage(formData).subscribe(
                    (res: any) => {
                        this.productsForm.patchValue({
                            productImages: res.imagePath,
                        });
                        this.imgUploading = false;
                        this.postFormInput();
                    },
                    (errors) => {
                        console.log(errors);
                    }
                );
            } else {
                this._snackBar.open("Only jpg, png and jpeg formats are allowed", "", {
                    duration: 2000,
                    verticalPosition: "top",
                });
                return false;
            }
        } else {
            this.imgUploading = false;
            this.postFormInput();
        }
    }

    numberOnly(event): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    hasFocus = false;

    quillConfig = {
        //toolbar: '.toolbar',
        toolbar: {
            container: [
                ["bold", "italic", "underline", "strike"], // toggled buttons
                ["blockquote", "code-block"],

                [{ header: 1 }, { header: 2 }], // custom button values
                [{ list: "ordered" }, { list: "bullet" }],
                [{ script: "sub" }, { script: "super" }], // superscript/subscript
                [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
                [{ direction: "rtl" }], // text direction

                [{ size: ["small", false, "large", "huge"] }], // custom dropdown
                [{ header: [1, 2, 3, 4, 5, 6, false] }],

                [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                [{ font: [] }],
                [{ align: [] }],

                ["clean"], // remove formatting button

                ["link", "image", "video"], // link and image, video
            ],
        },
    };

    onSelectionChanged = (event: any) => {
        //console.log(this.productsForm.value.productDescription)
        if (event.oldRange == null) {
            this.onFocus();
        }
        if (event.range == null) {
            this.onBlur();
        }
    };

    onContentChanged = (event) => {
        //console.log(event.html);
    };

    onFocus = () => {
        console.log("On Focus");
    };
    onBlur = () => {
        console.log("Blurred");
    };
}
