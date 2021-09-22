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

  public _people = [new PersonModel(0, 'Name', 'female')];
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
      this._personTracking.addNewObservable.subscribe(info => {
        this._addPerson(info);
      }),
      this._personTracking.selectObservable.subscribe(id => {
        this._selectPerson(id);
      }),
    );
    this._getData();
  }

  public _changeInfo(info: any) {
    this._people.map(person => {
      if (person.id === info.id) Object.assign(person, info);
    });
    this._storeData();
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
      this._people.filter(person => selectedPerson?.fathersId?.includes(person.id)),
      this._people.filter(person => selectedPerson?.mothersId?.includes(person.id)),
      this._people.filter(person => selectedPerson?.childrenId?.includes(person.id)),
    ));
  }

  public _clear() {
    this._people = [new PersonModel(0, 'Name', 'female')];
    this._countId = 1;
    this._selectedId = 0;
    this._selectFamily();
    this._storeData();
  }

  private _storeData() {
    this._localStorage.setItem('familyTree', JSON.stringify(this._people));
    this._localStorage.setItem('familyTreeCountId', String(this._countId));
    this._localStorage.setItem('familyTreeSelected', String(this._selectedId));
  }

  private _getData() {
    const familyTree = this._localStorage.getItem('familyTree');
    const familyTreeCountId = this._localStorage.getItem('familyTreeCountId');
    const familyTreeSelected = this._localStorage.getItem('familyTreeSelected');
    if (familyTree !== null && familyTreeCountId !== null && familyTreeSelected !== null) {
      this._people = JSON.parse(familyTree);
      this._countId = Number(familyTreeCountId);
      this._selectedId = Number(familyTreeSelected);
    }
    this._selectFamily();
  }

  public ngOnDestroy() {
    for (const subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
  }
}
