import { Router as router } from 'express';
import fetch from 'node-fetch';
import { MOVIEDB_V3_API_KEY } from '../../config';
import API_ROUTER from '../api-router';
import buildMovieRouter from './movie';
import buildPersonRouter from './person';
import buildSearchRouter from './search';
import buildTvRouter from './tv';

const MOVIEDB_HOST = 'https://api.themoviedb.org';
const MOVIEDB_NAMESPACE = '3';
const M = `${MOVIEDB_HOST}/${MOVIEDB_NAMESPACE}`;

const r = router();

r.use('/search', buildSearchRouter(MOVIEDB_V3_API_KEY, { apiBase: M }));
r.use('/movie', buildMovieRouter(MOVIEDB_V3_API_KEY, { apiBase: M }));
r.use('/tv', buildTvRouter(MOVIEDB_V3_API_KEY, { apiBase: M }));
r.use('/person', buildPersonRouter(MOVIEDB_V3_API_KEY, { apiBase: M }));

export default r;
