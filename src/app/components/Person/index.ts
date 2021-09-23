import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { PersonModel } from 'src/app/data';
import { PersonTracking } from 'src/app/services';

@Component({
  selector: 'ngx-person',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
})
export class PersonComponent implements OnChanges {
  @Input()
  public person?: PersonModel;
  @Input()
  public role?: string;
  @Input()
  public selected = false;
  public _editPersonTab = false;
  public _addPersonTab = false;
  @Output()
  public clickEvent = new EventEmitter<void>();

  constructor(private _personTracking: PersonTracking) {}

  public ngOnChanges(): void {
    this._editPersonTab = false;
    this._addPersonTab = false;
  }

  public _changeInfo(info: Partial<PersonModel>) {
    this._personTracking.changeInfo({ id: this.person?.id, ...info });
  }

  public _addPerson(info: Partial<PersonModel>, role: string, input: HTMLInputElement) {
    if (input.value.length) {
      input.value = '';
      this._personTracking.addNew(info, role);
    }
  }

  public _selectPerson() {
    if (!this.selected && this.person?.id !== undefined) {
      this._personTracking.select(this.person.id);
    }
  }

  public _toggleIsExpanded() {
    this.clickEvent.emit();
  }
}
