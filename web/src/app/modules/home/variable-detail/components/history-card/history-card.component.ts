import { Component, Input, OnChanges, OnInit } from '@angular/core'

import { faHistory, faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import * as dayjs from 'dayjs'

import { Data } from 'src/app/data/models'

interface Sample {
  value: number,
  date: string
}

@Component({
  selector: 'app-history-card',
  templateUrl: './history-card.component.html',
  styleUrls: ['./history-card.component.css']
})
export class HistoryCardComponent implements OnInit, OnChanges {
  public readonly icons: any = {
    history: faHistory,
    data: faLocationArrow
  }

  @Input() public data?: Data[]

  public history?: Sample[]

  public constructor () { }

  public ngOnInit (): void { }

  public ngOnChanges (): void {
    this.mapHistorySamples()
  }

  private mapHistorySamples (): void {
    const HISTORY_SIZE = 7

    this.history = this.data?.reverse()
      .slice(0, HISTORY_SIZE)
      .map(({ value, timestamp }) => ({
        value,
        date: dayjs(timestamp).format('MMM DD, HH:mm')
      }))
  }
}
