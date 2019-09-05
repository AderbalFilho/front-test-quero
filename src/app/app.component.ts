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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  modalVisibility: string = 'none'

  faInfoCircle = faInfoCircle;
  faUserCircle = faUserCircle;
  faChevronDown = faChevronDown;
  faHeart = faHeart;
  faComments = faComments;
  faEnvelope = faEnvelope;
  faWhatsapp = faWhatsapp;
  faTimes = faTimes;

  changeModalVisibility() {
    this.modalVisibility = 'block';
  }
}
