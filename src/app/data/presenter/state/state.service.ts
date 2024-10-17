import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ISTATE {
  estado: number;
  id_proceso: number;
  proceso: string;
}

@Injectable({
  providedIn: 'root',
})
export class StateManagerService {
  state: any = {
    estado: undefined,
    id_proceso: undefined,
    proceso: undefined,
  };
  private stateDataSubject = new BehaviorSubject<ISTATE>({} as ISTATE);
  stateData$ = this.stateDataSubject.asObservable();

  setState(data: any) {
    this.state = Object.assign({ ...this.state, ...data });
    this.stateDataSubject.next(this.state);
  }

  getState() {
    return this.stateDataSubject.getValue();
  }

  clearState() {
    this.stateDataSubject.next({} as ISTATE);
  }
}
