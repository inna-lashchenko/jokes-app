import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class JokesService {
  constructor(private http: HttpClient) {}

  getRandomJokes() {
    return this.http.get('https://official-joke-api.appspot.com/random_ten');
  }

  getProgrammingJokes() {
    return this.http.get('https://official-joke-api.appspot.com/jokes/programming/ten');
  }
}
