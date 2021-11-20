import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { lowerCase } from "lodash";
import { CategoriesService } from "app/modules/services/categories.service";
import { SubCategoriesService } from "app/modules/services/sub-categories.service";

@Component({
    selector: "app-sub-Categories",
    templateUrl: "./sub-Categories.component.html",
    styleUrls: ["./sub-Categories.component.scss"],
})
export class SubCategoriesComponent implements OnInit {
    @ViewChild("content") content: any;
    @ViewChild(MatSort) sort!: MatSort;
    dataSource = new MatTableDataSource<any>();
    @ViewChild("Paginator") Paginator!: MatPaginator;
    subCategoriesForm: FormGroup;
    seletedSubCategory: any;
    previewImg: any;
    loading: boolean = false;
    subCategories: any[];
    setBulkDeleteItems = [];
    getCategoriesList: any[];
    tablePaging = {
        offset: 0,
        limit: 20,
        previousSize: 0,
    };
    userDataPromise: any;
    showPreview: boolean = false;
    showImageBox: boolean = false;
    storeImg: any = File;
    url: any;
    ImageBox: any;
    imgUploading: boolean = false;
    constructor(
        private modalService: NgbModal,
        private _formBuilder: FormBuilder,
        private categoriesService: CategoriesService,
        private subCategoriesService: SubCategoriesService,
        private _snackBar: MatSnackBar
    ) { }

    displayedColumnsOne: string[] = [
        "check",
        "banner",
        "name",
        "description",
        "category",
        "action",
    ];
    ngOnInit(): void {
        this.subCategoriesForm = this._formBuilder.group({
            subCategoryName: ["", [Validators.required]],
            category: ["", [Validators.required]],
            subCategoryBannerPicture: [""],
            subCategoryBanner: [""],
            subCategoryDescription: ["", [Validators.required]],
            metaTitle: ["", [Validators.required]],
            metaDescription: ["", [Validators.required]],
            seoUrl: ["", [Validators.required]],
        });
        this.getCategories();
        this.getData();
    }

    ngAfterViewInit() {
        this.getData();
    }

    getCategories() {
        this.categoriesService.listCategories().subscribe(
            (res: any) => {
                this.getCategoriesList = res.Categories;
            },
            (errors: any) => {
                console.log(errors);
            }
        );
    }

    getData() {
        this.subCategoriesService
            .getSubCategories({ params: this.tablePaging })
            .subscribe((res: any) => {
                this.loading = false;
                this.subCategories = res.SubCategories;
                this.subCategories.length = res.total;
                this.dataSource = new MatTableDataSource<any>(this.subCategories);
                this.dataSource.paginator = this.Paginator;
            });
    }

    getNextData() {
        this.loading = true;
        if (this.userDataPromise) {
            this.userDataPromise.unsubscribe();
        }
        this.userDataPromise = this.subCategoriesService
            .getSubCategories({ params: this.tablePaging })
            .subscribe((response: any) => {
                this.loading = false;
                this.subCategories.length = this.tablePaging["previousSize"];
                this.subCategories.push(...response.SubCategories);
                this.subCategories.length = response.total;
                this.dataSource = new MatTableDataSource<any>(this.subCategories);
                this.dataSource._updateChangeSubscription();
                this.dataSource.paginator = this.Paginator;
            });
    }

    pageChanged(event: any) {
        this.tablePaging["limit"] = event.pageSize;
        this.tablePaging["offset"] = event.pageIndex.toString();
        let pageIndex = event.pageIndex;
        let pageSize = event.pageSize;
        let previousIndex = event.previousPageIndex;
        let previousSize = pageSize * pageIndex;
        this.tablePaging["previousSize"] = previousSize;
        this.getNextData();
        //this.dataTableSize = event.pageSize
    }

    applyCategoryFilter(filterValue: string) {
        var filterData = filterValue.trim().toLowerCase();
        //this.getNextData();
        this.userDataPromise = this.subCategoriesService
            .filterSubCategories(filterData)
            .subscribe((res: any) => {
                this.loading = false;
                this.subCategories = res.SubCategories;
                this.subCategories.length = res.total;
                this.dataSource = new MatTableDataSource<any>(this.subCategories);
                this.dataSource.paginator = this.Paginator;
            });
    }

    openModal(id = null) {
        this.seletedSubCategory = id;
        //console.log(data);
        this.modalService
            .open(this.content, { size: "lg", ariaLabelledBy: "modal-basic-title" })
            .result.then(
                (result) => { },
                (reason) => {
                    this.subCategoriesForm.reset();
                    this.url = "";
                    this.showPreview = false;
                    this.showImageBox = false;
                }
            );
    }

