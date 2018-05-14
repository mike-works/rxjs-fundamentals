import * as express from 'express';
import { MOVIEDB_V3_API_KEY } from '../../config';
import buildMovieRouter from './movie';
import buildPersonRouter from './person';
import buildSearchRouter from './search';
import buildTvRouter from './tv';

const MOVIEDB_HOST = 'https://api.themoviedb.org';
const MOVIEDB_NAMESPACE = '3';
const apiBase = `${MOVIEDB_HOST}/${MOVIEDB_NAMESPACE}`;

const r = express.Router();

r.use('/search', buildSearchRouter(MOVIEDB_V3_API_KEY, { apiBase }));
r.use('/movie', buildMovieRouter(MOVIEDB_V3_API_KEY, { apiBase }));
r.use('/tv', buildTvRouter(MOVIEDB_V3_API_KEY, { apiBase }));
r.use('/person', buildPersonRouter(MOVIEDB_V3_API_KEY, { apiBase }));

export default r;
