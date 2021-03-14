import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrisciolineComponent } from './striscioline.component';
import { StrisciolineService } from './striscioline.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [StrisciolineComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [StrisciolineService],
  exports: [
    StrisciolineComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class StrisciolineModule {}
