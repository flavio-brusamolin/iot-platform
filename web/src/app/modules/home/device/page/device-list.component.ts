import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { faPlus, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { forkJoin, Observable, of, Subject } from 'rxjs'
import { catchError, map, takeUntil } from 'rxjs/operators'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { NgOption } from '@ng-select/ng-select'

import { NotificationService } from 'src/app/core/services/notification.service'
import { DeviceCreationData } from 'src/app/data/dtos'
import { Collection, Device } from 'src/app/data/models'
import { DeviceService } from 'src/app/data/services/device.service'
import { Protocol } from 'src/app/data/enums'
import { BrokerService } from 'src/app/data/services/broker.service'
import { CollectionService } from 'src/app/data/services/collection.service'

interface PageData {
  collection: Collection
  devices: Device[]
  brokers: NgOption[]
}

export interface MergedDeviceData extends Omit<Device, 'mqttInfo'> {
  mqttInfo: {
    topic?: string
    brokerName?: string
  }
}

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit, OnDestroy {
  public readonly icons = {
    plus: faPlus,
    warning: faExclamationTriangle
  }

  private collectionId: string

  public createDeviceForm!: FormGroup
  public updateDeviceForm!: FormGroup

  public pageData$!: Observable<PageData | null>
  public error$ = new Subject<boolean>();

  private unsub$ = new Subject<void>()

  public protocols: NgOption[] = Object.values(Protocol).map(protocol => ({
    label: protocol.toUpperCase(),
    value: protocol
  }))

  public constructor (
    private readonly formBuilder: FormBuilder,
    private readonly modal: NgbModal,
    private readonly activatedRoute: ActivatedRoute,
    private readonly collectionService: CollectionService,
    private readonly deviceService: DeviceService,
    private readonly brokerService: BrokerService,
    private readonly notificationService: NotificationService
  ) {
    this.collectionId = this.activatedRoute.snapshot.params.collectionId
  }

  public ngOnInit (): void {
    this.initializeForms()
    this.loadData()
  }

  public ngOnDestroy (): void {
    this.unsub$.next()
    this.unsub$.complete()
  }

  private initializeForms (): void {
    this.createDeviceForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      protocol: [null, Validators.required],
      mqttInfo: this.formBuilder.group({
        topic: ['', Validators.required],
        brokerId: [null, Validators.required]
      })
    })

    this.updateDeviceForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      protocol: [null, Validators.required],
      mqttInfo: this.formBuilder.group({
        topic: ['', Validators.required],
        brokerId: [null, Validators.required]
      })
    })
  }

  private loadData (): void {
    this.pageData$ = forkJoin([
      this.collectionService.loadCollectionById(this.collectionId),
      this.deviceService.loadDevices(this.collectionId),
      this.brokerService.loadBrokers()
    ]).pipe(
      map(([collection, devices, brokers]) => ({
        collection,
        devices,
        brokers: brokers.map(({ name, id }) => ({
          label: name,
          value: id
        }))
      })),
      catchError(({ error: httpError }: HttpErrorResponse) => {
        console.error(httpError)

        this.notificationService.error('Error!', httpError.error)
        this.error$.next(true)

        return of(null)
      })
    )
  }

  public openCreateDeviceModal (content: any): void {
    this.modal.open(content, { centered: true })
      .result.then(
        () => {
          this.createDevice(this.createDeviceForm.value)
          this.createDeviceForm.reset()
        },
        () => this.createDeviceForm.reset()
      )
  }

  private createDevice (deviceData: DeviceCreationData): void {
    this.deviceService.createDevice(this.collectionId, deviceData)
      .pipe(takeUntil(this.unsub$))
      .subscribe(
        () => {
          this.notificationService.success('Very well!', 'Device successfully created')
          this.loadData()
        },
        ({ error: httpError }: HttpErrorResponse) => {
          console.error(httpError)
          this.notificationService.error('Error!', httpError.error)
        }
      )
  }

  public openUpdateDeviceModal (content: any, device: Device): void {
    this.updateDeviceForm.patchValue(device)

    this.modal.open(content, { centered: true })
      .result.then(
        () => {
          this.updateDevice(device.id, this.updateDeviceForm.value)
          this.updateDeviceForm.reset()
        },
        () => this.updateDeviceForm.reset()
      )
  }

  private updateDevice (deviceId: string, deviceData: Partial<DeviceCreationData>): void {
    this.deviceService.updateDevice(deviceId, deviceData)
      .pipe(takeUntil(this.unsub$))
      .subscribe(
        () => {
          this.notificationService.success('Very well!', 'Device successfully updated')
          this.loadData()
        },
        ({ error: httpError }: HttpErrorResponse) => {
          console.error(httpError)
          this.notificationService.error('Error!', httpError.error)
        }
      )
  }

  public mergeDeviceData ({ mqttInfo, ...device }: Device, brokers: NgOption[]): MergedDeviceData {
    const { label: brokerName }: any = brokers.find(({ value: brokerId }) => brokerId === mqttInfo?.brokerId)

    return {
      ...device,
      mqttInfo: {
        topic: mqttInfo?.topic,
        brokerName
      }
    }
  }
}
