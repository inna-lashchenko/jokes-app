import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs/index';
import {Store} from '@ngrx/store';
import {takeUntil} from 'rxjs/internal/operators';

import {Joke} from '../models/jokes.model';
import {AppState} from '../store/store.interface';
import {updateProgrammingJokesFavorite} from '../store/programming-jokes/programming-jokes.actions';
import {updateRandomJokesFavorite} from '../store/random-jokes/random-jokes.actions';
import {selectAllFavoriteJokes} from '../store/store.selectors';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {
  isAlive: Subject<void> = new Subject();
  jokes: Joke[] = [];
  columns = ['favorite', 'type', 'setup', 'punchline', 'comment'];

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select(selectAllFavoriteJokes)
      .pipe(takeUntil(this.isAlive.asObservable()))
      .subscribe(jokes => this.jokes = jokes);
  }

  ngOnDestroy() {
    this.isAlive.next();
    this.isAlive.complete();
  }

  deleteFromFavorites(joke: Joke): void {
    if (!joke.isRandom) {
      return this.store.dispatch(updateProgrammingJokesFavorite({jokeId: joke.id}));
    }
    return this.store.dispatch(updateRandomJokesFavorite({jokeId: joke.id}));
  }
}
