import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CouponComponent } from './coupon.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from 'app/shared/shared.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { QuillModule } from 'ngx-quill';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@NgModule({
  declarations: [
    CouponComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(
        [
          {path:'', component:CouponComponent}
        ]
      ),
      MatTableModule,
      MatButtonModule,
      MatIconModule,
      MatPaginatorModule,
      MatSortModule,
      FormsModule,
      ReactiveFormsModule,
      MatExpansionModule,
      MatFormFieldModule,
      MatInputModule,
      DataTablesModule,
      NgxDatatableModule,
      MatProgressSpinnerModule,
      MatSnackBarModule,
      QuillModule,
      MatSelectModule,
      MatSlideToggleModule
  ]
})
export class CouponModule { }
