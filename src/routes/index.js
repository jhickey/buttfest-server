import express from 'express';
import StatsD from 'node-statsd';
import sio from '../socket';
import dogapi from 'dogapi';

const statsdClient = new StatsD();
const router = express.Router();

const {DATADOG_API_KEY, DATADOG_APP_KEY} = process.env;

dogapi.initialize({
  api_key: DATADOG_API_KEY,
  app_key: DATADOG_APP_KEY
});

const DEFAULT_TEMP_TYPE = 'ambient';

function getGraphs() {
  return new Promise((resolve, reject) => {
    dogapi.embed.getAll((err, data) => err ? reject(err) : resolve(data));
  });
}

router.get('/', (req, res) => {
  res.json({ok: true});
});

router.post('/temperature', (req, res) => {
  const {temperature, type = DEFAULT_TEMP_TYPE} = req.body;
  if (!temperature) {
    res.status(400);
    res.json({error: 'Invalid request'});
    return;
  }
  global.temperature = temperature;
  res.json({temperature, type});
  sio.io().emit('temperature', {temperature, type});
  statsdClient.gauge('grill_temp', temperature, [`type:${type}`]);
});

router.get('/monitors', async(req, res) => {
  try {
    const embeds = await getGraphs();
    res.json(embeds);
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({error: e.message});
  }
});

export default router;
