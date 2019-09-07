import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ModalComponent } from './modal/modal.component';
import { InputSelectComponent } from './inputs/input-select/input-select.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { InputCheckboxComponent } from './inputs/input-checkbox/input-checkbox.component';
import { InputRangeComponent } from './inputs/input-range/input-range.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgSelectModule
  ],
  declarations: [
    ModalComponent,
    InputSelectComponent,
    InputCheckboxComponent,
    InputRangeComponent
  ],
  providers: [
    ModalComponent,
    InputSelectComponent,
    InputCheckboxComponent,
    InputRangeComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ModalComponent,
    InputSelectComponent,
    InputCheckboxComponent,
    InputRangeComponent
  ]
})
export class SharedModule { }
