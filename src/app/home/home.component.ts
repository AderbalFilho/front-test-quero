import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { faChevronLeft, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { Scholarship } from '../shared/scholarship';
import { ScholarshipService } from '../shared/scholarship.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  modalVisibility: 'none' | 'block' = 'none';
  options: Array<{ value: string, label: string }> = [{ value: 'string', label: 'string' }, { value: 'string2', label: 'string2' }];
  orderArray: Array<{ value: string, label: string }> = [{ value: 'name', label: 'Nome da Faculdade' }];
  scholarships: Array<Scholarship> = [];
  semesterChoice: 1 | 2 | 3 = 1;
  styles = { width: '60%' };

  faChevronLeft = faChevronLeft;
  faPlusCircle = faPlusCircle;

  constructor(private fb: FormBuilder, private scholarshipService: ScholarshipService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      city: [this.options, []],
      course: [this.options, []],
      studyModalityPresential: [true, []],
      studyModalityDistance: [true, []],
      paymentRange: [10000, []],
      order: [this.orderArray, []]
    });
  }

  changeSemester(semester: 1 | 2 | 3) {
    this.semesterChoice = semester;
  }

  changeModalVisibility() {
    this.scholarshipService.getScholarships()
      .subscribe(scholarships => {
        this.scholarships = scholarships;
        this.modalVisibility === 'none' ? this.modalVisibility = 'block' : this.modalVisibility = 'none';
      });
  }

}
