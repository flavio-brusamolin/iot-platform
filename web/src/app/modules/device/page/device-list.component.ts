import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Observable, of, Subject } from 'rxjs'
import { catchError, takeUntil } from 'rxjs/operators'
import { NotificationService } from 'src/app/core/services/notification.service'
import { DeviceCreation } from 'src/app/data/dtos'
import { Device } from 'src/app/data/models'
import { DeviceService } from 'src/app/data/services/device.service'

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {
  public readonly icons = {
    plus: faPlus
  }

  public devices$!: Observable<Device[] | null>
  public error$ = new Subject<boolean>();

  private unsub$ = new Subject<void>()

  public constructor (
    private readonly deviceService: DeviceService,
    private readonly notificationService: NotificationService
  ) { }

  public ngOnInit (): void {
    this.loadDevices()
  }

  public ngOnDestroy (): void {
    this.unsub$.next()
    this.unsub$.complete()
  }

  private loadDevices (): void {
    this.devices$ = this.deviceService
      .loadDevices('5fc1a13c385c6a0019b49566')
      .pipe(catchError(({ error: httpError }: HttpErrorResponse) => {
        console.error(httpError)

        this.notificationService.error('Error!', httpError.error)
        this.error$.next(true)

        return of(null)
      }))
  }

  public createDevice (collectionId: string, deviceData: DeviceCreation): void {
    this.deviceService.createDevice(collectionId, deviceData)
      .pipe(takeUntil(this.unsub$))
      .subscribe(() => this.loadDevices())
  }
}
