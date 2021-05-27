import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageEmitterService {
  previousUrl;
  private emitChangeSource = new Subject<any>();
  changeEmitted$ = this.emitChangeSource.asObservable();
  constructor() {}

  emitChange(change: any) {
    this.emitChangeSource.next(change);
  }
}
