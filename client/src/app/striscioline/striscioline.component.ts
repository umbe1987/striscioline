import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { StrisciolineService } from './striscioline.service';
import { StrisciolineResultComponent } from './striscioline-result/striscioline-result.component';
import { MatDialog } from '@angular/material/dialog';
import { Client, Room, DataChange } from 'colyseus.js';

@Component({
  selector: 'app-striscioline',
  templateUrl: './striscioline.component.html',
  styleUrls: ['./striscioline.component.css'],
})
export class StrisciolineComponent implements AfterViewInit {
  private room: Room;
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

  ngAfterViewInit(): void {
    const host = window.document.location.host.replace(/:.*/, '');
    const client = new Client(
      location.protocol.replace('http', 'ws') +
        '//' +
        host +
        (location.port ? ':' + location.port : '')
    );
    client
      .joinOrCreate('striscioline')
      .then((roomInstance) => {
        this.room = roomInstance;
        console.log(this.room.sessionId, 'joined', this.room.name);

        const players: object = {};
        this.room.state.players.onAdd = (player: any, sessionId: any) => {
          player.onChange = (changes: DataChange[]) => {
            changes.forEach((change: any) => {
              console.log(change.field);
              console.log(change.value);
              console.log(change.previousValue);
            });
          };
          players[sessionId] = player;
          Object.entries(players).forEach(([key, val]) => {
            console.log(key, val.done);
          });
        };

        this.room.state.players.onChange = (player: any, sessionId: any) => {
          console.log(`${player} have changes at ${sessionId}`);
        };

        this.room.onStateChange((state) => {
          console.log(`${this.room.name} has new state: ${state}`);
        });

        this.room.state.players.onRemove = (player: any, sessionId: any) => {
          console.log(`${player} has been removed at ${sessionId}`);
          delete players[sessionId];
        };
      })
      .catch((e) => {
        console.log('JOIN ERROR', e);
      });
  }

  private addQuestion(): void {
    this.questionsFArr.push(this.fb.control('', Validators.required));
  }

  onSubmit(): void {
    this.room.send('submit', { done: true });
    // combine two arrays like Python zip function (https://stackoverflow.com/a/22015771/1979665)
    const qa = this.questions.map((e, i) => [e, this.questionsFArr.value[i]]);
    console.log(qa);
    const dialogRef = this.dialog.open(StrisciolineResultComponent, {
      data: qa,
    });
    dialogRef.disableClose = true;

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
