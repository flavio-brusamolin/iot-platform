import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

import { faEllipsisV, faInfoCircle, faEdit } from '@fortawesome/free-solid-svg-icons'

import { MergedDeviceData } from '../../page/device-list.component'

@Component({
  selector: 'app-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.css']
})
export class DeviceCardComponent implements OnInit {
  public readonly icons = {
    options: faEllipsisV,
    info: faInfoCircle,
    edit: faEdit
  }

  @Input() public device!: MergedDeviceData
  @Output() public updateDeviceEvent = new EventEmitter()

  public constructor () { }

  public ngOnInit (): void { }

  public updateDevice (): void {
    this.updateDeviceEvent.emit()
  }
}
