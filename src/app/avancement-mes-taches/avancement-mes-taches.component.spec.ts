import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvancementMesTachesComponent } from './avancement-mes-taches.component';

describe('AvancementMesTachesComponent', () => {
  let component: AvancementMesTachesComponent;
  let fixture: ComponentFixture<AvancementMesTachesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvancementMesTachesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvancementMesTachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
