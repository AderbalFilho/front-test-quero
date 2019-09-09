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
  @Input() colorClass: string = 'outline-black' as string;
  @Input() disabled: boolean;
  @Input() form: FormGroup;
  @Input() key: string;
  @Input() label: string;
  @Input() padding: string = '14px 25px' as string;
  @Input() size: string = '16px' as string;
  @Input() width: string = 'auto' as string;
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
  }

  ngOnDestroy(): void {
    this.debouncer.unsubscribe();
  }

  clicked() {
    if (!this.disabled) {
      this.debouncer.next(this.key);
    }
  }

}
