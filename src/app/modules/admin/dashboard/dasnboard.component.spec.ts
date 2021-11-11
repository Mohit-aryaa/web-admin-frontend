import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasnboardComponent } from './dasnboard.component';

describe('DasnboardComponent', () => {
  let component: DasnboardComponent;
  let fixture: ComponentFixture<DasnboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DasnboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DasnboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
