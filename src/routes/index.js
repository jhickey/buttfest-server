import express from 'express';
import StatsD from 'node-statsd';
import sio from '../socket';

const statsdClient = new StatsD();

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ok: true});
});

router.post('/',  (req, res) => {
    const {temperature} = req.body;
    if (!temperature) {
        res.status(400);
        res.json({error: 'Invalid request'});
        return;
    }
    res.json({temperature});
    sio.io().emit('temperature', {temperature});
    statsdClient.gauge('grill_temp', temperature);
});

export default router;
