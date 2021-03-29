import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FireauthService } from './../service/fireauth.service';
import { AlertService } from './../service/alert.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  message: string ="Bienvenu.e sur Tame The Fox !";

  constructor(
    private formBuilder: FormBuilder,
    public fireauthSrv: FireauthService,
    private alertService: AlertService) { }

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
    this.alertService.info('Connexion en cours ...', { autoClose: false,keepAfterRouteChange: false});
    this.fireauthSrv.signIn(email,password);
  }

}
