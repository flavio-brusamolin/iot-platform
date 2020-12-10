import { Component, Input, OnInit } from '@angular/core'

import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  public readonly icons = {
    arrow: faChevronRight
  }

  @Input() public name!: string
  @Input() public complement?: string

  public constructor () { }

  public ngOnInit (): void { }
}
