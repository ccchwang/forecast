export default class ForecastSelector {
  constructor(el) {
    this.el = el;
    this.currentlyShownSign = this.el.value;
    this.currentlyShownElement;
    this.forecasts = [].slice.call(document.getElementsByClassName('forecast-signs'));
    this.forecastsMap = {};
    this.init();
  }

  init() {
    this.cacheForecasts();
    this.addEvents();
  }

  cacheForecasts() {
    this.forecasts && this.forecasts.forEach(forecast => {
      let sign = forecast.dataset.sign;
      this.forecastsMap[sign] = forecast;

      if (sign === this.currentlyShownSign) {
        this.currentlyShownElement = forecast;
      }
    })
  }

  addEvents() {
    this.el.addEventListener('change', event => {
      let newValue = event.target.value;

      if (newValue !== this.currentlyShownSign) {
        this.currentlyShownElement && this.currentlyShownElement.classList.remove('show');

        this.currentlyShownSign = newValue;
        this.currentlyShownElement = this.forecastsMap[newValue];
        this.currentlyShownElement.classList.add('show');

        window.scrollTo(0,0);
      }
    })
  }
}
