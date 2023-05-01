import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdituserscheduleComponent } from './edituserschedule.component';

describe('EdituserscheduleComponent', () => {
  let component: EdituserscheduleComponent;
  let fixture: ComponentFixture<EdituserscheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdituserscheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdituserscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
