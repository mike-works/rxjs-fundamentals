import { Object as JSONObject } from 'json-typescript';
import { of, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, mergeAll } from 'rxjs/operators';
import { EventTargetLike } from 'rxjs/internal/observable/fromEvent';
import SynthEventTarget from '../../common/synth-event-target';

export function pictureUrl(path: string, width: number = 300) {
  return `https://image.tmdb.org/t/p/w${width}/${path}`;
}

export function multiSearch(term): Observable<JSONObject> {
  return of(
    ajax('/api/moviedb/search/movie/' + encodeURIComponent(term)),
    ajax('/api/moviedb/search/person/' + encodeURIComponent(term)),
    ajax('/api/moviedb/search/tv/' + encodeURIComponent(term))
  ).pipe(
    mergeAll(),
    map(x => x.response.results),
    mergeAll<JSONObject>(),
    map<JSONObject, JSONObject>(res => {
      if (typeof res.known_for !== 'undefined') {
        return { ...res, type: 'person' };
      } else if (typeof res.release_date !== 'undefined') {
        return { ...res, type: 'movie' };
      } else {
        return { ...res, type: 'tv' };
      }
    })
  );
}

export const synthSubmitSearch = new SynthEventTarget();
export const submitSearch: EventTargetLike =
  typeof window === 'undefined'
    ? synthSubmitSearch
    : (document.querySelector('.submit-search') as HTMLButtonElement);

export let synthSearchInputValue = '';
export function getSearchInputValue(): string {
  if (typeof window !== 'undefined') {
    let $el = document.querySelector<HTMLInputElement>('.search-input');
    if ($el === null) {
      throw new Error('No .search-input found');
    }
    return $el.value;
  } else {
    return synthSearchInputValue;
  }
}

export let synthSearchResults: string[] = [];
export function clearResults() {
  if (typeof window !== 'undefined') {
    let $el = document.querySelector<HTMLUListElement>('.results');
    if ($el === null) {
      throw new Error('No .results found');
    }
    $el.innerHTML = '';
  } else {
    synthSearchResults = [];
  }
}

export function setResults(results: string[]) {
  if (typeof window !== 'undefined') {
    let $el = document.querySelector<HTMLUListElement>('.results');
    if ($el === null) {
      throw new Error('No .results found');
    }
    $el.innerHTML = results.join('');
  } else {
    synthSearchResults = [...results];
  }
}
