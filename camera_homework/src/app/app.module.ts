import { FileTransfer } from '@ionic-native/file-transfer';
import { UploadFile } from './../providers/upload-file';
import { ModalImage } from './../pages/modal-image/modal-image';
import { DataService } from './../providers/data-service';
import { UtilityService } from './../providers/utility-service';
import { CameraPage } from './../pages/camera-page/camera-page';
import { RegisterPage } from './../pages/register-page/register-page';
import { LoginPage } from './../pages/login-page/login-page';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    CameraPage,
    ModalImage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    CameraPage,
    ModalImage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UtilityService,
    DataService,
    UploadFile,
    FileTransfer,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
