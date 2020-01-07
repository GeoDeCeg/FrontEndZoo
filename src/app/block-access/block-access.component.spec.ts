import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockAccessComponent } from './block-access.component';

describe('BlockAccessComponent', () => {
  let component: BlockAccessComponent;
  let fixture: ComponentFixture<BlockAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
