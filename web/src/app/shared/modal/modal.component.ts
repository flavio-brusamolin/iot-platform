import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() public modalTitle!: string
  @Input() public canContinue!: boolean

  @Output() closeEmitter = new EventEmitter()
  @Output() continueEmitter = new EventEmitter()

  public constructor () { }

  public ngOnInit (): void { }
}
