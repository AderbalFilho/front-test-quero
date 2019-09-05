import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ModalComponent } from './modal/modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
  ],
  declarations: [
    ModalComponent
  ],
  providers: [
    ModalComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ModalComponent
  ]
})
export class SharedModule { }