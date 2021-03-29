import {
  Component,
  OnInit,
  ViewContainerRef,
  ViewChild,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
} from '@angular/core';

import { User } from './../user';
import { AuthService} from './../service/auth.service';
import { UserService } from './../user.service';
import { ChatpanelComponent } from './../chatpanel/chatpanel.component';
import { Observable, from, of } from "rxjs";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @ViewChild("chatpanelsContainer", { read: ViewContainerRef ,static: true }) container;


  //so index is a unique property here to identify each component individually.
  index: number = 0;
  componentsReferences = [];
  showmyprofile = true;

  userList: Observable<User[]>;
  connectedUser: Observable<User>;
  sunnyUsers;
  cloudsUsers;
  questionsUsers;

  constructor(
    private authSrv: AuthService,
    private usrSrv: UserService,
    private resolver: ComponentFactoryResolver) { }


  ngOnInit() {
    //get ConnectedUser
    this.connectedUser = this.usrSrv.getConnectedUser();

    this.userList = this.usrSrv.getUsers();
    //get users of the chat
    /*this.usrSrv.getUsers().subscribe(data => {
      this.userList = data.map(e => {
        return {
          id: e.id,
          timestamp: e.timestamp.toDate(),
          mood: e.mood,
          email: e.email
        } as User;
      })
    });*/

    //get sunny users
    this.usrSrv.getUsers()
    .pipe(map(users => users.filter(user => user.mood == 'sunny' ))).subscribe(value => this.sunnyUsers = value);

    //get clouds users
    this.usrSrv.getUsers()
    .pipe(map(users => users.filter(user => user.mood == 'clouds' ))).subscribe(value => this.cloudsUsers = value);

    //get questions users
    this.usrSrv.getUsers()
    .pipe(map(users => users.filter(user => user.mood == 'questions' ))).subscribe(value => this.questionsUsers = value);

  }

  hideAllComponents() {
    this.componentsReferences.forEach((cf) => {
      cf.instance.hideChatpanel = true;
    });
  }

  createComponent(from, to,i) {
    //si on a pas de référence à ce composant dans componentList.
    if(!this.componentsReferences.filter(x => x.instance.to == to)[0]) {
      //cacher tous les composant existant
      this.hideAllComponents();
      //on créer le composant et on l'ajoute.
      const factory: ComponentFactory<ChatpanelComponent> = this.resolver.resolveComponentFactory(ChatpanelComponent);
      let componentRef: ComponentRef<ChatpanelComponent> = this.container.createComponent(factory);
      // grab the instance and set the user property.
      componentRef.instance.from = from;
      componentRef.instance.to = to;
      componentRef.instance.close.subscribe(() => {
        componentRef.instance.close.unsubscribe();
        this.componentsReferences = this.componentsReferences.filter(x => x.instance.index !== componentRef.instance.index);
        componentRef.destroy();
      });
      componentRef.instance.index = ++this.index;
      this.componentsReferences.push(componentRef);
    } else {
      // Sinon on cache tous les composant
      this.hideAllComponents();
      //et on montre celui qui est cliqué.
      let cf = this.componentsReferences.filter(x => x.instance.to == to)[0];
      cf.instance.hideChatpanel = false;
    }
  }


  private destroyComponent(index: number) {
    alert("Destroy composant");
    let componentRef = this.componentsReferences.filter(x => x.instance.index == index)[0];
    componentRef.instance.close.next();
  }

  selectUser(user) {
    //this.currentUser = user;
  }

  toggleViewMyProfile() {
    this.showmyprofile = !this.showmyprofile;
  }

  logout() {
    this.authSrv.signOutUser()
  }


}
