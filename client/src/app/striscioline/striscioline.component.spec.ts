import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StrisciolineComponent } from './striscioline.component';

describe('StrisciolineComponent', () => {
  let component: StrisciolineComponent;
  let fixture: ComponentFixture<StrisciolineComponent>;

  beforeEach(waitForAsync(() => {
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
