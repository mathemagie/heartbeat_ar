

function showQRcode(url) {
  if (!('ontouchstart' in window)) {
    $("#QRcode").qrcode({
      size: 400,
      fill: '#000',
      text: url
    });
  } else {
    $("#QRcode").hide();
  }
}

function applyBpm(bpm) {
  var d=document.getElementById("heart");
  var dur;
  d.removeAttribute('animation');
  if (bpm < 60) {
     console.log('dur  => 800');
     dur = 800;
  }
  if (bpm >= 60 && bpm < 70) {
     console.log('dur  => 600');
      dur = 600;
  }
   if (bpm >= 70 && bpm < 80) {
      console.log('dur  => 500');
      dur = 500;
  }
    if (bpm >= 80 && bpm < 120) {
       console.log('dur  => 400');
        dur = 400;
  }
    if (bpm >= 120 ) {
       console.log('dur  => 400');
        dur = 400;
  }
  var anim = 'property: scale; dir: alternate-reverse; dur: ' + dur + ';loop: true; from: 0.05 0.05 0.05 ;to: 0.1 0.1 0.1';
  d.setAttribute('animation', anim);
}


var peak_detect_offset = 20;
var peak_mininum_interval = 300;

$(function () {
  var socket = io.connect('/'),
      pulse_data = [],
      totalPoints = 100,
      lastPeak = Date.now(),
      peakDiffs = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      freq = 0;

  var drawFinished = true;

  socket.on('url', function (url) {
    showQRcode(url + '/ar')
  })

  // on each pulse, detect the peaks and change heart animation
  var bpm = 0;
  socket.on('pulse', function (data) {
   // console.log("pulse", data)
    if (!drawFinished) {
      return;
    }
    drawFinished = false;

    pulse_data.push(data)
    pulse_data.shift();

    if (data > (pulse_data[totalPoints - 10] + peak_detect_offset)) {
      freq = Date.now() - lastPeak;
      // debounce
      if (freq > peak_mininum_interval) {
        lastPeak = Date.now();
        peakDiffs.push(freq);
        peakDiffs.shift();
        var heart_rate = parseInt(60 * 1000 / freq * 100 / 100, 10)
        // remove aberations
        if (heart_rate > 50 && heart_rate < 150) {
          bpm = heart_rate
          window.navigator.vibrate([100, 50, 100]);
          console.log("bpm", bpm)
          applyBpm(bpm)
        } else {
          //$('#heartrate').html("0");
        }
      }
    }
    drawFinished = true;
  });

  // pre-fill pulse_data with all zeroes
  while (pulse_data.length < totalPoints) {
    pulse_data.push(0);
  }

  var parse_data = function () {
    var res = [],
        min = max = pulse_data[0];

    for (var i = 0; i < pulse_data.length; ++i) {
      if (max < pulse_data[i]) { max = pulse_data[i]; }
      if (min < pulse_data[i]) { min = pulse_data[i]; }

      res.push([i, pulse_data[i] ])
    }

    return res;
  }


//  setup(y_min, y_max);
});
