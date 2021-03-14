import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrisciolineComponent } from './striscioline.component';
import { StrisciolineService } from './striscioline.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StrisciolineResultComponent } from './striscioline-result/striscioline-result.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [StrisciolineComponent, StrisciolineResultComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatListModule,
  ],
  providers: [StrisciolineService],
  exports: [
    StrisciolineComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
  ],
})
export class StrisciolineModule {}
