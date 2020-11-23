import { Component, Input, OnInit } from '@angular/core'

import { Collection } from 'src/app/data/models'

@Component({
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html',
  styleUrls: ['./collection-card.component.css']
})
export class CollectionCardComponent implements OnInit {
  @Input() public collection!: Collection

  public constructor () { }

  public ngOnInit (): void { }
}
