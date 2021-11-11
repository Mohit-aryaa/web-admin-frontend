import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBundleProductComponent } from './add-bundle-product.component';

describe('AddBundleProductComponent', () => {
  let component: AddBundleProductComponent;
  let fixture: ComponentFixture<AddBundleProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBundleProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBundleProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
