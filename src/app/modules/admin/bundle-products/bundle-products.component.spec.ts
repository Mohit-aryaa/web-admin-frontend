import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BundleProductsComponent } from './bundle-products.component';

describe('BundleProductsComponent', () => {
  let component: BundleProductsComponent;
  let fixture: ComponentFixture<BundleProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BundleProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BundleProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
