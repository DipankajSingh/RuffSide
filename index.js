// function onScanSuccess(decodedText, decodedResult) {
//     // handle the scanned code as you like, for example:
//     console.log(`Code matched = ${decodedText}`, decodedResult);
// }

// function onScanFailure(error) {
//     // handle scan failure, usually better to ignore and keep scanning.
//     // for example:
//     console.warn(`Code scan error = ${error}`);
// }

// let html5QrcodeScanner = new Html5QrcodeScanner(
//     "reader",
//     { fps: 10, qrbox: { width: 250, height: 250 } },
//     /* verbose= */ false);
// html5QrcodeScanner.render(onScanSuccess, onScanFailure);




// This method will trigger user permissions
// Html5Qrcode.getCameras().then(devices => {
//     /**
//      * devices would be an array of objects of type:
//      * { id: "id", label: "label" }
//      */
//     if (devices && devices.length) {
//       var cameraId = devices[0].id;
//       // .. use this to start scanning.
//     }
//   }).catch(err => {
//     // handle err
//   });
let scanCountElm = document.querySelector(".scanCount")
const video = document.querySelector(".camera")
let isScannig = false
const scanControl = document.querySelector('.scanControl')
let currentStream = null

const constraints = {
    audio: false,
    video: {
        width: {
            min: 1280,
            ideal: 1920,
            max: 2560,
        },
        height: {
            min: 720,
            ideal: 1080,
            max: 1440
        },
        facingMode: 'environment'
    }
};

scanControl.addEventListener("click", () => {

    scanCountElm.innerHTML = navigator.mediaDevices

    isScannig = !isScannig
    if (isScannig) {
        if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
            navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
                currentStream = stream
                video.srcObject = stream
                video.onloadedmetadata = () => {
                    video.play()

                }
            }).catch((resoan) => {
                console.log(resoan)
            })
        }
    }
    if (!isScannig) {
        let track = currentStream.getTracks()[0]

        if (track.readyState == 'live' && track.kind === 'video') {
            track.stop();
        }
    }
})

