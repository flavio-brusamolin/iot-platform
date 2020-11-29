import { Component, Input, OnInit } from '@angular/core'
import { Variable } from 'src/app/data/models'

@Component({
  selector: 'app-variable-card',
  templateUrl: './variable-card.component.html',
  styleUrls: ['./variable-card.component.css']
})
export class VariableCardComponent implements OnInit {
  @Input() public variable!: Variable

  public constructor () { }

  public ngOnInit (): void { }
}
