import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'

import { faEllipsisV, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Device } from 'src/app/data/models'

@Component({
  selector: 'app-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.css']
})
export class DeviceCardComponent implements OnInit {
  public readonly icons = {
    options: faEllipsisV,
    info: faInfoCircle
  }

  public updateForm!: FormGroup

  @Input() public device!: Device

  @Output() updateDeviceEmitter = new EventEmitter()

  public constructor (
    private formBuilder: FormBuilder,
    private modal: NgbModal
  ) { }

  public ngOnInit (): void {
    this.initializeForms()
  }

  private initializeForms (): void {
    this.updateForm = this.formBuilder.group({
      deviceName: [null],
      deviceTopic: [null]
    })
  }

  public openUpdationModal (content: any): void {
    this.modal.open(content, { centered: true })
      .result.then(
        () => {},
        () => {
          this.updateForm.reset()
        }
      )
  }
}
