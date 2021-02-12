import {ActionReducerMap} from '@ngrx/store';

import {Joke} from '../models/jokes.model';
import {randomJokesReducer} from './random-jokes/random-jokes.reducer';
import {programmingJokesReducer} from './programming-jokes/programming-jokes.reducer';
import {User} from '../models/user.model';
import {authReducer} from './auth/auth.reducer';
import {RandomJokesEffects} from './random-jokes/random-jokes.effects';
import {ProgrammingJokesEffects} from './programming-jokes/programming-jokes.effects';
import {AuthEffects} from './auth/auth.effects';

export interface JokesState {
  jokes: Joke[];
  isLoading: boolean;
}

export interface AuthState {
  user: User;
  authError: string;
  loading: boolean;
}

export interface AppState {
  randomJokes: JokesState;
  programmingJokes: JokesState;
  auth: AuthState;
}

export const appReducer: ActionReducerMap<any> = {
  randomJokes: randomJokesReducer,
  programmingJokes: programmingJokesReducer,
  auth: authReducer
};

export const appEffects = [
  RandomJokesEffects,
  ProgrammingJokesEffects,
  AuthEffects
];
