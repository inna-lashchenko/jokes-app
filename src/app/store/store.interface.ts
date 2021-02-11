import {ActionReducerMap} from '@ngrx/store';

import {Joke} from '../models/jokes.model';
import {randomJokesReducer} from './random-jokes/random-jokes.reducer';
import {programmingJokesReducer} from './programming-jokes/programming-jokes.reducer';

export interface JokesState {
  jokes: Joke[];
  isLoading: boolean;
}

export interface AppState {
  randomJokes: JokesState;
  programmingJokes: JokesState;
}

export const appReducer: ActionReducerMap<any> = {
  randomJokes: randomJokesReducer,
  programmingJokes: programmingJokesReducer
};
