
const urlParams = new URLSearchParams(window.location.search);
const redirectResult = urlParams.get('redirectResult');

if (redirectResult) {
    getPaymentDetails(decodeURI(redirectResult)).then(result => {
        if (result.resultCode == "Authorised") {
            document.getElementById("paymentSuccess").style.display = "block";
        } else {
            document.getElementById("paymentFailure").style.display = "block";
        }
    });
} else {
    window.location.href = '/400.html';
}

