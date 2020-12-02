import { HttpErrorResponse } from '@angular/common/http'
import { Component, Input, OnInit } from '@angular/core'

import { faEllipsisV, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { NotificationService } from 'src/app/core/services/notification.service'
import { DeviceCreationData } from 'src/app/data/dtos'
import { Device } from 'src/app/data/models'
import { DeviceService } from 'src/app/data/services/device.service'

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

  private unsub$ = new Subject<void>()

  public constructor (
    private readonly deviceService: DeviceService,
    private readonly notificationService: NotificationService
  ) { }

  public ngOnInit (): void { }

  public updateDevice (deviceId: string, updateData: Partial<DeviceCreationData>): void {
    this.deviceService.updateDevice(deviceId, updateData)
      .pipe(takeUntil(this.unsub$))
      .subscribe(
        () => {
          this.notificationService.success('Very well!', 'Collection successfully created')
        },
        ({ error: httpError }: HttpErrorResponse) => {
          console.error(httpError)
          this.notificationService.error('Error!', httpError.error)
        }
      )
  }
}
