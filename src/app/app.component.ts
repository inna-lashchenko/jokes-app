import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subject} from 'rxjs/index';
import {takeUntil} from 'rxjs/internal/operators';

import {getProgrammingJokes} from './store/programming-jokes/programming-jokes.actions';
import {getRandomJokes} from './store/random-jokes/random-jokes.actions';
import {AppState} from './store/store.interface';
import {autoLogin} from './store/auth/auth.actions';
import {authState} from './store/store.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isAlive: Subject<void> = new Subject();
  isAuthenticated: boolean;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(autoLogin());
    this.store.dispatch(getRandomJokes());
    this.store.dispatch(getProgrammingJokes());

    this.store.select(authState)
      .pipe(takeUntil(this.isAlive.asObservable()))
      .subscribe(state => this.isAuthenticated = !!state.user);
  }

  ngOnDestroy() {
    this.isAlive.next();
    this.isAlive.complete();
  }
}
