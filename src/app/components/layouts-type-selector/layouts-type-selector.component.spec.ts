import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutsTypeSelectorComponent } from './layouts-type-selector.component';

describe('LayoutsTypeSelectorComponent', () => {
  let component: LayoutsTypeSelectorComponent;
  let fixture: ComponentFixture<LayoutsTypeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutsTypeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutsTypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
