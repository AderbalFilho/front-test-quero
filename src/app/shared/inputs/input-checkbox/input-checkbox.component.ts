import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-input-checkbox',
  templateUrl: './input-checkbox.component.html',
  styleUrls: ['./input-checkbox.component.sass']
})
export class InputCheckboxComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() key: string;
  @Output() change = new EventEmitter();

  debouncer: Subject<any> = new Subject();
  inputControl: AbstractControl;
  checked: boolean;

  faCheck = faCheck;

  constructor() {
    this.debouncer
      .pipe(debounceTime(300))
      .subscribe((val) => this.change.emit(val));
  }

  ngOnInit(){
    this.inputControl = this.form.get(this.key) as AbstractControl;
    this.checked = this.inputControl.value ? true : false;
  }

  ngOnDestroy(): void {
    this.debouncer.unsubscribe();
  }

  modelChanged(newValue) {
    if (newValue !== null) {
      this.inputControl.setValue(newValue);
      this.debouncer.next(newValue);
    }
  }

  click() {
    this.checked = !this.checked;
    this.modelChanged(this.checked);
  }
}
