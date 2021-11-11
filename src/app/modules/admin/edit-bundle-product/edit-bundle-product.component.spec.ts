import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBundleProductComponent } from './edit-bundle-product.component';

describe('EditBundleProductComponent', () => {
  let component: EditBundleProductComponent;
  let fixture: ComponentFixture<EditBundleProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBundleProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBundleProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
