import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { StrisciolineService } from './striscioline.service';
import { StrisciolineResultComponent } from './striscioline-result/striscioline-result.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-striscioline',
  templateUrl: './striscioline.component.html',
  styleUrls: ['./striscioline.component.css'],
})
export class StrisciolineComponent implements OnInit {
  questions: string[] = [];
  strisciolineForm = this.fb.group({
    questionsFArr: this.fb.array([]),
  });

  get questionsFArr(): FormArray {
    return this.strisciolineForm.get('questionsFArr') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private strisciolineService: StrisciolineService,
    private dialog: MatDialog
  ) {
    this.strisciolineService.getQuestions().subscribe((questions) => {
      questions.forEach((q) => {
        this.questions.push(q);
        this.addQuestion();
      });
    });
  }

  ngOnInit(): void {}

  private addQuestion(): void {
    this.questionsFArr.push(this.fb.control('', Validators.required));
  }

  onSubmit(): void {
    // combine two arrays like Ptyhon zip function (https://stackoverflow.com/a/22015771/1979665)
    const qa = this.questions.map((e, i) => [e, this.questionsFArr.value[i]]);
    console.log(qa);
    const dialogRef = this.dialog.open(StrisciolineResultComponent, {
      data: qa
    });
    dialogRef.disableClose = true;

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
