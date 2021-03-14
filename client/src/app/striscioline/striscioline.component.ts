import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { StrisciolineService } from './striscioline.service';

@Component({
  selector: 'app-striscioline',
  templateUrl: './striscioline.component.html',
  styleUrls: ['./striscioline.component.css'],
})
export class StrisciolineComponent implements OnInit {
  questions: string[] = [];
  strisciolineForm = this.fb.group({
    questionsFArr: this.fb.array([])
  });

  get questionsFArr(): FormArray {
    return this.strisciolineForm.get('questionsFArr') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private strisciolineService: StrisciolineService
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
    // Process checkout data here
    console.log(this.questionsFArr.value);
  }
}
