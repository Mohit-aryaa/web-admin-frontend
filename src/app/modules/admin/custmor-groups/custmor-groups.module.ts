import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import {MatChipsModule} from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CustmorGroupsComponent } from './custmor-groups.component';


@NgModule({
  declarations: [
    CustmorGroupsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(
    [
        {path: '', component: CustmorGroupsComponent}
    ]
    ),
    SharedModule,
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
    MatChipsModule,
    MatSlideToggleModule,
    NgxSkeletonLoaderModule
  ]
})
export class CustmorGroupsModule { }
