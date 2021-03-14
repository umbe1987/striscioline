import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-striscioline-result',
  templateUrl: './striscioline-result.component.html',
  styleUrls: ['./striscioline-result.component.css']
})
export class StrisciolineResultComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
