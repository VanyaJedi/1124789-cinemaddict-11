import AbstractComponent from "./abstractComponent.js";
import {sortTypes} from "../util/other.js";

export default class Sort extends AbstractComponent {

  constructor() {
    super();
    this._currentSort = `DEFAULT`;
  }

  getTemplate() {
    return (
      `<ul class="sort">
        <li><a href="#" data-sort-type = ${sortTypes.DEFAULT} class="sort__button sort__button--active">Sort by default</a></li>
        <li><a href="#" data-sort-type = ${sortTypes.BY_DATE} class="sort__button">Sort by date</a></li>
        <li><a href="#" data-sort-type = ${sortTypes.BY_RATE} class="sort__button">Sort by rating</a></li>
       </ul>`
    );
  }

  getSortType() {
    return this._currenSortType;
  }

  _removeActiveBtnClass() {
    const btnList = this._element.querySelectorAll(`.sort__button`);
    btnList.forEach((btn) => {
      btn.classList.remove(`sort__button--active`);
    });
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.classList.contains(`sort__button`)) {
        const sortType = evt.target.dataset.sortType;

        if (sortType !== this._currentSort) {
          this._currentSort = sortType;
          handler(this._currentSort);
          this._removeActiveBtnClass();
          evt.target.classList.toggle(`sort__button--active`);
        }
      }

    });
  }

  setDefaultSortActive() {
    if (this._currentSort === `DEFAULT`) {
      return;
    }
    this._removeActiveBtnClass();
    this.getElement().querySelector(`a[data-sort-type=${sortTypes.DEFAULT}]`).classList.add(`sort__button--active`);
  }
}
