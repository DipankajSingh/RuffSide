function onScanSuccess(decodedText, decodedResult) {
    document.getElementsByTagName('p')[0].innerText += decodedResult + "  " + decodedText
}
var html5QrcodeScanner = new Html5QrcodeScanner(
    "qr-reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess);
