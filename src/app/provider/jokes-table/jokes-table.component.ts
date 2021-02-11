import {Component, Input} from '@angular/core';
import {Sort} from '@angular/material/sort';
import {Store} from '@ngrx/store';

import {Joke} from '../../models/jokes.model';
import {
  getProgrammingJokes,
  programmingJokeAddComment,
  programmingJokeDeleteComment,
  updateProgrammingJokesFavorite
} from '../../store/programming-jokes/programming-jokes.actions';
import {
  getRandomJokes,
  randomJokeAddComment,
  randomJokeDeleteComment,
  updateRandomJokesFavorite
} from '../../store/random-jokes/random-jokes.actions';
import {AppState} from '../../store/store.interface';

@Component({
  selector: 'app-jokes-table',
  templateUrl: './jokes-table.component.html',
  styleUrls: ['./jokes-table.component.scss']
})
export class JokesTableComponent {
  @Input() jokes: Joke[];
  @Input() isLoading: boolean;
  @Input() isRandom: boolean;

  columns = ['number', 'type', 'setup', 'punchline', 'comment', 'favorite', ];

  constructor(private store: Store<AppState>) { }

  updateFavorite(joke: Joke): void {
    if (this.isRandom) {
      return this.store.dispatch(updateRandomJokesFavorite({jokeId: joke.id}));
    }
    return this.store.dispatch(updateProgrammingJokesFavorite({jokeId: joke.id}));
  }

  sortData(sort: Sort): void {
    const isAsc = sort.direction === 'asc' ? 1 : -1;
    const arrayToSort = this.jokes.slice();
    this.jokes = arrayToSort.sort((a, b) => {
      if (a.type === a.type) return 0;
      return (a.type < b.type ? -1 : 1) * isAsc;
    });
  }

  saveComment(joke: Joke, comment: string): void {
    if (this.isRandom) {
      return this.store.dispatch(randomJokeAddComment({jokeId: joke.id, comment}));
    }
    return this.store.dispatch(programmingJokeAddComment({jokeId: joke.id, comment}));
  }

  deleteComment(joke: Joke): void {
    if (this.isRandom) {
      return this.store.dispatch(randomJokeDeleteComment({jokeId: joke.id}));
    }
    return this.store.dispatch(programmingJokeDeleteComment({jokeId: joke.id}));
  }

  checkActiveSave(prevComment: string, curComment: string): boolean {
    return !!prevComment !== !!curComment;
  }

  onLoadMoreJokes(): void {
    if (this.isRandom) {
      return this.store.dispatch(getRandomJokes());
    }
    return this.store.dispatch(getProgrammingJokes());
  }

}
