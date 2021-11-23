import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './services.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from 'app/shared/shared.module';
import { Route } from '@angular/compiler/src/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

 const route: Route[] = [

 ];

@NgModule({
  declarations: [
    ServicesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(
      [
        {path: '', component: ServicesComponent},
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
    MatSlideToggleModule
  ]
})
export class ServicesModule { }
