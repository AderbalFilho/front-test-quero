import { Component } from '@angular/core';

import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-input-checkbox',
  templateUrl: './input-checkbox.component.html',
  styleUrls: ['./input-checkbox.component.sass']
})
export class InputCheckboxComponent {
  clicked: boolean = false as boolean;

  faCheck = faCheck;

  click() {
    this.clicked = !this.clicked;
  }
}
