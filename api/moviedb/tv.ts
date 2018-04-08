import { Router as router } from 'express';
import fetch from 'node-fetch';

export default function(apiKey, { apiBase }) {
  const r = router();
  r.get('/:id', async (req, resp) => {
    const { id } = req.params;
    let fetchResp = await fetch(
      `${apiBase}/movie/${encodeURIComponent(
        id
      )}?api_key=${apiKey}&language=en-US&page=1&include_adult=false}`
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
