import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FireauthService } from './../service/fireauth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  signinForm: FormGroup;
  message: string ="Bienvenu.e sur Tame The Fox !";

  constructor(
    private formBuilder: FormBuilder,
    public fireauthSrv: FireauthService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required ]]
    });
  }

  onSubmit() {
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;
    this.message = "Connexion en cours ...";
    this.fireauthSrv.signIn(email,password);
  }

}
