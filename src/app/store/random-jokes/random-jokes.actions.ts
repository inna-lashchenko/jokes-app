import {createAction, props} from '@ngrx/store';

import {Joke} from '../../models/jokes.model';

export const getRandomJokes = createAction(
  '[Random jokes] Get jokes'
);

export const setRandomJokes = createAction(
  '[Random jokes] Set jokes',
  props<{
    jokes: Joke[]
  }>()
);

export const updateRandomJokesFavorite = createAction(
  '[Random jokes] Update favorite jokes',
  props<{
    jokeId: number
  }>()
);

export const randomJokeAddComment = createAction(
  '[Random jokes] Add comment',
  props<{
    jokeId: number,
    comment: string
  }>()
);

export const randomJokeDeleteComment = createAction(
  '[Random jokes] Delete comment',
  props<{
    jokeId: number
  }>()
);
