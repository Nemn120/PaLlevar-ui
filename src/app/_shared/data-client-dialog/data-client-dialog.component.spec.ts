import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataClientDialogComponent } from './data-client-dialog.component';

describe('DataClientDialogComponent', () => {
  let component: DataClientDialogComponent;
  let fixture: ComponentFixture<DataClientDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataClientDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataClientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
