import { Component, OnInit } from '@angular/core'

import { faEllipsisV, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

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

  public constructor () { }

  public ngOnInit (): void { }
}
