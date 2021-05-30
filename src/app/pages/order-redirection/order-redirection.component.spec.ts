import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderRedirectionComponent } from './order-redirection.component';

describe('OrderRedirectionComponent', () => {
  let component: OrderRedirectionComponent;
  let fixture: ComponentFixture<OrderRedirectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderRedirectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderRedirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
