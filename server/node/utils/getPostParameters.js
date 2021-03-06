const { CHECKOUT_APIKEY, CHECKOUT_URL, MERCHANT_ACCOUNT } = require('./config');

module.exports = (endpoint, request) => {
    const body = JSON.stringify({
        merchantAccount: MERCHANT_ACCOUNT,
        ...request
    });

    const params = {
        url: `${CHECKOUT_URL}/${endpoint}`,
        body,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(body, 'utf8'),
            'X-Api-Key': CHECKOUT_APIKEY
        }
    };
    console.log(params);
    return params;
};
