import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.sass']
})
export class InputSelectComponent {
  @Input() label?: string;
  @Input() name: string;
  @Input() options: Array<{ value: string, label: string }>;

  selectedItem: any;
}
