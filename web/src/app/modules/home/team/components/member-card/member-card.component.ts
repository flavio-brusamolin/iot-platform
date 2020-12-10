import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

import { faTrashAlt, faUser, faEnvelope, faShieldAlt } from '@fortawesome/free-solid-svg-icons'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

import { CompleteMemberData } from 'src/app/data/models'

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

  @Input() public member!: CompleteMemberData
  @Output() public deleteMemberEvent = new EventEmitter()

  public constructor (private readonly modal: NgbModal) { }

  public ngOnInit (): void { }

  public openConfirmationModal (content: any): void {
    this.modal.open(content, { centered: true })
      .result.then(() => this.deleteMember())
  }

  private deleteMember (): void {
    this.deleteMemberEvent.emit()
  }
}
