import { Component, Input, OnInit } from '@angular/core'

import { faEllipsisV, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
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

  @Input() public device!: Device

  public constructor () { }

  public ngOnInit (): void { }
}