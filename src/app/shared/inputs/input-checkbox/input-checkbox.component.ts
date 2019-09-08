import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-input-checkbox',
  templateUrl: './input-checkbox.component.html',
  styleUrls: ['./input-checkbox.component.sass']
})
export class InputCheckboxComponent implements OnInit, OnDestroy {
  @Input() form?: FormGroup;
  @Input() key: string;
  @Output() changeInput = new EventEmitter();

  debouncer: Subject<any> = new Subject();
  inputControl: AbstractControl;

  faCheck = faCheck;

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
    if (newValue !== null) {
      this.inputControl.setValue(newValue);
      this.debouncer.next({ value: newValue, key: this.key.slice(5) });
    }
  }

  click() {
    this.inputControl.setValue(!this.inputControl.value);
    this.modelChanged(this.inputControl.value);
  }
}
