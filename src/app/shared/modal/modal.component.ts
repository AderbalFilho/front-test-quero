import {
  Component,
  Input,
  TemplateRef,
  Output,
  EventEmitter
} from '@angular/core';

import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent {
  @Input() modalBody: TemplateRef<any>;
  @Output() closeModal = new EventEmitter();

  faTimes = faTimes;

  close($event) {
    this.closeModal.emit($event);
  }
}
