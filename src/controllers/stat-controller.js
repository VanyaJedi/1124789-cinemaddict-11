import Stat from "../components/stat.js";
import {render, replace} from "../util/manipulate-dom.js";
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {FilterChartType, getMoviesForChart} from "../util/filter.js";
import {generateGenresObject} from "../util/other.js";

const BAR_HEIGHT = 50;

export default class StatController {

  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._movies = moviesModel.getAllMovies();
    this._filteredMovies = moviesModel.getAllMovies();

    this._genreObject = null;

    this._allGenresArray = [];

    this._stateComponent = null;

    this._chartFilter = FilterChartType.ALL;
    this._chart = null;

    this.updateChart = this.updateChart.bind(this);
  }

  render() {
    const oldStateComponent = this._stateComponent;
    this._movies = this._moviesModel.getAllMovies();
    this._stateComponent = new Stat(this._movies);
    if (!oldStateComponent) {
      render(this._container, this._stateComponent);
    } else {
      replace(this._stateComponent, oldStateComponent);
    }
  }

  show() {
    this._chartFilter = FilterChartType.ALL;
    this.render();
    this.createChart();
    this._stateComponent.setFilterHandlers(this.updateChart);
    this._stateComponent.show();
  }

  hide() {
    this._stateComponent.hide();
  }

  createChart() {
    this._getAllGenres();
    const allGenres = this._allGenresArray;
    const genresNumbers = this._genresNumbers;
    const statisticCtx = this._stateComponent.getElement().querySelector(`.statistic__chart`);
    statisticCtx.height = BAR_HEIGHT * 5;
    const myChart = new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: allGenres,
        datasets: [{
          data: genresNumbers,
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

    this._chart = myChart;
  }

  updateChart(evt) {
    const filterType = evt.target.value;
    this._chartFilter = filterType;
    this._getAllGenres();
    this._chart.data.datasets[0].data = this._genresNumbers;
    this._chart.data.labels = this._allGenresArray;
    this._chart.update();
    this._stateComponent.updateMoviesData(this._filteredMovies);
  }

  _getAllGenres() {
    this._filteredMovies = getMoviesForChart(this._movies.filter((movie) => movie.watched), this._chartFilter);
    this._genreObject = generateGenresObject(this._filteredMovies);
    this._allGenresArray = Object.keys(this._genreObject);
    this._genresNumbers = Object.values(this._genreObject);
  }

}
