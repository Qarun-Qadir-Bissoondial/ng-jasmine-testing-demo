import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  count: number;

  constructor(private inventory: InventoryService) {
    this.count = this.inventory.inventoryCount;
  }

  ngOnInit(): void {
  }

  increment() { this.inventory.incrementCount(); this.count = this.inventory.inventoryCount; }
  decrement() { this.inventory.decrementCount(); this.count = this.inventory.inventoryCount; }

}
