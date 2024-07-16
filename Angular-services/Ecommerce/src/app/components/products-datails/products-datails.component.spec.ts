import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDatailsComponent } from './products-datails.component';

describe('ProductsDatailsComponent', () => {
  let component: ProductsDatailsComponent;
  let fixture: ComponentFixture<ProductsDatailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsDatailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsDatailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
