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
  dropdownItems: Array<{ value: string, active: boolean }> = [
    { value: 'Pré-matrícula', active: false },
    { value: 'Bolsas favoritas', active: true }
  ];

  faInfoCircle = faInfoCircle;
  faUserCircle = faUserCircle;
  faChevronDown = faChevronDown;
  faHeart = faHeart;
  faComments = faComments;
  faEnvelope = faEnvelope;
  faWhatsapp = faWhatsapp;
  faTimes = faTimes;
}
