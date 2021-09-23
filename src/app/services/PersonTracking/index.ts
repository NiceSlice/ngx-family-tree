import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PersonModel } from 'src/app/data';

@Injectable({
  providedIn: 'root',
})
export class PersonTracking {
  public changeInfoObservable = new Subject<Partial<PersonModel>>();
  public addNewObservable = new Subject<[Partial<PersonModel>, string]>();
  public selectObservable = new Subject<number>();

  public changeInfo(info: Partial<PersonModel>) {
    this.changeInfoObservable.next(info);
  }
  public addNew(info: Partial<PersonModel>, role: string) {
    this.addNewObservable.next([info, role]);
  }

  public select(id: number) {
    this.selectObservable.next(id);
  }
}
