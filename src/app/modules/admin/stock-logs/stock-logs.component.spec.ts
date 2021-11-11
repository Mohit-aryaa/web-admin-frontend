import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockLogsComponent } from './stock-logs.component';

describe('StockLogsComponent', () => {
  let component: StockLogsComponent;
  let fixture: ComponentFixture<StockLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockLogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
