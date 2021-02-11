import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Store} from '@ngrx/store';

import {Joke} from '../models/jokes.model';
import {AppState} from '../store/store.interface';
import {randomJokes, programmingJokes} from '../store/store.selectors';
import {Subject} from 'rxjs/index';
import {takeUntil} from 'rxjs/internal/operators';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProviderComponent implements OnInit, OnDestroy {
  isAlive: Subject<void> = new Subject();
  programmingJokes: Joke[];
  randomJokes: Joke[];
  isRandomLoading: boolean;
  isProgrammingLoading: boolean;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select(randomJokes)
      .pipe(takeUntil(this.isAlive.asObservable()))
      .subscribe(jokes => {
        this.randomJokes = jokes.jokes;
        this.isRandomLoading = jokes.isLoading;
      });

    this.store.select(programmingJokes)
      .pipe(takeUntil(this.isAlive.asObservable()))
      .subscribe(jokes => {
        this.programmingJokes = jokes.jokes;
        this.isProgrammingLoading = jokes.isLoading;
      });
  }

  ngOnDestroy() {
    this.isAlive.next();
    this.isAlive.complete();
  }
}
