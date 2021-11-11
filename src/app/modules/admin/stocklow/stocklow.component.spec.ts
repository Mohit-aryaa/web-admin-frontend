import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocklowComponent } from './stocklow.component';

describe('StocklowComponent', () => {
  let component: StocklowComponent;
  let fixture: ComponentFixture<StocklowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StocklowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StocklowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
