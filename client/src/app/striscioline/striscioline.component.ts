import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-striscioline',
  templateUrl: './striscioline.component.html',
  styleUrls: ['./striscioline.component.css'],
})
export class StrisciolineComponent implements OnInit {
  strisciolineForm = this.fb.group({
    hisName: ['', Validators.required],
    herName: ['', Validators.required]
  });
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit(): void {
    // Process checkout data here
    console.log(this.strisciolineForm.value);
  }
}
