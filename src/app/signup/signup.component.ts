
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FireauthService } from './../service/fireauth.service';
import { AlertService } from './../service/alert.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public fireauthSrv: FireauthService,
    private alertService: AlertService
  ) { } 

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required ]]
    });
  }

  onSubmit() {
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    this.alertService.info('Création en cours ...', { autoClose: false,keepAfterRouteChange: false});
    this.fireauthSrv.signUp(email,password);
  }

}  