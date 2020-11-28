import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { faPlus } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-variable-list',
  templateUrl: './variable-list.component.html',
  styleUrls: ['./variable-list.component.css']
})
export class VariableListComponent implements OnInit {
  public readonly icons = {
    plus: faPlus
  }

  public deviceId: string

  public constructor (private readonly activatedRoute: ActivatedRoute) {
    this.deviceId = this.activatedRoute.snapshot.params.deviceId
  }

  public ngOnInit (): void { }
}
