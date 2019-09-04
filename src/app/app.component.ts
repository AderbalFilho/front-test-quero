import { Component } from '@angular/core';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

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
}
