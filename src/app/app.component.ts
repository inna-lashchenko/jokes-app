import {Component, OnInit} from '@angular/core';
import {getProgrammingJokes} from './store/programming-jokes/programming-jokes.actions';
import {getRandomJokes} from './store/random-jokes/random-jokes.actions';
import {Store} from '@ngrx/store';
import {AppState} from './store/store.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(getRandomJokes());
    this.store.dispatch(getProgrammingJokes());
  }
}
