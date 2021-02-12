import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs/index';
import {Store} from '@ngrx/store';
import {takeUntil, map} from 'rxjs/internal/operators';

import {AppState} from '../../../store/store.interface';
import {authState} from '../../../store/store.selectors';
import {logout} from '../../../store/auth/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAlive: Subject<void> = new Subject();
  isAuthenticated: boolean;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select(authState)
      .pipe(
        takeUntil(this.isAlive.asObservable()),
        map(state => state.user))
      .subscribe(user => {
        this.isAuthenticated = !!user;
      });
  }

  ngOnDestroy() {
    this.isAlive.next();
    this.isAlive.complete();
  }

  onLogout() {
    this.store.dispatch(logout());
  }
}
