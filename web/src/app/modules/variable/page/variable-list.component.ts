import { Component, OnInit } from '@angular/core'

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

  public constructor () { }

  public ngOnInit (): void { }
}
