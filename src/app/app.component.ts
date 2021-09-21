import { Component } from '@angular/core';
import { PersonModel } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ngx-family-tree';

  private _countId = 1;
  private _selectedId = 0; // TODO: only render selected and their direct family, have functions to change selected

  public _people = [new PersonModel(0, 'name', 'female')];

  public _changeInfo(info: any) {
    this._people.map(person => {
      if (person.id === info.id) Object.assign(person, info);
    });
  }

  public _addPerson(info: any) {
    const role = info.role;
    const id = info.id; // TODO: it's confusing that info is sending info for a new person but id for the selected person
    const newPerson = new PersonModel(this._countId, info.name, info.role === 'mother' || info.role === 'daughter' ? 'female' : 'male');
    this._people.push(newPerson);

    const selectedPerson = this._people.find(person => person.id === id);

    switch (role) {
      case 'father':
        newPerson.childrenId?.push(id);
        (selectedPerson as PersonModel).fatherId = this._countId;
        break;
      case 'mother':
        newPerson.childrenId?.push(id);
        (selectedPerson as PersonModel).motherId = this._countId;
        break;
      default:
        newPerson.childrenId?.push(id);
        selectedPerson?.sex === 'female'
          ? ((selectedPerson as PersonModel).motherId = this._countId)
          : ((selectedPerson as PersonModel).fatherId = this._countId);
    }

    this._countId++;
  }
}
