const $ = (selector) => document.querySelector(selector);
const speed = [0.1, 1, 5, 10];

const slider = (() => {
  let interval;
  let speedIdx = 0;

  return {
    setInterval: (newInterval) => {
      interval = newInterval;
    },
    getInterval: () => {
      return interval;
    },
    setSpeed: (idx) => {
      speedIdx = idx;
    },
    getSpeed: () => {
      return speedIdx;
    },
    increaseSlider: (sliderValue, speed) => {
      // value가 100 이상이면 초기화
      if (sliderValue >= 100) {
        slider.stop();
        $("#play").disabled = true;
        $("#faster").disabled = true;
      }
      sliderValue += speed;
      $("#slider").value = sliderValue;
      document.querySelector("#play").innerHTML = "Pause";
    },
    play: (speed) => {
      // pause 하고 play 눌렀을 때
      if (slider.getInterval()) {
        slider.pause();
        return;
      }
      // 처음 play 눌렀을 때
      const interval = setInterval(() => {
        let sliderValue = Number.parseFloat($("#slider").value);
        slider.increaseSlider(sliderValue, speed);
        slider.setTime(sliderValue);
        slider.setInterval(interval);
      }, 100);
    },
    pause: () => {
      slider.clearInterval();
      $("#play").innerHTML = "Play";
    },
    stop: () => {
      slider.pause();
      $("#slider").value = 0;
      $("#play").disabled = false;
      $("#faster").disabled = false;
      $("#time").innerHTML = "0";
    },
    clearInterval: () => {
      clearInterval(slider.getInterval());
      slider.setInterval();
    },
    setTime: (sliderValue) => {
      $("#time").innerHTML = sliderValue;
    },
  };
})();

// event
const clickEvents = {
  play: () => {
    slider.setSpeed(0);
    slider.play(speed[0]);
  },
  stop: () => {
    slider.stop();
    slider.setSpeed(0);
  },
  slider: () => {
    console.log($("#slider").value);
  },
  faster: () => {
    let speedIdx = slider.getSpeed();
    speedIdx = speedIdx + 1 > 3 ? 0 : speedIdx + 1;
    slider.setSpeed(speedIdx);
    slider.clearInterval();
    slider.play(speed[speedIdx]);
  },
};

$(".range-slider").addEventListener("click", (e) => {
  const target = e.target.id;
  if (target) {
    clickEvents[target]();
  }
});
