import { Subscription } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { PersonModel, FamilyModel } from './data';
import { PersonTracking } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'ngx-family-tree';

  public _people = [new PersonModel(0, 'name', 'female')];
  private _countId = 1;
  private _selectedId = 0;
  public _selectedFamily = this._selectFamily();

  private _changeInfoSubscription?: Subscription;
  private _addPersonSubscription?: Subscription;

  constructor(private _personTracking: PersonTracking) {
    this._changeInfoSubscription = this._personTracking.changeInfoObservable.subscribe(info => {
      this._changeInfo(info);
    });
    this._addPersonSubscription = this._personTracking.addNewObservable.subscribe(info => {
      this._addPerson(info);
    });
  }

  public _changeInfo(info: any) {
    this._people.map(person => {
      if (person.id === info.id) Object.assign(person, info);
    });
  }

  public _addPerson(info: any) {
    const newPerson = new PersonModel(this._countId, info.name, info.sex);
    const selectedPerson = this._people.find(person => person.id === this._selectedId);
    this._countId++;

    if (info.role === 'father') {
      newPerson.childrenId?.push(this._selectedId);
      (selectedPerson as PersonModel).fathersId.push(newPerson.id);
    } else if (info.role === 'mother') {
      newPerson.childrenId?.push(this._selectedId);
      (selectedPerson as PersonModel).mothersId.push(newPerson.id);
    } else {
      selectedPerson?.sex === 'female' ? newPerson.mothersId.push(this._selectedId) : newPerson.fathersId.push(this._selectedId);
      selectedPerson?.childrenId?.push(newPerson.id);
    }

    this._people.push(newPerson);
    this._selectFamily();
  }

  private _selectFamily(): any {
    const selectedPerson = this._people.find(person => person.id === this._selectedId);
    return (this._selectedFamily = new FamilyModel(
      selectedPerson,
      this._people.filter(person => selectedPerson?.fathersId?.includes(person.id)),
      this._people.filter(person => selectedPerson?.mothersId?.includes(person.id)),
      this._people.filter(person => selectedPerson?.childrenId?.includes(person.id)),
    ));
  }

  public ngOnDestroy() {
    this._changeInfoSubscription?.unsubscribe();
    this._addPersonSubscription?.unsubscribe();
  }
}
