import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBundleProductComponent } from './add-bundle-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { RouterModule } from '@angular/router';;
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { QuillModule } from 'ngx-quill';



@NgModule({
  declarations: [
    AddBundleProductComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(
      [
        {path: '', component: AddBundleProductComponent}
      ]
    ),
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatChipsModule,
    MatSelectModule,
    MatTabsModule,
    QuillModule
  ]

})
export class AddBundleProductModule { }
