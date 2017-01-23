import {Component, Input} from "@angular/core";
import {User} from "../../model/user.model";
@Component({
  moduleId: module.id,
  selector: 'my-player-information',
  templateUrl: 'player-information.component.html'
})
export class PlayerInformationComponent {
  @Input()
  user: User;


}
