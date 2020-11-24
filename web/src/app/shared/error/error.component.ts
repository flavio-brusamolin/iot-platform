import { Component, OnInit } from '@angular/core'

import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  public readonly icons = {
    error: faTimesCircle
  }

  public constructor () { }

  public ngOnInit (): void { }

  public retry (): void {
    window.location.reload()
  }
}
