import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocialLoginModule} from 'angularx-social-login';
import { Store, StoreModule} from '@ngrx/store'
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AuthService } from './services/authentication.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import {FirebaseService} from './services/firebase';
import { AuthCheckGuard } from './services/auth-check.guard';
import { UserResolver } from './services/resolver';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { DataSender } from './creating-page/dataSender.servise';
import {reducer} from './reducers/preview';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SearchFilterPipe } from './main-page/search-filter.pipe';
import {HttpClientModule} from "@angular/common/http";
import {HeaderModule} from "./common/header/header.module";
import {MainPageModule} from "./main-page/main-page.module";
import {ArticlePageModule} from "./article-page/article-page.module";
import {AuthPageModule} from "./auth-page/auth-page.module";
import {PreviewPopupModule} from "./creating-page/preview-popup/preview-popup.module";
import {ConfirmDialogModule} from "./confirm-dialog/confirm-dialog.module";
import {FormBuilder} from "@angular/forms";
import {MatChipsModule} from "@angular/material/chips";
import {CreatingPageModule} from "./creating-page/creating-page.module";

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SocialLoginModule,
    NgxDropzoneModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    StoreModule.forRoot({example: reducer}),
    HeaderModule,
    MainPageModule,
    ArticlePageModule,
    AuthPageModule,
    PreviewPopupModule,
    ConfirmDialogModule,
    MatChipsModule
  ],
  providers: [
    StoreModule,
    Store,
    FirebaseService,
    AuthService,
    AuthCheckGuard,
    UserResolver,
    DataSender,
    FormBuilder
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
