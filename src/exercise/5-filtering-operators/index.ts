import { fromEvent } from 'rxjs';
import { filter, toArray, map } from 'rxjs/operators';
import {
  getSearchInputValue,
  multiSearch,
  submitSearch,
  setResults,
  clearResults
} from './fixtures';

fromEvent(submitSearch, 'click').subscribe(() => {
  multiSearch(getSearchInputValue())
    .pipe(filter(x => x.type === 'movie'), toArray())
    .subscribe(item => {
      clearResults();
      setResults(item.map(i => `<li>${i.name || i.title} (${i.type})</li>`));
    });
});
