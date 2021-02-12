import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import {takeUntil} from 'rxjs/internal/operators';

import {AppState} from '../store/store.interface';
import {loginStart, signupStart} from '../store/auth/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoading = false;
  error: string = null;
  isAlive: Subject<void> = new Subject();

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.select('auth')
      .pipe(takeUntil(this.isAlive.asObservable()))
      .subscribe(authState => {
        this.isLoading = authState.loading;
        this.error = authState.authError;
      });
  }

  ngOnDestroy() {
    this.isAlive.next();
    this.isAlive.complete();
  }

  onSubmit(form: NgForm, isLogin: boolean): void {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    if (isLogin) {
      this.store.dispatch(loginStart({email, password}));
    } else {
      this.store.dispatch(signupStart({email, password}));
    }

    form.reset();
  }
}
