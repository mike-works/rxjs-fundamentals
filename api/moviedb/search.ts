import { Router as router } from 'express';
import fetch from 'node-fetch';

export default function(apiKey, { apiBase }) {
  const r = router();
  r.get('/movie/:query', async (req, resp) => {
    const { query, page } = req.params;
    let fetchResp = await fetch(
      `${apiBase}/search/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${encodeURIComponent(
        query
      )}`
    );
    if (!fetchResp.ok) {
      resp.status(500);
      resp.json({ error: `${await fetchResp.text()}` });
    } else {
      resp.json(await fetchResp.json());
    }
  });

  r.get('/tv/:query', async (req, resp) => {
    const { query, page } = req.params;
    let fetchResp = await fetch(
      `${apiBase}/search/tv?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${encodeURIComponent(
        query
      )}`
    );
    if (!fetchResp.ok) {
      resp.status(500);
      resp.json({ error: `${await fetchResp.text()}` });
    } else {
      resp.json(await fetchResp.json());
    }
  });

  r.get('/person/:query', async (req, resp) => {
    const { query, page } = req.params;
    let fetchResp = await fetch(
      `${apiBase}/search/person?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${encodeURIComponent(
        query
      )}`
    );
    if (!fetchResp.ok) {
      resp.status(500);
      resp.json({ error: `${await fetchResp.text()}` });
    } else {
      resp.json(await fetchResp.json());
    }
  });
  return r;
}
