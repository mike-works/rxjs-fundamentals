import { Router as router } from 'express';
import fetch from 'node-fetch';

export default function(apiKey, { apiBase }) {
  const r = router();
  r.get('/:id', async (req, resp) => {
    const { id } = req.params;
    let url = `${apiBase}/movie/${encodeURIComponent(id)}?api_key=${apiKey}&language=en-US`;
    console.log('Looking up movie ', id, url);
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
