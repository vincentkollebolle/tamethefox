import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from './guard/auth.guard';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: AppComponent, pathMatch: 'full',  canActivate: [AuthGuard] },
  { path: 'signin', component: SigninComponent, pathMatch: 'full' },
  { path: 'chat', component: ChatComponent,  canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
