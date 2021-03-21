import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { StrisciolineService } from './striscioline.service';
import { StrisciolineResultComponent } from './striscioline-result/striscioline-result.component';
import { MatDialog } from '@angular/material/dialog';
import * as Colyseus from 'colyseus.js';
import { SnackbarService } from '../snackbar.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-striscioline',
  templateUrl: './striscioline.component.html',
  styleUrls: ['./striscioline.component.css'],
})
export class StrisciolineComponent implements AfterViewInit {
  private room: Colyseus.Room;
  private host = window.document.location.host.replace(/:.*/, '');
  private client: Colyseus.Client;
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
    private dialog: MatDialog,
    private snackbar: SnackbarService
  ) {
    this.strisciolineService.getQuestions().subscribe((questions) => {
      questions.forEach((q) => {
        this.questions.push(q);
        this.addQuestion();
      });
    });
  }

  ngAfterViewInit(): void {
    this.initGame(this.host);
  }

  private initGame(host: string): void {
    this.client = new Colyseus.Client(
      location.protocol.replace('http', 'ws') +
        '//' +
        host +
        (location.port ? ':' + location.port : '')
    );
    this.client
      .joinOrCreate('striscioline')
      .then((roomInstance) => {
        this.room = roomInstance;
        console.log(this.room.sessionId, 'joined', this.room.name);

        this.room.state.players.onRemove = (player: any, sessionId: any) => {
          console.log(`${player} has been removed at ${sessionId}`);
        };

        // server message handling
        this.room.onMessage('join', (message) => {
          const joinMessage = `${this.room.name} says: "${message}"`;
          console.log(joinMessage);
          this.snackbar.open(message, undefined, { duration: 2000 });
        });

        this.room.onMessage('all-players-done', (message) => {
          this.room.send('ready-to-read');
        });

        this.room.onMessage('final-story', (finalStory) => {
          this.showStory(finalStory);
        });
      })
      .catch((e) => {
        console.log('JOIN ERROR', e);
      });
  }

  private addQuestion(): void {
    this.questionsFArr.push(this.fb.control('', Validators.required));
  }

  onSubmit(): void {
    // combine two arrays like Python zip function (https://stackoverflow.com/a/22015771/1979665)
    const qa = this.questions.map((e, i) => [e, this.questionsFArr.value[i]]);
    console.log(qa);
    this.room.send('submit', { qa, done: true });
  }

  private showStory(story: any): any {
    const dialogRef = this.dialog.open(StrisciolineResultComponent, {
      data: story,
    });
    dialogRef.disableClose = true;

    dialogRef.afterClosed().subscribe((result) => {
      this.strisciolineForm.reset();
      this.room.leave();
      this.initGame(this.host);
    });
  }
}
