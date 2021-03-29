// 0. Get clientKey
getClientKey().then(clientKey => {
    getPaymentMethods().then(paymentMethodsResponse => {
        // 1. Create an instance of AdyenCheckout
        const checkout = new AdyenCheckout({
            environment: 'test',
            clientKey: clientKey, // Mandatory. clientKey from Customer Area
            allowPaymentMethods: ['scheme', 'ideal'],
            paymentMethodsResponse,
            onSubmit: (state, component) => {
                makePayment(state.data, component);
            },
            paymentMethodsConfiguration: {
                card: { // Example optional configuration for Cards
                  hasHolderName: true,
                  brands: ['mc','visa'],               
                  holderNameRequired: true,
                  enableStoreDetails: true,
                  hideCVC: false, // Change this to true to hide the CVC field for stored cards
                  name: 'Credit or debit card',
                  billingAddressRequired: true
                },
                ideal: { // Optional configuration for iDEAL
                    showImage: false, // Optional. Set to **false** to remove the bank logos from the iDEAL form.
                    issuer: "0031" // // Optional. Set this to an **id** of an iDEAL issuer to preselect it.
                }
              }
        });

        // 2. Create and mount the Component
        const dropin = checkout
            .create('dropin', {
                showStoredPaymentMethods: false
            })
            .mount('#dropin-container');
    });
});
