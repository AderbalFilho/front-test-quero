import { Component } from '@angular/core';

import {
  faInfoCircle,
  faUserCircle,
  faChevronDown,
  faHeart,
  faComments,
  faEnvelope,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import { ModalComponent } from './shared/modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  faInfoCircle = faInfoCircle;
  faUserCircle = faUserCircle;
  faChevronDown = faChevronDown;
  faHeart = faHeart;
  faComments = faComments;
  faEnvelope = faEnvelope;
  faWhatsapp = faWhatsapp;
  faTimes = faTimes;

  constructor( private modalComponent: ModalComponent ) { }

  changeModalVisibility() {
    this.modalComponent.changeModalVisibility( );
  }
}
