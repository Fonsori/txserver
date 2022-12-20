// @ts-check
const express = require('express');
// const { json, urlencoded } = require('express');
// const cookieParser = require('cookie-parser');
const { getTxByHash } = require('./moralis');

const app = express();

const KEY = process.env.KEY ?? '';
if (!KEY?.length) throw new Error('Server API Key not found');

// app.use(logger('dev'));
// app.use(json());
// app.use(urlencoded({ extended: false }));
// app.use(cookieParser());

app.get('/helth', function (req, res, next) {
    res.sendStatus(200);
});

app.get('/api/tx/:hash', async (req, res) => {
    const key = req.get('key');
    if (key !== KEY) {
        // log the ip address of the request
        console.log('Unauthroized request', req.ip);

        return res.sendStatus(401);
    }

    const { hash } = req.params;
    try {
        const tx = await getTxByHash(hash);
        res.json(tx);
    } catch (e) {
        // if (e.isMoralisError && e?.details?.status === 429) {
        if (e === 429) {
            // console.log('ratelimited');
            return res.sendStatus(429);
        }
        res.sendStatus(500);
        console.error(e);
    }
});

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
