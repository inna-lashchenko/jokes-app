import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, switchMap} from 'rxjs/operators';

import {JokesService} from '../../shared/services/jokes.service';
import {Joke} from '../../models/jokes.model';
import {setProgrammingJokes, getProgrammingJokes} from './programming-jokes.actions';


@Injectable()
export class ProgrammingJokesEffects {
  constructor(
    private actions: Actions,
    private jokesService: JokesService,
  ) {}

  getProgrammingJokes = createEffect(
    () => this.actions.pipe(
      ofType(getProgrammingJokes),
      switchMap(() => this.jokesService.getProgrammingJokes()),
      map((items: Joke[]) => setProgrammingJokes({ jokes: [...items]}))
    )
  );
}
