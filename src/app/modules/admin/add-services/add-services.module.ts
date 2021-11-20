import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { QuillModule } from 'ngx-quill';
import { AddServicesComponent } from './add-services.component';

@NgModule({
  declarations: [
    AddServicesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(
        [
            {path: '', component: AddServicesComponent}
        ]
    ),
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatChipsModule,
    MatTabsModule,
    MatSelectModule,
    QuillModule,
  ],
})
export class AddServiceModule { }
