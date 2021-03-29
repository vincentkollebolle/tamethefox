    SigninComponent,
    ChatComponent,
    AlertComponent,
    LogoComponent,
    DateAgoPipe,
    SignupComponent,
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
