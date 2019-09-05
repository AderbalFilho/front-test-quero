import { Component, OnInit } from '@angular/core';

import { faChevronLeft, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  modalVisibility: string = 'none' as string;
  pressed: number = 1 as number;

  faChevronLeft = faChevronLeft;
  faPlusCircle = faPlusCircle;

  constructor() { }

  ngOnInit() {
  }

  changePressed(n: number) {
    this.pressed = n;
  }

  changeModalVisibility() {
    this.modalVisibility === 'none' ? this.modalVisibility = 'block' : this.modalVisibility = 'none';
  }

}
