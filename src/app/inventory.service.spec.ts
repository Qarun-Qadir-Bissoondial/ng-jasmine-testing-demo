import { TestBed } from '@angular/core/testing';

import { InventoryService } from './inventory.service';

fdescribe('InventoryService', () => {
  let service: InventoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize the count to 0', () => {
    expect(service.inventoryCount).toBe(0);
  })

  it('should increment the count', () => {
    expect(service.inventoryCount).toBe(0);
    service.incrementCount();
    expect(service.inventoryCount).toBe(1);
  });

  it('should decrement the count', () => {
    service.inventoryCount = 10;
    service.decrementCount();
    expect(service.inventoryCount).toBe(9);
  });

  it('should not decrement when count is 0', () => {
    expect(service.inventoryCount).toBe(0);
    service.decrementCount();
    expect(service.inventoryCount).toBe(0);
  });
});
