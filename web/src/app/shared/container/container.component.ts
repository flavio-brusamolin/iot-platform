import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
 @Input() public name!: string
 @Input() public entityName!: string

 public constructor () { }

 public ngOnInit (): void { }
}
