import { Component, Input } from '@angular/core';
import { PersonModel } from 'src/app/data';
import { PersonTracking } from 'src/app/services';

@Component({
  selector: 'ngx-person',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
})
export class PersonComponent {
  @Input()
  public person?: PersonModel;
  @Input()
  public selected = false;
  public _editable = false;

  constructor(private _personTracking: PersonTracking) {}

  public _changeInfo(info: any) {
    this._personTracking.changeInfo({ id: this.person?.id, ...info });
  }

  public _addPerson(info: any) {
    const sex = info.role === 'father' || info.role === 'son' ? 'male' : 'female';
    this._personTracking.addNew({ sex, ...info });
  }
}
