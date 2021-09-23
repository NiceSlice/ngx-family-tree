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
  public title = 'ngx-family-tree';

  public _people = [new PersonModel(0, 'name', 'female')];
  private _countId = 1;
  private _selectedId = 0;
  public _selectedFamily = this._selectFamily();
  private _subscriptions: Subscription[] = [];
  private _localStorage = window.localStorage;

  constructor(private _personTracking: PersonTracking) {
    this._subscriptions.push(
      this._personTracking.changeInfoObservable.subscribe(info => {
        this._changeInfo(info);
      }),
      this._personTracking.addNewObservable.subscribe(([info, role]) => {
        this._addPerson(info, role);
      }),
      this._personTracking.selectObservable.subscribe(id => {
        this._selectPerson(id);
      }),
    );
    this._getData();
  }

  public _changeInfo(info: Partial<PersonModel>) {
    this._people.map(person => {
      if (person.id === info.id) Object.assign(person, info);
    });
    this._storeData();
  }

  public _addPerson(info: Partial<PersonModel>, role: string) {
    const selectedPerson = this._people.find(person => person.id === this._selectedId);
    const newPerson = new PersonModel(this._countId, info.name as string, info.sex as string);
    this._countId++;

    if (role === 'parent') {
      newPerson.childrenId?.push(this._selectedId);
      (selectedPerson as PersonModel).parentsId.push(newPerson.id);
    } else {
      newPerson.parentsId?.push(this._selectedId);
      (selectedPerson as PersonModel).childrenId.push(newPerson.id);
    }

    this._people.push(newPerson);
    this._selectFamily();
    this._storeData();
  }

  private _selectPerson(id: number) {
    this._selectedId = id;
    this._selectFamily();
    this._storeData();
  }

  private _selectFamily(): any {
    const selectedPerson = this._people.find(person => person.id === this._selectedId);
    return (this._selectedFamily = new FamilyModel(
      selectedPerson,
      this._people.filter(person => selectedPerson?.parentsId?.includes(person.id)),
      this._people.filter(person => selectedPerson?.childrenId?.includes(person.id)),
    ));
  }

  public _clear() {
    this._people = [new PersonModel(0, 'name', 'female')];
    this._countId = 1;
    this._selectedId = 0;
    this._selectFamily();
    this._storeData();
  }

  private _storeData() {
    this._localStorage.setItem('familyTreeData', JSON.stringify({ people: this._people, countId: this._countId, selectedId: this._selectedId }));
  }

  private _getData() {
    const data = this._localStorage.getItem('familyTreeData');
    if (data !== null) {
      const parsedData = JSON.parse(data);
      this._people = parsedData.people;
      this._countId = parsedData.countId;
      this._selectedId = parsedData.selectedId;
    }
    this._selectFamily();
  }

  public ngOnDestroy() {
    for (const subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
  }
}
