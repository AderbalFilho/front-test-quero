import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-schorlarship-favorite',
  templateUrl: './schorlarship-favorite.component.html',
  styleUrls: ['./schorlarship-favorite.component.sass']
})
export class SchorlarshipFavoriteComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup;
  @Input() key: string;
  @Output() changeInput = new EventEmitter();

  debouncer: Subject<any> = new Subject();
  inputControl: AbstractControl;

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
    if (newValue !== null) {
      this.inputControl.setValue(newValue);
      this.debouncer.next(newValue);
    }
  }

}
