// transversal
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//routing
import { AppRoutingModule } from './app-routing.module';
//forms
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from "@angular/fire/auth";
//components
import { AppComponent } from './app.component';
import { ChatpanelComponent } from './chatpanel/chatpanel.component';
import { TameboxComponent } from './tamebox/tamebox.component';
import { ChatComponent } from './chat/chat.component';
import { MoodselectorComponent } from './moodselector/moodselector.component';
import { ViewmyprofileComponent } from './viewmyprofile/viewmyprofile.component';
import { SignupComponent } from './signup/signup.component';
import { SignInComponent } from './sign-in/sign-in.component';
//pipes
import { DateAgoPipe } from './pipes/date-ago.pipe';
// env
import { environment } from '../environments/environment';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatpanelComponent,
    TameboxComponent,
    ChatComponent,
    DateAgoPipe,
    MoodselectorComponent,
    ViewmyprofileComponent,
    SignupComponent,
    SignInComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [],
  entryComponents: [ChatpanelComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
