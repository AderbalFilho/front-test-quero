import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { Scholarship } from '../services/scholarship/scholarship';

@Component({
  selector: 'app-scholarship-favorite',
  templateUrl: './scholarship-favorite.component.html',
  styleUrls: ['./scholarship-favorite.component.sass']
})
export class ScholarshipFavoriteComponent implements OnInit, OnDestroy {
  @Input() form?: FormGroup;
  @Input() key: string;
  @Input() value: Scholarship;
  @Output() changeInput = new EventEmitter();

  faCircle = faCircle;

  debouncer: Subject<any> = new Subject();
  inputControl: AbstractControl;
  paddingDelete: string = '14px 25px' as string;
  paddingSeeOffer: string = '14px 50px' as string;
  screenHeight: any;
  screenWidth: any;
  sizeDelete: string = '16px' as string;
  sizeSeeOffer: string = '16px' as string;

  constructor(private fb: FormBuilder) {
    this.getScreenSize();
    this.debouncer
      .pipe(debounceTime(300))
      .subscribe((val) => this.changeInput.emit(val));
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 768) {
      this.paddingDelete = '14px 25px';
      this.paddingSeeOffer = '14px 50px';
      this.sizeDelete = '16px';
      this.sizeSeeOffer = '16px';
    } else {
      this.paddingDelete = '7px 20px';
      this.paddingSeeOffer = '7px 26px';
      this.sizeDelete = '12px';
      this.sizeSeeOffer = '12px';
    }
  }

  ngOnInit() {
    registerLocaleData(es);
    if (!this.form) {
      const obj = {};
      obj[this.key] = [this.value, []];
      this.form = this.fb.group(obj);
    }
    this.inputControl = this.form.get(this.key) as AbstractControl;
    this.form = this.fb.group({
      score: [this.inputControl.value.university.score, []]
    });
  }

  ngOnDestroy(): void {
    this.debouncer.unsubscribe();
  }

  modelChanged(newValue) {
    if (newValue !== null) {
      this.debouncer.next(newValue);
    }
  }

  buttonClicked(key: string) {
    if (key === 'delete') {
      this.modelChanged({ value: this.inputControl.value, key: this.key });
    }
  }

}
