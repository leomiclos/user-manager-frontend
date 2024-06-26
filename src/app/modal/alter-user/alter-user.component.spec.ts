import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterUserComponent } from './alter-user.component';

describe('AlterUserComponent', () => {
  let component: AlterUserComponent;
  let fixture: ComponentFixture<AlterUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlterUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlterUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
