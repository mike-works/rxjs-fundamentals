import { fromEvent } from 'rxjs';
import { filter, map, toArray } from 'rxjs/operators';
import {
  clearResults,
  getSearchInputValue,
  multiSearch,
  setResults,
  submitSearch
} from './fixtures';

fromEvent(submitSearch, 'click').subscribe(() => {
  multiSearch(getSearchInputValue())
    .pipe(filter(x => x.type === 'movie'), toArray())
    .subscribe(item => {
      clearResults();
      setResults(item.map(i => `<li>${i.name || i.title} (${i.type})</li>`));
    });
});
