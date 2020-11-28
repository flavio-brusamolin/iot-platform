import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { Collection } from 'src/app/data/models'

@Component({
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html',
  styleUrls: ['./collection-card.component.css']
})
export class CollectionCardComponent implements OnInit {
  @Input() public collection!: Collection

  public constructor (
    private readonly router: Router
  ) { }

  public ngOnInit (): void { }

  public navigateToDevice (collectionId: string): void {
    this.router.navigate(['/collections/', collectionId])
  }
}
