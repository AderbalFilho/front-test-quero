import { Component } from '@angular/core';

import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent {
  modalVisibility: string = 'none'

  faTimes = faTimes;

  changeModalVisibility() {
    console.log('get in');
    this.modalVisibility = 'block';
  }
}
