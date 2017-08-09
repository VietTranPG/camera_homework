import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CameraPage } from './camera-page';

@NgModule({
  declarations: [
    CameraPage,
  ],
  imports: [
    IonicPageModule.forChild(CameraPage),
  ],
})
export class CameraPageModule {}
