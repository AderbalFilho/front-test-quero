import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Scholarship } from './../services/scholarship/scholarship';

@Component({
  selector: 'app-scholarship-list',
  templateUrl: './scholarship-list.component.html',
  styleUrls: ['./scholarship-list.component.sass']
})
export class ScholarshipListComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup;
  @Input() key: string;
  @Input() options: Array<Scholarship>;
  @Output() changeInput = new EventEmitter();

  debouncer: Subject<any> = new Subject();
  formList: FormGroup;
  inputControl: AbstractControl;

  constructor(private fb: FormBuilder) {
    this.debouncer
      .pipe(debounceTime(300))
      .subscribe((val) => this.changeInput.emit(val));
  }

  ngOnInit() {
    registerLocaleData(es);
    this.inputControl = this.form.get(this.key) as AbstractControl;
  }

  ngOnDestroy(): void {
    this.debouncer.unsubscribe();
  }

  mark(marked: { value: boolean, key: string }) {
    const key = parseInt(marked.key, 10);
    if (marked.value) {
      this.inputControl.setValue(this.inputControl.value.concat(this.options[key]));
    } else {
      const markedOption = JSON.stringify(this.options[key]);
      this.inputControl.setValue(this.inputControl.value.filter(option => markedOption !== JSON.stringify(option)));
    }
    this.debouncer.next(this.inputControl.value);
  }

}
