/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GanntchartComponent } from './Ganntchart.component';

describe('GanntchartComponent', () => {
  let component: GanntchartComponent;
  let fixture: ComponentFixture<GanntchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GanntchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GanntchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
