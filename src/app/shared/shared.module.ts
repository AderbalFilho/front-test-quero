import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ModalComponent } from './modal/modal.component';
import { InputSelectComponent } from './inputs/input-select/input-select.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { InputCheckboxComponent } from './inputs/input-checkbox/input-checkbox.component';
import { InputRangeComponent } from './inputs/input-range/input-range.component';
import { InputButtonGroupComponent } from './inputs/input-button-group/input-button-group.component';
import { ScholarshipListComponent } from './scholarship-list/scholarship-list.component';
import { ButtonComponent } from './button/button.component';
import { InputRateComponent } from './inputs/input-rate/input-rate.component';
import { RangeNumberPipe } from './pipes/range-number.pipe';

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
    InputRangeComponent,
    InputButtonGroupComponent,
    ScholarshipListComponent,
    ButtonComponent,
    InputRateComponent,
    RangeNumberPipe
  ],
  providers: [
    ModalComponent,
    InputSelectComponent,
    InputCheckboxComponent,
    InputRangeComponent,
    InputButtonGroupComponent,
    ScholarshipListComponent,
    ButtonComponent,
    InputRateComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ModalComponent,
    InputSelectComponent,
    InputCheckboxComponent,
    InputRangeComponent,
    InputButtonGroupComponent,
    ScholarshipListComponent,
    ButtonComponent,
    InputRateComponent
  ]
})
export class SharedModule { }
