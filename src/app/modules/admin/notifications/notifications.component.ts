/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'app/modules/services/notifications.service';
@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
    @ViewChild('content') content: any;
    @ViewChild(MatSort) sort!: MatSort;
    dataSource = new MatTableDataSource<any>();
    @ViewChild('Paginator') Paginator!: MatPaginator;
    notificationForm: FormGroup;
    storeImg: any = File;
    showPreview: boolean = false;
    showImageBox: boolean = false;
    selectedCategory: any;
    previewImg: any;
    loading: boolean = false;
    categories: any[];
    tablePaging = {
        offset: 0,
        limit: 20,
        previousSize: 0,
    };
    userDataPromise: any;
    setBulkDeleteItems = [];
    setCheckInputs: any[];
    url: any;
    imgUploading: boolean = false;
    ImageBox: any;
    constructor(
        private modalService: NgbModal,
        private _formBuilder: FormBuilder,
        private _snackBar: MatSnackBar,
        private  _notificationsService: NotificationsService
    ) { }

    displayedColumnsOne: string[] = [
        'check',
        'banner',
        'name',
        'action',
    ];
    ngOnInit(): void {
        this.notificationForm = this._formBuilder.group({
            notificationName: ['', [Validators.required]],
            notificationBanner: [''],
            notificationDescription: ['', [Validators.required]],
        });
    }

    ngAfterViewInit() {
    }

    getNextData() {
        this.loading = true;
        if (this.userDataPromise) {
            this.userDataPromise.unsubscribe();
        }
        this.userDataPromise = this._notificationsService
            .getCategories({ params: this.tablePaging })
            .subscribe((response: any) => {
                this.loading = false;
                this.categories.length = this.tablePaging['previousSize'];
                this.categories.push(...response.Categories);
                this.categories.length = response.total;
                this.dataSource = new MatTableDataSource<any>(this.categories);
                this.dataSource._updateChangeSubscription();
                this.dataSource.paginator = this.Paginator;
            });
    }

    pageChanged(event: any) {
        this.tablePaging['limit'] = event.pageSize;
        this.tablePaging['offset'] = event.pageIndex.toString();
        const pageIndex = event.pageIndex;
        const pageSize = event.pageSize;
        const previousIndex = event.previousPageIndex;
        const previousSize = pageSize * pageIndex;
        this.tablePaging['previousSize'] = previousSize;
        this.getNextData();
    }

    applyCategoryFilter(filterValue: string) {
        const filterData = filterValue.trim().toLowerCase();
        this.userDataPromise = this._notificationsService
            .filterCategories(filterData)
            .subscribe((res: any) => {
                this.loading = false;
                this.categories = res.Categories;
                this.categories.length = res.total;
                this.dataSource = new MatTableDataSource<any>(this.categories);
                this.dataSource.paginator = this.Paginator;
            });
    }

    openModal(id = null) {
        this.selectedCategory = id;
        this.modalService
            .open(this.content, { size: 'lg', ariaLabelledBy: 'modal-basic-title' })
            .result.then(
                (result) => { },
                (reason) => {
                    this.notificationForm.reset();
                    this.url = '';
                    this.showPreview = false;
                    this.showImageBox = false;
                }
            );
    }

    openUpdateModal(data: any) {
        this.openModal(data._id);
        this.notificationForm.patchValue(data);
        this.showImageBox = true;
        this.ImageBox = data.categoryBanner;
    }

    onSelectedImage(e: any) {
        this.showPreview = true;
        const that = this;
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function() {
                that.url = reader.result;
            };
            reader.readAsDataURL(e.target.files[0]);
        }
        this.storeImg = e.target.files[0];
    }

    postFormInput() {
        this.notificationForm.markAllAsTouched();
        if (this.notificationForm.invalid) {
            console.log('this.categoriesForm', this.notificationForm.value);
            return false;
        }
        if (this.selectedCategory) {
            if (this.showPreview === false) {
                this.notificationForm.patchValue({
                    categoryBanner: undefined,
                });
            }
            this._notificationsService
                .updateCategories(this.selectedCategory, this.notificationForm.value)
                .subscribe(
                    (results: any) => {
                        this.modalService.dismissAll();
                        this.notificationForm.reset();
                        this.showImageBox = false;
                        this.getNextData();
                    },
                    (errors) => {
                        console.log(errors);
                    }
                );
        } else {
            if (this.showPreview === false) {
                this._snackBar.open('Banner is required', '', {
                    duration: 2000,
                    verticalPosition: 'top',
                });
                return false;
            } else {
                this._notificationsService.addCategories(this.notificationForm.value).subscribe(
                    (res: any) => {
                        this.modalService.dismissAll();
                        this.notificationForm.reset();
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
        this.notificationForm.markAllAsTouched();
        if (this.notificationForm.invalid) {
            this._snackBar.open('All fields are required', '', {
                duration: 2000,
                verticalPosition: 'top',
            });
            return false;
        }
        if (this.showPreview === true) {
            const formData = new FormData();
            formData.append('banner', this.storeImg);
            const filename = this.storeImg.name.split('.').pop();
            const file = filename.toLowerCase();
            this.imgUploading = true;
            if (file.match(/png/g) || file.match(/jpeg/g) || file.match(/jpg/g)) {
                this._notificationsService.uploadCategoryBanner(formData).subscribe(
                    (res: any) => {
                        this.notificationForm.patchValue({
                            categoryBanner: res.imagePath,
                        });
                        this.imgUploading = false;
                        this.postFormInput();
                    },
                    (errors) => {
                        console.log(errors);
                    }
                );
            } else {
                this._snackBar.open('Only jpg, png and jpeg formats are allowed', '', {
                    duration: 2000,
                    verticalPosition: 'top',
                });
                return false;
            }
        } else {
            this.imgUploading = false;
            this.postFormInput();
        }
    }

    deleteCategory(deleteCategory: any) {
        if (confirm('Are you sure to delete ?')) {
            this._notificationsService
                .deleteCategories(deleteCategory)
                .subscribe((res: any) => {
                    this.getNextData();
                });
        }
    }

    checkAllDeleteItems(e: any) {
        const items: any = document.getElementsByClassName('deleteChecks');
        if (e.target.checked) {
            for (let i = 0; i < items.length; i++) {
                const element = items[i];
                element.checked = true;
                const getId = element.getAttribute('id');
                this.setBulkDeleteItems.push(getId);
            }
        } else {
            for (let i = 0; i < items.length; i++) {
                const element = items[i];
                element.checked = false;
                this.setBulkDeleteItems = [];
            }
        }
    }

    getDeleteItems(event: any, index: any) {
        const checkElement = <HTMLInputElement>document.getElementById('deleteAll');
        checkElement.checked = false;
        const element = <HTMLInputElement>document.getElementById(event._id);
        const isChecked = element.checked;
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
            if (confirm('Are you sure to delete ?')) {
                this._notificationsService.bulkDelete(this.setBulkDeleteItems).subscribe(
                    (res: any) => {
                        const element = <HTMLInputElement>(
                            document.getElementById('deleteAll')
                        );
                        element.checked = false;
                        this._snackBar.open(res.message, '', {
                            duration: 2000,
                            verticalPosition: 'top',
                        });
                        this.getNextData();
                    },
                    (errors: any) => {
                        console.log(errors);
                    }
                );
            }
        } else {
            this._snackBar.open('No product selected', '', {
                duration: 2000,
                verticalPosition: 'top',
            });
        }
    }

    hasFocus = false;

    quillConfig = {
        //toolbar: '.toolbar',
        toolbar: {
            container: [
                ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                ['blockquote', 'code-block'],

                [{ header: 1 }, { header: 2 }], // custom button values
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
                [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
                [{ direction: 'rtl' }], // text direction

                [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
                [{ header: [1, 2, 3, 4, 5, 6, false] }],

                [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                [{ font: [] }],
                [{ align: [] }],

                ['clean'], // remove formatting button

                ['link', 'image', 'video'], // link and image, video
            ],
        },
    };

    onSelectionChanged = (event: any) => {
        console.log(this.notificationForm.value.categoryDescription);
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
        console.log('On Focus');
    };
    onBlur = () => {
        console.log('Blurred');
    };
}
