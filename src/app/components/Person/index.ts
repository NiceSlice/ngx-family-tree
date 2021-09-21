import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-person',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
})
export class PersonComponent {
  @Input()
  public id?: number;
  @Input()
  public name?: string;

  public selected = true;

  @Output()
  public changeInfo = new EventEmitter<any>();
  @Output()
  public addPerson = new EventEmitter<any>();

  public _editable = false;

  public _changeInfo(info: any) {
    this.changeInfo.emit({ id: this.id, ...info });
  }

  public _addPerson(info: any) {
    this.addPerson.emit({ id: this.id, ...info });
  }
}
