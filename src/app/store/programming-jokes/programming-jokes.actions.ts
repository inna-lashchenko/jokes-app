import {createAction, props} from '@ngrx/store';

import {Joke} from '../../models/jokes.model';

export const getProgrammingJokes = createAction(
  '[Programming jokes] Get jokes'
);

export const setProgrammingJokes = createAction(
  '[Programming jokes] Set jokes',
  props<{
    jokes: Joke[]
  }>()
);

export const updateProgrammingJokesFavorite = createAction(
  '[Programming jokes] Update favorite jokes',
  props<{
    jokeId: number
  }>()
);

export const programmingJokeAddComment = createAction(
  '[Programming jokes] Add comment',
  props<{
    jokeId: number,
    comment: string
  }>()
);

export const programmingJokeDeleteComment = createAction(
  '[Programming jokes] Delete comment',
  props<{
    jokeId: number
  }>()
);
