import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustmorGroupsComponent } from './custmor-groups.component';

describe('CustmorGroupsComponent', () => {
  let component: CustmorGroupsComponent;
  let fixture: ComponentFixture<CustmorGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustmorGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustmorGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
