import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrisciolineResultComponent } from './striscioline-result.component';

describe('StrisciolineResultComponent', () => {
  let component: StrisciolineResultComponent;
  let fixture: ComponentFixture<StrisciolineResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrisciolineResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StrisciolineResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
