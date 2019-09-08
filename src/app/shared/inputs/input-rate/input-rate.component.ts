import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-input-rate',
  templateUrl: './input-rate.component.html',
  styleUrls: ['./input-rate.component.sass']
})
export class InputRateComponent implements OnInit, OnDestroy {
  @Input() canChange: boolean = true as boolean;
  @Input() form?: FormGroup;
  @Input() key: string;
  @Input() stars: number = 5 as number;
  @Output() changeInput = new EventEmitter();

  debouncer: Subject<any> = new Subject();
  inputControl: AbstractControl;

  faStar = faStar;
  faStarHalf = faStarHalf;
  faStarRegular = faStarRegular;

  constructor(private fb: FormBuilder) {
    this.debouncer
      .pipe(debounceTime(300))
      .subscribe((val) => this.changeInput.emit(val));
  }

  ngOnInit() {
    if (!this.form) {
      const obj = {};
      obj[this.key] = [false, []];
      this.form = this.fb.group(obj);
    }
    this.inputControl = this.form.get(this.key) as AbstractControl;
  }

  ngOnDestroy(): void {
    this.debouncer.unsubscribe();
  }

  modelChanged(newValue) {
    if (newValue !== null && this.canChange) {
      this.inputControl.setValue(newValue);
      this.debouncer.next({ value: newValue, key: this.key.slice(5) });
    }
  }

}
