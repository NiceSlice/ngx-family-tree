import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonTracking {
  public changeInfoObservable = new Subject<any>();
  public addNewObservable = new Subject<any>();
  public selectObservable = new Subject<any>();

  public changeInfo(info: any) {
    this.changeInfoObservable.next(info);
  }
  public addNew(info: any) {
    this.addNewObservable.next(info);
  }

  public select(id: number) {
    this.selectObservable.next(id);
  }
}
