import { Component, OnInit } from '@angular/core'
import { faCircle, faEllipsisV, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-broker-card',
  templateUrl: './broker-card.component.html',
  styleUrls: ['./broker-card.component.css']
})
export class BrokerCardComponent implements OnInit {
  public readonly icons = {
    circle: faCircle,
    options: faEllipsisV,
    info: faInfoCircle
  }

  constructor () { }

  ngOnInit (): void {
  }
}
