import { fromEvent } from 'rxjs';
import { filter, map, toArray } from 'rxjs/operators';
import {
  clearResults, // Clear search results
  getSearchInputValue, // Get text entered into search field
  multiSearch, // Run a search
  setResults, // Set visible results on screen
  submitSearchButton // <button> user clicks for running a search
} from './fixtures';

fromEvent(submitSearchButton, 'click').subscribe(() => {
  multiSearch(getSearchInputValue())
    .pipe(filter(x => x.type === 'movie'), toArray())
    .subscribe(item => {
      clearResults();
      setResults(item.map(i => `<li>${i.name || i.title} (${i.type})</li>`));
    });
});
