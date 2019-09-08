import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-input-rate',
  templateUrl: './input-rate.component.html',
  styleUrls: ['./input-rate.component.sass']
})
export class InputRateComponent implements OnInit, OnDestroy {
  @Input() canChange: boolean = true as boolean;
  @Input() color: string = '#FDCB13' as string;
  @Input() form: FormGroup;
  @Input() key: string;
  @Input() showLabel: boolean = false as boolean;
  @Input() stars: number = 5 as number;
  @Output() changeInput = new EventEmitter();

  debouncer: Subject<any> = new Subject();
  inputControl: AbstractControl;

  faStar = faStar;
  faStarHalfAlt = faStarHalfAlt;
  faStarRegular = faStarRegular;

  constructor(private fb: FormBuilder) {
    this.debouncer
      .pipe(debounceTime(300))
      .subscribe((val) => this.changeInput.emit(val));
  }

  ngOnInit() {
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
