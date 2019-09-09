import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';

@Component({
  selector: 'app-input-range',
  templateUrl: './input-range.component.html',
  styleUrls: ['./input-range.component.sass']
})
export class InputRangeComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup;
  @Input() key: string;
  @Input() label?: string;
  @Input() maxRange?: number = 100 as number;
  @Input() minRange?: number = 0 as number;
  @Input() prefixValue?: string = '' as string;
  @Input() showValue?: boolean = true as boolean;
  @Input() sufixValue?: string = '' as string;
  @Output() changeInput = new EventEmitter();

  debouncer: Subject<any> = new Subject();
  inputControl: AbstractControl;
  value: number;

  constructor() {
    this.debouncer
      .pipe(debounceTime(300))
      .subscribe((val) => this.changeInput.emit(val));
  }

  ngOnInit() {
    registerLocaleData(es);
    this.inputControl = this.form.get(this.key) as AbstractControl;
    this.maxRange = this.maxRange > this.minRange ? this.maxRange : this.minRange;
    this.inputControl.setValue(this.inputControl.value ? this.inputControl.value : this.minRange);
    this.value = this.inputControl.value;
  }

  ngOnDestroy(): void {
    this.debouncer.unsubscribe();
  }

  modelChanged(newValue) {
    if (newValue !== null) {
      this.inputControl.setValue(this.value);
      this.debouncer.next(newValue);
    }
  }

}
