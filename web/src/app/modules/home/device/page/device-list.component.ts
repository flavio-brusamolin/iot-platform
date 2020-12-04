import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Observable, of, Subject } from 'rxjs'
import { catchError, takeUntil } from 'rxjs/operators'

import { NotificationService } from 'src/app/core/services/notification.service'
import { DeviceCreationData } from 'src/app/data/dtos'
import { Broker, Device } from 'src/app/data/models'
import { DeviceService } from 'src/app/data/services/device.service'
import { Protocol } from 'src/app/data/enums'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { BrokerService } from 'src/app/data/services/broker.service'

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit, OnDestroy {
  public readonly icons = {
    plus: faPlus
  }

  public createDeviceForm!: FormGroup

  public devices$!: Observable<Device[] | null>
  public brokers$!: Observable<Broker[] | null>
  public error$ = new Subject<boolean>();

  private unsub$ = new Subject<void>()

  private collectionId: string
  public protocol = Protocol.MQTT // temporary

  public constructor (
    private formBuilder: FormBuilder,
    private modal: NgbModal,
    private readonly activatedRoute: ActivatedRoute,
    private readonly deviceService: DeviceService,
    private brokerService: BrokerService,
    private readonly notificationService: NotificationService
  ) {
    this.collectionId = this.activatedRoute.snapshot.params.collectionId
  }

  public ngOnInit (): void {
    this.loadDevices()
    this.initializeForms()
    this.loadBrokers()
  }

  private initializeForms (): void {
    this.createDeviceForm = this.formBuilder.group({
      name: [null, Validators.required],
      protocol: [null, Validators.required],
      mqttInfo: this.formBuilder.group({
        topic: [null, Validators.required],
        brokerId: [null, Validators.required]
      })

    })
  }

  public openCreateDeviceModal (content: any): void {
    this.modal.open(content, { centered: true })
      .result.then(
        () => {},
        () => {
          this.createDeviceForm.reset()
        }
      )
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

  private loadBrokers (): void {
    this.brokers$ = this.brokerService
      .loadBrokers()
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

  public updateDevice (device: Device, updateFormData: any): void {
    const updateData: Partial<Device> = { // Check if exists a better way to create avoiding null values
      name: updateFormData.deviceName,
      mqttInfo: {
        topic: updateFormData.deviceTopic,
        brokerId: '5fc7aab3091d8c0019dadd9f'
      }
    }
    this.deviceService.updateDevice(device.id, updateData)
      .pipe(takeUntil(this.unsub$))
      .subscribe(
        () => {
          this.notificationService.success('Very well!', 'Device successfully updated')
          this.loadDevices()
        },
        ({ error: httpError }: HttpErrorResponse) => {
          console.error(httpError)
          this.notificationService.error('Error!', httpError.error)
        }
      )
  }
}
