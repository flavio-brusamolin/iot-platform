import { Component, OnInit } from '@angular/core'

import { NgxSpinnerService } from 'ngx-spinner'

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  public constructor (private readonly spinner: NgxSpinnerService) { }

  public ngOnInit (): void {
    this.spinner.show()
  }
}
