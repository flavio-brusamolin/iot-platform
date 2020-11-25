import { Component, OnInit } from '@angular/core'

import { faDropbox } from '@fortawesome/free-brands-svg-icons'

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.css']
})
export class EmptyComponent implements OnInit {
  public readonly icons = {
    empty: faDropbox
  }

  public constructor () { }

  public ngOnInit (): void {}
}
