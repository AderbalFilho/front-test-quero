import { Component, Input, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NgSelectConfig } from '@ng-select/ng-select';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.sass']
})
export class InputSelectComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup;
  @Input() key: string;
  @Input() label?: string;
  @Input() name: string;
  @Input() options: Array<{ value: string, label: string }>;
  @Input() unbordered?: boolean = false as boolean;
  @Input() styles?: object;
  @Output() changeInput = new EventEmitter();

  debouncer: Subject<any> = new Subject();
  inputControl: AbstractControl;
  selectedItem?: string;
  value: any;

  constructor(private config: NgSelectConfig) {
    this.debouncer
      .pipe(debounceTime(300))
      .subscribe((val) => this.changeInput.emit(val));
    this.config.notFoundText = 'Nenhum dado encontrado!';
  }

  ngOnInit() {
    this.inputControl = this.form.get(this.key) as AbstractControl;
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
