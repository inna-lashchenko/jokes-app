import {Action, createReducer, on} from '@ngrx/store';

import * as RandomJokesActions from './random-jokes.actions';
import {JokesState} from '../store.interface';

const initialState: JokesState = {
  jokes: [],
  isLoading: false,
};

const reducer = createReducer(
  initialState,
  on(RandomJokesActions.getRandomJokes, (state: JokesState) => (
    {
      ...state,
      isLoading: true
    }
  )),
  on(RandomJokesActions.setRandomJokes, (state: JokesState, {jokes}) => (
    {
      ...state,
      isLoading: false,
      jokes: [...state.jokes, ...jokes]
    }
)),
  on(RandomJokesActions.updateRandomJokesFavorite, (state: JokesState, {jokeId}) => (
    {
      ...state,
      jokes: state.jokes.map(joke => {
        if (joke.id === jokeId) {
          return {...joke, favorite: !joke.favorite};
        }
        return joke;
      })
    }
  )),
  on(RandomJokesActions.randomJokeAddComment, (state: JokesState, {jokeId, comment}) => (
    {
      ...state,
      jokes: state.jokes.map(joke => {
        if (joke.id === jokeId) {
          return {...joke, comment};
        }
        return joke;
      })
    }
  )),
  on(RandomJokesActions.randomJokeDeleteComment, (state: JokesState, {jokeId}) => (
    {
      ...state,
      jokes: state.jokes.map(joke => {
        if (joke.id === jokeId) {
          return {...joke, comment: ''};
        }
        return joke;
      })
    }
  )),
);

export function randomJokesReducer(state: JokesState, action: Action) {
  return reducer(state, action);
}
