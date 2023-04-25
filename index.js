const data = []

function onScanSuccess(decodedText, decodedResult) {
    document.getElementsByTagName('p')[0].innerText += decodedResult
    if (data.includes(decodedResult)) return
    data.push(decodedResult)
}
var html5QrcodeScanner = new Html5QrcodeScanner(
    "qr-reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess);


function downloadCSV() {
    csv = 'data:text/csv;charset=utf-8,' + data.toString(); //Creates CSV File Format
    excel = encodeURI(csv); //Links to CSV 

    link = document.createElement('a');
    link.setAttribute('href', excel); //Links to CSV File 
    link.setAttribute('download', 'test.csv'); //Filename that CSV is saved as
    link.click();
}