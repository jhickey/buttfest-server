import express from 'express';
import StatsD from 'node-statsd';
import sio from '../socket';

const statsdClient = new StatsD();
const router = express.Router();

const DEFAULT_TEMP_TYPE = 'ambient';

router.get('/', (req, res) => {
    res.json({ok: true});
});

router.post('/',  (req, res) => {
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

export default router;
