import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrisciolineComponent } from './striscioline.component';

describe('StrisciolineComponent', () => {
  let component: StrisciolineComponent;
  let fixture: ComponentFixture<StrisciolineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrisciolineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrisciolineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
