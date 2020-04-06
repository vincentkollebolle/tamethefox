import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule }   from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { ChatpanelComponent } from './chatpanel/chatpanel.component';
import { TameboxComponent } from './tamebox/tamebox.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ChatpanelComponent,
    TameboxComponent,
    LoginComponent,
    ChatComponent,
    DateAgoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [],
  entryComponents: [ChatpanelComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
