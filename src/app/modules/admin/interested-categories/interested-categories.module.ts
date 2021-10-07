import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterestedCategoriesComponent } from './interested-categories.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    InterestedCategoriesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(
      [
        {
        path: '',
        component: InterestedCategoriesComponent
        }
      ]
    ),
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    NgbModalModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class InterestedCategoriesModule { }
