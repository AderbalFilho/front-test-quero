import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.sass']
})
export class InputSelectComponent {
  @Input() form: FormGroup;
  @Input() key: string;
  @Input() label?: string;
  @Input() name: string;
  @Input() selectedItem?: string;
  @Output() change = new EventEmitter();
  
  debouncer: Subject<any> = new Subject();
  inputControl: AbstractControl;
  options: Array<{ value: string, label: string }>;

  constructor() {
    this.debouncer
      .pipe(debounceTime(300))
      .subscribe((val) => this.change.emit(val));
  }

  ngOnInit(){
    this.inputControl = this.form.get(this.key) as AbstractControl;
    this.options = this.inputControl.value ? this.inputControl.value : [ ];
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
}
