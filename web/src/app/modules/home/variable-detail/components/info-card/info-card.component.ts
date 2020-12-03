import { Component, Input, OnInit } from '@angular/core'

import { faCircleNotch, faChartBar } from '@fortawesome/free-solid-svg-icons'
import { faArrowAltCircleUp, faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons'

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.css']
})
export class InfoCardComponent implements OnInit {
  public readonly icons: any = {
    current: faCircleNotch,
    max: faArrowAltCircleUp,
    min: faArrowAltCircleDown,
    average: faChartBar
  }

  @Input() public description!: string
  @Input() public symbol!: string
  @Input() public value?: string

  public constructor () { }

  public ngOnInit (): void { }
}
