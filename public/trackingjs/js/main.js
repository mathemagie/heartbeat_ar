window.onload = function() {
  var video = document.getElementById("video")
  var canvas = document.getElementById("canvas")
  var context = canvas.getContext("2d")

  var tracker = new tracking.ObjectTracker("face")
  tracker.setInitialScale(4)
  tracker.setStepSize(2)
  tracker.setEdgesDensity(0.1)

  tracking.track("#video", tracker, { camera: true })

  var left, top, lastLeft, lastTop;
  var moveTreshold = 20;

  // when face detected, move the heart
  tracker.on("track", function(event) {
    context.clearRect(0, 0, canvas.width, canvas.height)

    event.data.forEach(function(rect) {
      context.strokeStyle = "#a64ceb"
      context.strokeRect(rect.x, rect.y, rect.width, rect.height)
      context.font = "11px Helvetica"
      context.fillStyle = "#fff"
      context.fillText("x: " + rect.x + "px", rect.x + rect.width + 5, rect.y + 11)
      context.fillText("y: " + rect.y + "px", rect.x + rect.width + 5, rect.y + 22)

      // prevent small moves
      left = Math.min(600, rect.x + (rect.width / 3 * 2));
      if (!lastLeft || (Math.abs(left - lastLeft) > moveTreshold)) {
        document.getElementById("heart").style.left = left + 'px';
        lastLeft = left;
      }
      top = Math.min(430, rect.y + rect.height + 50)
      if (!lastTop || (Math.abs(top - lastTop) > moveTreshold)) {
        document.getElementById("heart").style.top = top + "px";
        lastTop = top;
      }
    })
  })

  var gui = new dat.GUI()
  gui.add(tracker, "edgesDensity", 0.1, 0.5).step(0.01)
  gui.add(tracker, "initialScale", 1.0, 10.0).step(0.1)
  gui.add(tracker, "stepSize", 1, 5).step(0.1)

  // animate heart size based on bpm
  function applyBpm(bpm) {
    var d = document.getElementById("heart")
    var bpmdiv = document.getElementById("bpm")
    bpmdiv.innerHTML = bpm
    var size = 45
    //d.removeAttribute('animation');
    if (bpm < 60) {
      size *= 1.5
    }
    if (bpm >= 60 && bpm < 70) {
      size *= 1.8
    }
    if (bpm >= 70 && bpm < 80) {
      size *= 2.5
    }
    if (bpm >= 80 && bpm < 120) {
      size *= 2.8
    }
    if (bpm >= 120) {
      size *= 3
    }
    d.style.fontSize = size + "px"
    setTimeout(() => {
      d.style.fontSize = "45px"
    }, 100)
  }

  var peak_detect_offset = 20
  var peak_mininum_interval = 300

  var socket = io.connect("/"),
    pulse_data = [],
    totalPoints = 100,
    lastPeak = Date.now(),
    peakDiffs = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    freq = 0

  var drawFinished = true

  // on each pulse, try to detect a peak and make heart beat
  var bpm = 0
  socket.on("pulse", function(data) {
    //console.log("pulse", data)
    if (!drawFinished) {
      return
    }
    drawFinished = false

    pulse_data.push(data)
    pulse_data.shift()

    if (data > pulse_data[totalPoints - 10] + peak_detect_offset) {
      freq = Date.now() - lastPeak
      // debounce
      if (freq > peak_mininum_interval) {
        lastPeak = Date.now()
        peakDiffs.push(freq)
        peakDiffs.shift()
        var heart_rate = parseInt(60 * 1000 / freq * 100 / 100, 10)
        // remove aberations
        if (heart_rate > 50 && heart_rate < 150) {
          bpm = heart_rate
          window.navigator.vibrate([100, 50, 100])
          console.log("bpm", bpm)
          applyBpm(bpm)
        } else {
          //$('#heartrate').html("0");
        }
      }
    }
    drawFinished = true
  })

  // pre-fill pulse_data with all zeroes
  while (pulse_data.length < totalPoints) {
    pulse_data.push(0)
  }

  var parse_data = function() {
    var res = [], min = (max = pulse_data[0])

    for (var i = 0; i < pulse_data.length; ++i) {
      if (max < pulse_data[i]) {
        max = pulse_data[i]
      }
      if (min < pulse_data[i]) {
        min = pulse_data[i]
      }

      res.push([i, pulse_data[i]])
    }

    return res
  }
}