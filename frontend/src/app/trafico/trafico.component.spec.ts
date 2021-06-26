import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraficoComponent } from './trafico.component';

describe('TraficoComponent', () => {
  let component: TraficoComponent;
  let fixture: ComponentFixture<TraficoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraficoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