    openUpdateModal(data: any) {
        console.log(data);
        this.openModal(data._id);
        this.subCategoriesForm.patchValue(data);
        this.subCategoriesForm.patchValue({
            category: data.category._id,
        });
        this.showImageBox = true;
        this.ImageBox = data.subCategoryBanner;
    }

    onSelectedImage(e: any) {
        this.showPreview = true;
        const that = this;
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function () {
                that.url = reader.result;
            };
            reader.readAsDataURL(e.target.files[0]);
        }
        this.storeImg = e.target.files[0];
    }

    postFormInput() {
        this.subCategoriesForm.markAllAsTouched();
        if (this.subCategoriesForm.invalid) {
            console.log("this.subCategoriesForm", this.subCategoriesForm.value);
            return false;
        }
        if (this.seletedSubCategory) {
            if (this.showPreview == false) {
                this.subCategoriesForm.patchValue({
                    subCategoryBanner: undefined,
                });
            }
            this.subCategoriesService
                .updateSubCategories(
                    this.seletedSubCategory,
                    this.subCategoriesForm.value
                )
                .subscribe(
                    (results: any) => {
                        this.modalService.dismissAll();
                        this.subCategoriesForm.reset();
                        console.log(this.subCategories.length);
                        this.getNextData();
                    },
                    (errors) => {
                        console.log(errors);
                    }
                );
        } else {
            if (this.showPreview == false) {
                this._snackBar.open("Banner is required", "", {
                    duration: 2000,
                    verticalPosition: "top",
                });
                return false;
            } else {
                this.subCategoriesService
                    .addSubCategories(this.subCategoriesForm.value)
                    .subscribe(
                        (res: any) => {
                            this.modalService.dismissAll();
                            this.subCategoriesForm.reset();
                            this.getNextData();
                        },
                        (errors) => {
                            console.log(errors);
                        }
                    );
            }
        }
    }

    postData() {
        this.subCategoriesForm.markAllAsTouched();
        if (this.subCategoriesForm.invalid) {
            this._snackBar.open("All fields are required", "", {
                duration: 2000,
                verticalPosition: "top",
            });
            return false;
        }

        if (this.showPreview == true) {
            const formData = new FormData();
            formData.append("banner", this.storeImg);
            const filename = this.storeImg.name.split(".").pop();
            const file = filename.toLowerCase();
            console.log(formData);
            this.imgUploading = true;
            if (file.match(/png/g) || file.match(/jpeg/g) || file.match(/jpg/g)) {
                this.subCategoriesService.uploadSubCategoryBanner(formData).subscribe(
                    (res: any) => {
                        this.subCategoriesForm.patchValue({
                            subCategoryBanner: res.imagePath,
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

    deleteCategory(deleteCategory: any) {
        if (confirm("Are you sure to delete ?")) {
            this.subCategoriesService
                .deleteSubCategories(deleteCategory)
                .subscribe((res: any) => {
                    this.getNextData();
                });
        }
    }

    checkAllDeleteItems(e: any) {
        this.setBulkDeleteItems = [];
        var items: any = document.getElementsByClassName("deleteChecks");
        if (e.target.checked) {
            for (let i = 0; i < items.length; i++) {
                let element = items[i];
                element.checked = true;
                let getId = element.getAttribute("id");
                this.setBulkDeleteItems.push(getId);
            }
        } else {
            for (let i = 0; i < items.length; i++) {
                let element = items[i];
                element.checked = false;
                this.setBulkDeleteItems = [];
            }
        }
    }

    getDeleteItems(event: any, index: any) {
        let checkElement = <HTMLInputElement>document.getElementById("deleteAll");
        checkElement.checked = false;
        var element = <HTMLInputElement>document.getElementById(event._id);
        var isChecked = element.checked;
        if (isChecked) {
            this.setBulkDeleteItems.push(event._id);
        } else {
            this.setBulkDeleteItems.splice(index, 1);
        }
    }

    BulkDelete() {
        if (
            typeof this.setBulkDeleteItems !== undefined &&
            this.setBulkDeleteItems.length > 0
        ) {
            if (confirm("Are you sure to delete ?")) {
                this.subCategoriesService.bulkDelete(this.setBulkDeleteItems).subscribe(
                    (res: any) => {
                        let element = <HTMLInputElement>(
                            document.getElementById("deleteAll")
                        );
                        element.checked = false;
                        this._snackBar.open(res.message, "", {
                            duration: 2000,
                            verticalPosition: "top",
                        });
                        this.getNextData();
                    },
                    (errors: any) => {
                        console.log(errors);
                    }
                );
            }
        } else {
            this._snackBar.open("No product selected", "", {
                duration: 2000,
                verticalPosition: "top",
            });
        }
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
        console.log(this.subCategoriesForm.value.categoryDescription);
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
