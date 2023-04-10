let scanCountElm = document.querySelector(".scanCount")
const video = document.querySelector(".camera")
let isScannig = false
const scanControl = document.querySelector('.scanControl')
let currentStream = null

let scanner = new Html5Qrcode('scanner');

const config = { fps: 10 };



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
    scanner.start({ facingMode: "environment" }, config, (text, result) => {
        console.log(text, result)
    });
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
        scanner.stop().then((ignore) => {
            console.log(ignore)
        }).catch((err) => {
            console.log(err)
        });
        if (track.readyState == 'live' && track.kind === 'video') {
            track.stop();
        }
    }
})

