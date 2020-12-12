import { Component, Input, OnInit } from '@angular/core'

import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

interface Tab {
  label: string
  destination: string
}

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
  @Input() public tabs?: Tab[]

  public constructor () { }

  public ngOnInit (): void { }
}
