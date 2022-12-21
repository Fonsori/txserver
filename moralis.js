// @ts-check

import fetch from 'node-fetch';

// Config
const MORALIS_API_KEY = process.env.API_KEY ?? '';
if (!MORALIS_API_KEY?.length) throw new Error('Moralis API Key not found');

const API_URL = 'https://deep-index.moralis.io/api/v2/';

export async function getTxByHash(hash) {
    const res = await fetch(`${API_URL}transaction/${hash}`, {
        headers: {
            Accept: '*/*',
            'X-API-Key': MORALIS_API_KEY,
            'Content-Type': 'application/json',
        },
    });
    if (res.status === 429) throw res.status;
    else if (res.status !== 200) throw await res.text();
    const result = await res.json();
    return result;
}

// module.exports = { getTxByHash };
