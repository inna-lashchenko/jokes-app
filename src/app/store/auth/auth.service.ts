import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import {AppState} from '../store.interface';
import {logout} from './auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpirationTimer: any;

  constructor(
    private store: Store<AppState>
  ) {}

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}
