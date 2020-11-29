import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Observable, of, Subject } from 'rxjs'
import { catchError, takeUntil } from 'rxjs/operators'

import { NotificationService } from 'src/app/core/services/notification.service'
import { DeviceCreationData } from 'src/app/data/dtos'
import { Device } from 'src/app/data/models'
import { DeviceService } from 'src/app/data/services/device.service'
import { Protocol } from 'src/app/data/enums'

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit, OnDestroy {
  public readonly icons = {
    plus: faPlus
  }

  public devices$!: Observable<Device[] | null>
  public error$ = new Subject<boolean>();

  private unsub$ = new Subject<void>()

  private collectionId: string
  public protocol = Protocol.MQTT // temporary

  public constructor (
    private readonly activatedRoute: ActivatedRoute,
    private readonly deviceService: DeviceService,
    private readonly notificationService: NotificationService
  ) {
    this.collectionId = this.activatedRoute.snapshot.params.collectionId
  }

  public ngOnInit (): void {
    this.loadDevices()
  }

  public ngOnDestroy (): void {
    this.unsub$.next()
    this.unsub$.complete()
  }

  private loadDevices (): void {
    this.devices$ = this.deviceService
      .loadDevices(this.collectionId)
      .pipe(catchError(({ error: httpError }: HttpErrorResponse) => {
        console.error(httpError)

        this.notificationService.error('Error!', httpError.error)
        this.error$.next(true)

        return of(null)
      }))
  }

  public createDevice (deviceData: DeviceCreationData): void {
    this.deviceService.createDevice(this.collectionId, deviceData)
      .pipe(takeUntil(this.unsub$))
      .subscribe(
        () => {
          this.notificationService.success('Very well!', 'Device successfully created')
          this.loadDevices()
        },
        ({ error: httpError }: HttpErrorResponse) => {
          console.error(httpError)
          this.notificationService.error('Error!', httpError.error)
        }
      )
  }
}
