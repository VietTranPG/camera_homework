import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalImage } from './modal-image';

@NgModule({
  declarations: [
    ModalImage,
  ],
  imports: [
    IonicPageModule.forChild(ModalImage),
  ],
})
export class ModalImageModule {}
