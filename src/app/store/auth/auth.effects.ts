import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import * as AuthActions from './auth.actions';
import {User} from '../../models/user.model';
import {AuthService} from './auth.service';
import {AuthResponseData} from '../../models/auth.model';

const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  token: string
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return AuthActions.authenticateSuccess({ email, userId, token, expirationDate, redirect: true });
};

const handleError = (errorRes: any) => {
  const errorMessage = errorRes.error.error.message || 'An unknown error occurred!';
  return of(AuthActions.authenticateFail({errorMessage}));
};


@Injectable()
export class AuthEffects {

  authSignup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signupStart),
      switchMap(({email, password}) => {
        return this.http
          .post<AuthResponseData>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' +
            environment.firebaseAPIKey,
            {email, password, returnSecureToken: true
            }
          )
          .pipe(
            map(resData => {
              this.authService.setLogoutTimer(+resData.expiresIn * 1000);
              return handleAuthentication(
                +resData.expiresIn,
                resData.email,
                resData.localId,
                resData.idToken
              );
            }),
            catchError(errorRes => {
              return handleError(errorRes);
            })
          );
      })
    )
  );


  authLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginStart),
      switchMap(({email, password}) => {
        return this.http
          .post<AuthResponseData>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
            environment.firebaseAPIKey,
            {email, password, returnSecureToken: true
            }
          )
          .pipe(
            map(resData => {
              this.authService.setLogoutTimer(+resData.expiresIn * 1000);
              return handleAuthentication(
                +resData.expiresIn,
                resData.email,
                resData.localId,
                resData.idToken
              );
            }),
            catchError(errorRes => {
              return handleError(errorRes);
            })
          );
      })
    )
  );


  authRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.authenticateSuccess),
      tap(action =>  action.redirect && this.router.navigate(['/']))
    ), { dispatch: false }
  );


  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      map(() => {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
          return { type: 'DUMMY' };
        }

        const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
          const expirationDuration =
            new Date(userData._tokenExpirationDate).getTime() -
            new Date().getTime();
          this.authService.setLogoutTimer(expirationDuration);
          return AuthActions.authenticateSuccess({
            email: loadedUser.email,
            userId: loadedUser.id,
            token: loadedUser.token,
            expirationDate: new Date(userData._tokenExpirationDate),
            redirect: false
          });
        }
        return { type: 'DUMMY' };
      })
    )
  );


  authLogout$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.clearLogoutTimer();
          localStorage.removeItem('userData');
          this.router.navigate(['/auth']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
