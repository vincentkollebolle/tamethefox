import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';

//forms
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

//firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';

// env
import { environment } from '../environments/environment';
import { ChatComponent } from './chat/chat.component';
import { AlertComponent } from './alert/alert.component';
import { LogoComponent } from './logo/logo.component';
import { ChatpanelComponent } from './chatpanel/chatpanel.component';
import { DateAgoPipe } from './pipe/date-ago.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    ChatComponent,
    AlertComponent,
    LogoComponent,
    ChatpanelComponent,
    DateAgoPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [],
  entryComponents: [ChatpanelComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
