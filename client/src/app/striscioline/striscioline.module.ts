import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrisciolineComponent } from './striscioline.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [StrisciolineComponent],
  imports: [CommonModule, MatFormFieldModule, MatInputModule],
  exports: [StrisciolineComponent, MatFormFieldModule, MatInputModule],
})
export class StrisciolineModule {}
