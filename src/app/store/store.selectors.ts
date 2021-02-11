import {createSelector} from '@ngrx/store';

import {AppState, JokesState} from './store.interface';

export const randomJokes = (state: AppState): JokesState => {
  return state.randomJokes;
};

export const programmingJokes = (state: AppState): JokesState => {
  return state.programmingJokes;
};

export const selectAllFavoriteJokes = createSelector(
  randomJokes,
  programmingJokes,
  (randomState: JokesState, programmingState: JokesState) => {
    const randomFav = randomState.jokes
      .filter(joke => joke.favorite)
      .map(item => {
        return {...item, isRandom: true};
      });

    const programmingFav = programmingState.jokes
      .filter(joke => joke.favorite)
      .map(item => {
        return {...item, isRandom: false};
      });

    return randomFav.concat(programmingFav);
  }
);
