import { Component, OnInit } from '@angular/core'
import { CollectionService } from 'src/app/data/services/collection.service'

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.css']
})
export class CollectionListComponent implements OnInit {
  public collections: any

  public constructor (
    private readonly collectionService: CollectionService
  ) {
    this.collections = []
  }

  public ngOnInit (): void {
    this.loadCollections()
  }

  private loadCollections () {
    this.collectionService.loadPlans().subscribe(collection => {
      this.collections = collection
    })
  }
}
