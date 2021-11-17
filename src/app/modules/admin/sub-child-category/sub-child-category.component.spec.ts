import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubChildCategoryComponent } from './sub-child-category.component';

describe('SubChildCategoryComponent', () => {
  let component: SubChildCategoryComponent;
  let fixture: ComponentFixture<SubChildCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubChildCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubChildCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
