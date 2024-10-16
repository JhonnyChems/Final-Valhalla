import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarpassComponent } from './recuperarpass.component';

describe('RecuperarpassComponent', () => {
  let component: RecuperarpassComponent;
  let fixture: ComponentFixture<RecuperarpassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecuperarpassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecuperarpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
