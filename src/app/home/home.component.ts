import { Component, OnInit } from '@angular/core';

import { faChevronLeft, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  modalVisibility: 'none' | 'block' = 'none';
  semesterChoice: 1 | 2 | 3 = 1;
  options: Array<{value: string, label: string}> =  [{value: 'string', label: 'string'}, {value: 'string2', label: 'string2'}]
  form: FormGroup;

  faChevronLeft = faChevronLeft;
  faPlusCircle = faPlusCircle;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      city: [ this.options, [ ] ],
      course: [ this.options, [ ] ],
      studyModalityPresential: [ true, [ ] ],
      studyModalityDistance: [ true, [ ] ],
    });
  }

  changeSemester(semester: 1 | 2 | 3) {
    this.semesterChoice = semester;
  }

  changeModalVisibility() {
    this.modalVisibility === 'none' ? this.modalVisibility = 'block' : this.modalVisibility = 'none';
  }

}
