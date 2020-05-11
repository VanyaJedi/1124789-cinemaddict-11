import Menu from "../components/menu.js";
import {render, replace} from "../util/manipulateDOM.js";
import {FilterType} from "../util/filter.js";

export default class FilterController {

  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._movies = moviesModel.getAllMovies();
    this._activeFilterType = FilterType.ALL;
    this._menuComponent = null;

    this._changeViewHandler = null;

    this._onFilterChange = this._onFilterChange.bind(this);
    this._onDataChangeHandler = this._onDataChangeHandler.bind(this);
    this._moviesModel.addDataChangeHandler(this._onDataChangeHandler);
  }

  render() {
    const oldFilmComponent = this._menuComponent;
    this._menuComponent = new Menu(this._movies, this._activeFilterType);
    this._menuComponent.setFilterChangeHandler(this._onFilterChange);
    if (!oldFilmComponent) {
      render(this._container, this._menuComponent);
    } else {
      replace(this._menuComponent, oldFilmComponent);
    }
  }

  updateComponent() {
    this._onDataChangeHandler();
  }

  _onDataChangeHandler() {
    this._movies = this._moviesModel.getAllMovies();
    this.render();
    this.setViewChangeHandler(this._changeViewHandler);
  }

  _onFilterChange(filterType) {
    this._moviesModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  setViewChangeHandler(handler) {
    this._changeViewHandler = handler;
    const showStatBtn = this._menuComponent._element.querySelector(`.main-navigation__additional`);
    showStatBtn.addEventListener(`click`, handler);
  }

}
