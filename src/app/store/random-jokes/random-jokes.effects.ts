import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, switchMap} from 'rxjs/operators';

import {JokesService} from '../../shared/services/jokes.service';
import {setRandomJokes, getRandomJokes} from './random-jokes.actions';
import {Joke} from '../../models/jokes.model';

@Injectable()
export class RandomJokesEffects {
  constructor(
    private actions: Actions,
    private jokesService: JokesService,
  ) {}

  getRandomJokes = createEffect(
    () => this.actions.pipe(
      ofType(getRandomJokes),
      switchMap(() => this.jokesService.getRandomJokes()),
      map((items: Joke[]) => setRandomJokes({ jokes: [...items]}))
    )
  );
}
