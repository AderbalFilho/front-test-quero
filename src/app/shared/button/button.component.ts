import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass']
})
export class ButtonComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup;
  @Input() key: string;
  @Input() label: string;
  @Input() disabled: boolean;
  @Input() colorClass: string = 'outline-black' as string;
  @Output() changeInput = new EventEmitter();

  classObject: object;
  debouncer: Subject<any> = new Subject();
  inputControl: AbstractControl;

  constructor() {
    this.debouncer
      .pipe(debounceTime(300))
      .subscribe((val) => this.changeInput.emit(val));
  }

  ngOnInit() {
    this.inputControl = this.form.get(this.key) as AbstractControl;
    this.classObject = { disabled: this.disabled };
    this.classObject[this.colorClass] = !this.disabled;
  }

  ngOnDestroy(): void {
    this.debouncer.unsubscribe();
  }

}
