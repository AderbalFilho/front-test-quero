import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ModalComponent } from './modal/modal.component';
import { InputSelectComponent } from './inputs/input-select/input-select.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { InputCheckboxComponent } from './inputs/input-checkbox/input-checkbox.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    NgSelectModule
  ],
  declarations: [
    ModalComponent,
    InputSelectComponent,
    InputCheckboxComponent
  ],
  providers: [
    ModalComponent,
    InputSelectComponent,
    InputCheckboxComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ModalComponent,
    InputSelectComponent,
    InputCheckboxComponent
  ]
})
export class SharedModule { }
