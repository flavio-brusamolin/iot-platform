import { Component, OnInit } from '@angular/core'

import { faTrashAlt, faUser, faEnvelope, faShieldAlt } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  public readonly icons = {
    remove: faTrashAlt,
    user: faUser,
    mail: faEnvelope,
    permission: faShieldAlt
  }

  public constructor () { }

  public ngOnInit (): void { }
}
