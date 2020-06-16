const imageAddress = 'https://apps.octavian.nl/static/img/sample.jpg';
const downloadSize = 13530000; //bytes

const restartButton = document.querySelector('.restart');

function progressMessage(msg) {
  if (console) {
    if (typeof msg === 'string') {
      console.log(msg);
    } else {
      for (let i = 0; i < msg.length; i++) {
        console.log(msg[i]);
      }
    }
  }

  const progress = document.querySelector('.speed-result');
  if (progress) {
    let currentHTML = (typeof msg === 'string') ? msg : msg.join('<br>');
    progress.innerHTML = currentHTML;
  }
}

function initSpeedDetection() {
  progressMessage('Loading...');
  restartButton.style.setProperty('display', 'none');
  window.setTimeout(measureConnectionSpeed, 1);
}

if (window.addEventListener) {
  window.addEventListener('load', initSpeedDetection, false);
} else if (window.attachEvent) {
  window.attachEvent('onload', initSpeedDetection);
}

function measureConnectionSpeed() {
  let startTime, endTime;
  let download = new Image();
  download.onload = function () {
    endTime = (new Date()).getTime();
    showResults();
  }
  
  download.onerror = function (err, msg) {
    progressMessage('Error downloading.');
  }
  
  startTime = (new Date()).getTime();
  let cacheDestroyer = '?id=' + startTime;
  download.src = imageAddress + cacheDestroyer;
  
  function showResults() {
    let duration = (endTime - startTime) / 1000;
    let bitsLoaded = downloadSize * 8;
    let speedBps = (bitsLoaded / duration).toFixed(1);
    let speedKbps = (speedBps / 1024).toFixed(1);
    let speedMbps = (speedKbps / 1024).toFixed(1);
    restartButton.style.setProperty('display', 'block');
    progressMessage([
      speedMbps + ' Mbps'
    ]);
  }
}
