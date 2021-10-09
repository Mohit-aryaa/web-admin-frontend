import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerProfileComponent } from './seller-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Ng2TelInputModule } from 'ng2-tel-input';
// import { AgmCoreModule } from '@agm/core';
import { GoogleMapsModule } from '@angular/google-maps'


@NgModule({
  declarations: [
    SellerProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(
      [
        {
        path: '',
        component: SellerProfileComponent
        }
      ]
    ),
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2TelInputModule,
    GoogleMapsModule
  ]
})
export class SellerProfileModule { }
