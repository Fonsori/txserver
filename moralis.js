// @ts-check
// const { EvmApi } = require('@moralisweb3/evm-api').default;
// const Bottleneck = require('bottleneck').default;
// const { EvmChain } = require('@moralisweb3/common-evm-utils');
// "@moralisweb3/common-core": "^2.10.0",
// "@moralisweb3/common-evm-utils": "^2.10.0",
// "@moralisweb3/evm-api": "^2.10.0",

// const start = (async () => {
//     await EvmApi.start({
//         apiKey: MORALIS_API_KEY,
//     });
// })();

// API Limmitter
// const weight = 3 / 25;
// const MAX_CONCURRENT = 5;
// const moralisLimiter = new Bottleneck({
//     minTime: weight * 1000,
//     maxConcurrent: MAX_CONCURRENT,
// });
// const getTxByHashMoralis = moralisLimiter.wrap(getTxByHash);

// async function getTxByHash(hash) {
//     try {
//         const transactionRes = await EvmApi.transaction.getTransaction({
//             transactionHash: hash,
//             chain,
//         });
//         return transactionRes?.result;
//     } catch (e) {
//         console.log(e);
//         return;
//     }
// }

// Config
const MORALIS_API_KEY = process.env.API_KEY ?? '';
if (!MORALIS_API_KEY?.length) throw new Error('Moralis API Key not found');

const API_URL = 'https://deep-index.moralis.io/api/v2/';

async function getTxByHash(hash) {
    const res = await fetch(`${API_URL}transaction/${hash}`, {
        headers: {
            Accept: '*/*',
            'X-API-Key': MORALIS_API_KEY,
            'Content-Type': 'application/json',
        },
    });
    const result = await res.json();
    return result;
}

module.exports = { getTxByHash };
