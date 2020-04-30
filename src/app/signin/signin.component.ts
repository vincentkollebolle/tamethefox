import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FireauthService } from './../service/fireauth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  message: string ="Bienvenu.e sur Tame The Fox !";

  constructor(
    private formBuilder: FormBuilder,
    private fireauthSrv: FireauthService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {
    this.message = "Connexion en cours ...";
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;
    //TODO: faire en sorte que signInUser renvoi une promesse et utiliser .catch() {} pour 
    //mettre à jour le message. 
    
    
  }



}  