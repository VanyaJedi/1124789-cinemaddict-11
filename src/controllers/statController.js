import Stat from "../components/stat.js";
import {render, replace} from "../util/manipulateDOM.js";
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const BAR_HEIGHT = 50;

export default class StatController {

  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._movies = moviesModel.getAllMovies();

    this._allGenresArray = [];
    this._genresCount = [];

    this._stateComponent = null;
  }

  render() {
    const oldStateComponent = this._stateComponent;
    this._stateComponent = new Stat(this._movies);
    if (!oldStateComponent) {
      render(this._container, this._stateComponent);
    } else {
      replace(this._stateComponent, oldStateComponent);
    }
  }

  show() {
    this._movies = this._moviesModel.getAllMovies();
    this.render();
    this.createChart();
    this._stateComponent.show();
  }

  hide() {
    this._stateComponent.hide();
  }

  _getAllGenres() {
    this._allGenresArray = [];
    this._genresCount = [];
    this._movies.filter((movie) => movie.watched).forEach((movie) => {
      movie.genres.forEach((genre) => {
        if (!this._allGenresArray.includes(genre)) {
          this._allGenresArray.push(genre);
          this._genresCount.push(1);
        } else {
          this._genresCount[this._allGenresArray.indexOf(genre)]++;
        }
      });
    });
  }

  createChart() {
    this._getAllGenres();
    const allGenres = this._allGenresArray;
    const genresCount = this._genresCount;
    const statisticCtx = this._stateComponent._element.querySelector(`.statistic__chart`);
    // Обязательно рассчитайте высоту canvas, она зависит от количества элементов диаграммы
    statisticCtx.height = BAR_HEIGHT * 5;
    const myChart = new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: allGenres,
        datasets: [{
          data: genresCount,
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`,
          barThickness: 24
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20
            },
            color: `#ffffff`,
            anchor: `start`,
            align: `start`,
            offset: 40,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#ffffff`,
              padding: 100,
              fontSize: 20
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    });
  }

}
