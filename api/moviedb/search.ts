import { Router as router } from 'express';
import fetch from 'node-fetch';

async function timeout(n: number) {
  return new Promise(res => setTimeout(res, n));
}

export default function(apiKey, { apiBase }) {
  const r = router();
  r.get('/movie/:query', async (req, resp) => {
    const { query, page } = req.params;
    let cancelRequest = false;
    let wait = 800 * Math.random();
    await timeout(wait);
    req.on('close', err => {
      cancelRequest = true;
    });
    if (cancelRequest) {
      return;
    }
    let url = `${apiBase}/search/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${encodeURIComponent(
      query
    )}`;
    console.log('Movie query: ', query, ' ', ' after ', wait);
    let fetchResp = await fetch(url);
    if (!fetchResp.ok) {
      resp.status(500);
      resp.json({ error: `${await fetchResp.text()}` });
    } else {
      resp.json(await fetchResp.json());
    }
  });

  r.get('/tv/:query', async (req, resp) => {
    const { query, page } = req.params;
    let cancelRequest = false;
    let wait = 800 * Math.random();
    await timeout(wait);
    req.on('close', err => {
      cancelRequest = true;
    });
    if (cancelRequest) {
      return;
    }
    let url = `${apiBase}/search/tv?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${encodeURIComponent(
      query
    )}`;
    console.log('TV query: ', query, ' ', ' after ', wait);
    let fetchResp = await fetch(url);
    if (!fetchResp.ok) {
      resp.status(500);
      resp.json({ error: `${await fetchResp.text()}` });
    } else {
      resp.json(await fetchResp.json());
    }
  });

  r.get('/person/:query', async (req, resp) => {
    const { query, page } = req.params;
    let cancelRequest = false;
    let wait = 800 * Math.random();
    await timeout(wait);
    req.on('close', err => {
      cancelRequest = true;
    });
    if (cancelRequest) {
      return;
    }
    let url = `${apiBase}/search/person?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${encodeURIComponent(
      query
    )}`;
    console.log('Person query: ', query, ' ', ' after ', wait);
    let fetchResp = await fetch(url);
    if (!fetchResp.ok) {
      resp.status(500);
      resp.json({ error: `${await fetchResp.text()}` });
    } else {
      resp.json(await fetchResp.json());
    }
  });
  return r;
}
