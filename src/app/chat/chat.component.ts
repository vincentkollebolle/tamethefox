import {
  Component,
  OnInit,
  ViewContainerRef,
  ViewChild,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
} from '@angular/core';
import { FireauthService } from './../service/fireauth.service';
import { AlertService } from './../service/alert.service';
import { UserService } from '../service/user.service';
import { map } from 'rxjs/operators';
import { ChatpanelComponent } from './../chatpanel/chatpanel.component';

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

  userList$;
  sunnyUsers$;
  cloudsUsers$;
  questionsUsers$;

  userActivePanel; //contient le user du chatpanel actuellement ouvert, null sinon.

  constructor(
    public fireauthSrv: FireauthService,
    public alertSrv: AlertService,
    public userSrv: UserService,
    private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.userList$ = this.userSrv.getUsers();
    this.userSrv.getUsers().pipe(map(users => users.filter(user => user.mood == 'sunny' ))).subscribe(value => this.sunnyUsers$ = value);
    this.userSrv.getUsers().pipe(map(users => users.filter(user => user.mood == 'clouds' ))).subscribe(value => this.cloudsUsers$ = value);
    this.userSrv.getUsers().pipe(map(users => users.filter(user => user.mood == 'questions' ))).subscribe(value => this.questionsUsers$ = value);
  }

  createComponent(from, to,i) {
    //on met à jour le user actif (le chatpanel courant)
    this.userActivePanel = to;

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
        this.userActivePanel = null;//reset active chatpanel user
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

  hideAllComponents() {
    this.componentsReferences.forEach((cf) => {
      cf.instance.hideChatpanel = true;
    });
  }

  private destroyComponent(index: number) {
    alert("Destroy composant");
    let componentRef = this.componentsReferences.filter(x => x.instance.index == index)[0];
    componentRef.instance.close.next();
  }

}
