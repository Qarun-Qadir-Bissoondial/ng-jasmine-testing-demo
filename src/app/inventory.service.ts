import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  inventoryCount: number = 0;

  constructor() { }

  incrementCount() {
    this.inventoryCount++;
  }

  decrementCount() {
    if (this.inventoryCount === 0) return;

    this.inventoryCount--;
  }
}
