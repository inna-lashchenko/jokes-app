import {Action, createReducer, on} from '@ngrx/store';

import * as ProgrammingJokesActions from './programming-jokes.actions';
import {JokesState} from '../store.interface';

const initialState: JokesState = {
  jokes: [],
  isLoading: false
};

const reducer = createReducer(
  initialState,
  on(ProgrammingJokesActions.getProgrammingJokes, (state: JokesState) => (
    {
      ...state,
      isLoading: true
    }
  )),
  on(ProgrammingJokesActions.setProgrammingJokes, (state: JokesState, {jokes}) => (
    {
      ...state,
      isLoading: false,
      jokes: [...state.jokes, ...jokes]
    }
  )),
  on(ProgrammingJokesActions.updateProgrammingJokesFavorite, (state: JokesState, {jokeId}) => (
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
  on(ProgrammingJokesActions.programmingJokeAddComment, (state: JokesState, {jokeId, comment}) => (
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
  on(ProgrammingJokesActions.programmingJokeDeleteComment, (state: JokesState, {jokeId}) => (
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

export function programmingJokesReducer(state: JokesState, action: Action) {
  return reducer(state, action);
}
