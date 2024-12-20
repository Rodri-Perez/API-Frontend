import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaProductoComponent } from './vista-producto.component';

describe('VistaProductoComponent', () => {
  let component: VistaProductoComponent;
  let fixture: ComponentFixture<VistaProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaProductoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
