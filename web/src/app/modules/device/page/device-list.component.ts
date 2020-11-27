import { Component, OnInit } from '@angular/core'

import { faPlus } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {
  public readonly icons = {
    plus: faPlus
  }

  public constructor () { }

  public ngOnInit (): void { }
}
