import { Component, forwardRef, Input } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true
  }]
})
export class InputComponent implements ControlValueAccessor {
  @Input() public label!: string
  @Input() public name!: string
  @Input() public type!: string

  private propagateChange = (_: string): void => { }

  public registerOnChange (fn: any): void {
    this.propagateChange = fn
  }

  public updateValue (event: Event): void {
    this.propagateChange((<HTMLInputElement>event.target).value)
  }

  public writeValue (_: string): void { }
  public registerOnTouched (_: any): void { }
}
