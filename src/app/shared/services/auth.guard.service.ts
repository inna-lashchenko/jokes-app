import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {Store} from '@ngrx/store';

import {authState} from '../../store/store.selectors';
import {AppState} from '../../store/store.interface';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private store: Store<AppState>) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              router: RouterStateSnapshot): | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.store.select(authState)
      .pipe(
        take(1),
        map(state => {
          return state.user;
        }),
        map(user => {
          const isAuth = !!user;
          if (isAuth) {
            return true;
          }
          return this.router.createUrlTree(['/auth']);
        })
      );
  }
}
