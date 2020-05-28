import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InventoryComponent } from './inventory.component';
import { InventoryService } from '../inventory.service';
import { MockInventoryService } from 'src/testing/inventory.mock.service';

fdescribe('InventoryComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;
  
  let incrementSpy: jasmine.Spy;
  let decrementSpy: jasmine.Spy;
  let service: InventoryService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryComponent ],
      providers: [
        { provides: InventoryService, useClass: MockInventoryService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryComponent);

    service = TestBed.inject(InventoryService);
    incrementSpy = spyOn(service, 'incrementCount');
    decrementSpy = spyOn(service, 'decrementCount');

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call "incrementCount()" when "increment()" is called', () => {
    component.increment();
    expect(incrementSpy).toHaveBeenCalled();
  });

  it('should call "decrementCount()" when "decrement()" is called', () => {
    component.decrement();
    expect(decrementSpy).toHaveBeenCalled();
  });

});
