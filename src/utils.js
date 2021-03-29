const paymentMethodsConfig = {
    shopperReference: 'Checkout Components sample code test',
    reference: 'Natalia_checkoutChallenge',
    countryCode: 'NL',
    amount: {
        value: 1000,
        currency: 'EUR'
    }
};

// Fetches browser info
const collectBrowserInfo = () => {

    const screenWidth = window && window.screen ? window.screen.width : '';
    const screenHeight = window && window.screen ? window.screen.height : '';
    const colorDepth = window && window.screen ? window.screen.colorDepth : '';
    const userAgent = window && window.navigator ? window.navigator.userAgent : '';
    const javaEnabled = window && window.navigator ? navigator.javaEnabled() : false;

    let language = '';
    if (window && window.navigator) {
        language = window.navigator.language
            ? window.navigator.language
            : window.navigator.browserLanguage; // Else is for IE <+ 10
    }

    const d = new Date();
    const timeZoneOffset = d.getTimezoneOffset();

    const browserInfo = {
        screenWidth,
        screenHeight,
        colorDepth,
        userAgent,
        timeZoneOffset,
        language,
        javaEnabled,
    };

    return browserInfo;
};

const paymentsDefaultConfig = {
    shopperReference: 'Checkout Components sample code test',
    reference: 'Natalia_checkoutChallenge',
    countryCode: 'NL',
    channel: 'Web',
    origin: 'http://localhost:3000/',
    returnUrl: 'http://localhost:3000/paymentResult.html',
    browserInfo: collectBrowserInfo(),
    amount: {
        value: 1000,
        currency: 'EUR'
    },
    lineItems: [
        {
            id: '1',
            description: 'Test Item 1',
            amountExcludingTax: 10000,
            amountIncludingTax: 11800,
            taxAmount: 1800,
            taxPercentage: 1800,
            quantity: 1,
            taxCategory: 'High'
        }
    ]
};

// Generic POST Helper
const httpPost = (endpoint, data) =>
    fetch(`/${endpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json());

// Get all available payment methods from the local server
const getPaymentMethods = () =>
    httpPost('paymentMethods', paymentMethodsConfig)
        .then(response => {
            if (response.error) throw 'No paymentMethods available';

            return response;
        })
        .catch(console.error);

// Posts a new payment into the local server
const makePayment = (paymentMethod, dropin, config = {}) => {
    const paymentsConfig = { ...paymentsDefaultConfig, ...config };
    const paymentRequest = { ...paymentsConfig, ...paymentMethod };

    //updateRequestContainer(paymentRequest);

    return httpPost('payments', paymentRequest)
        .then(response => {
            if (response.error) throw 'Payment initiation failed';
            if (response.action) {
                console.log(dropin);
                dropin.handleAction(response.action);
            }
            //updateResponseContainer(response);

            return response;
        })
        .catch(console.error);
};

// Fetches an originKey from the local server
const getOriginKey = () =>
    httpPost('originKeys')
        .then(response => {
            if (response.error || !response.originKeys) throw 'No originKey available';

            return response.originKeys[Object.keys(response.originKeys)[0]];
        })
        .catch(console.error);

// Fetches a clientKey from the 
const getClientKey = () =>
    httpPost('clientKeys')
        .then(response => {
            if (response.error || !response.clientKey) throw 'No clientKey available';

            return response.clientKey;
        })
        .catch(console.error);

// Fetch payment details by redirect result
const getPaymentDetails = (redirectResult) =>
    httpPost(
        'paymentDetails', 
        {
            'details': {
                'redirectResult': redirectResult
            }
        }
    )
    .then(response => {
        if (response.error) throw 'No paymentDetails available';
        //console.log(response);
        return response;
    })
    .catch(console.error);
