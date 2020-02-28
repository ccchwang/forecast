export default class ForecastSelector {
  constructor(el) {
    this.el = el;
    this.isArchive = el.dataset.archive;
    this.currentlyShownSign = el.value;
    this.currentlyShownElement;
    this.forecasts = [].slice.call(document.getElementsByClassName('forecast-signs'));
    this.forecastsMap = {};

    if (!this.isArchive) {      
      this.header = document.getElementById("forecast-header");
      this.colors = {
        'Aries': '#ffcfcf',
        'Gemini': '#cfcbff',
        'Taurus': '#eaffc5',
        'Cancer': '#cdfdfb',
        'Leo': '#ffcfcf',
        'Virgo': '#eaffc5',
        'Libra': '#cfcbff',
        'Scorpio': '#cdfdfb',
        'Sagittarius': '#ffcfcf',
        'Capricorn': '#eaffc5',
        'Aquarius': '#cfcbff',
        'Pisces': '#cdfdfb',
      }
    }

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

        if (!this.isArchive) {
          this.header.style.background = this.colors[this.currentlyShownSign];
        }

        window.scrollTo(0,0);
      }
    })
  }
}
