import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarCodeComponent } from './solicitar-code.component';

describe('SolicitarCodeComponent', () => {
  let component: SolicitarCodeComponent;
  let fixture: ComponentFixture<SolicitarCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitarCodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitarCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
