import { Injectable } from '@angular/core'

import { ToastrService } from 'ngx-toastr'

@Injectable()
export class NotificationService {
  public constructor (private readonly toastr: ToastrService) { }

  public success (title: string, message: string): void {
    this.toastr.success(message, title)
  }

  public error (title: string, message = 'Unexpected error'): void {
    this.toastr.error(message, title)
  }
}
