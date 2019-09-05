import { Component, OnInit } from '@angular/core';

import { faChevronLeft, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  modalVisibility: 'none' | 'block' = 'none';
  semesterChoice: 1 | 2 | 3 = 1;

  faChevronLeft = faChevronLeft;
  faPlusCircle = faPlusCircle;

  constructor() { }

  ngOnInit() {
  }

  changeSemester(semester: 1 | 2 | 3) {
    this.semesterChoice = semester;
  }

  changeModalVisibility() {
    this.modalVisibility === 'none' ? this.modalVisibility = 'block' : this.modalVisibility = 'none';
  }

}
