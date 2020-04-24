
import FilmPopup from "../components/filmPopup.js";
import FilmCard from "../components/filmCard.js";
import {render, replace} from "../util/manipulateDOM.js";

export default class MovieController {

  constructor(container, onDataChange) {
    this._container = container;
    this._filmData = null;
    this._filmComponent = null;
    this._filmPopupComponent = null;

    this._onDataChange = onDataChange;
  }

  render(film) {
    const oldFilmComponent = this._filmComponent;
    this._filmData = film;
    this._filmComponent = new FilmCard(film);

    this._filmComponent.setAddToWatchBtnClick((evt)=>{
      evt.preventDefault();
      this._onDataChange(this, this._filmData, Object.assign({}, this._filmData, {
        addToWatchlist: !this._filmData.addToWatchlist,
      }));
    });

    this._filmComponent.setMarkAsWatchedBtnClick((evt)=>{
      evt.preventDefault();
      this._onDataChange(this, this._filmData, Object.assign({}, this._filmData, {
        watched: !this._filmData.watched,
      }));
    });

    this._filmComponent.setAddTofavoriteBtnClick((evt)=>{
      evt.preventDefault();
      this._onDataChange(this, this._filmData, Object.assign({}, this._filmData, {
        favourites: !this._filmData.favourites,
      }));
    });


    if (!oldFilmComponent) {
      render(this._container, this._filmComponent);
    } else {
      replace(this._filmComponent, oldFilmComponent);
    }

    this._filmComponent.setShowPopupHandler(this._showPopup.bind(this));
  }

  _showPopup(evt) {
    if (evt.target.classList.contains(`film-card__poster`) || evt.target.classList.contains(`film-card__title`) || evt.target.classList.contains(`film-card__comments`)) {
      const filmPopup = new FilmPopup(this._filmData);

      filmPopup.setAddToWatchBtnClick(() => {
        this._onDataChange(this, this._filmData, Object.assign({}, this._filmData, {
          addToWatchlist: !this._filmData.addToWatchlist,
        }));
      });

      filmPopup.setMarkAsWatchedBtnClick(()=>{
        this._onDataChange(this, this._filmData, Object.assign({}, this._filmData, {
          watched: !this._filmData.watched,
        }));
      });

      filmPopup.setAddTofavoriteBtnClick(()=>{
        this._onDataChange(this, this._filmData, Object.assign({}, this._filmData, {
          favourites: !this._filmData.favourites,
        }));
      });

      filmPopup.setEmojiClickHandler((smileEvt) => {
        const commentObject = {
          smile: `${smileEvt.target.value}.png`,
          user: `random from server`,
          message: filmPopup.getElement().querySelector(`.film-details__comment-input`).value,
          date: new Date()
        };
        this._filmData.comments.push(commentObject);
        filmPopup.rerender();
      });

      render(document.body, filmPopup);


      document.body.classList.add(`hide-overflow`);

      const closeBtnHandler = function () {
        document.querySelector(`.film-details`).remove();
        document.body.classList.remove(`hide-overflow`);
      };

      const onEscKeyDownClosePopup = (btnEvt) => {
        const isEscKey = btnEvt.key === `Escape` || btnEvt.key === `Esc`;

        if (isEscKey) {
          closeBtnHandler();
          document.removeEventListener(`keydown`, onEscKeyDownClosePopup);
        }
      };
      document.addEventListener(`keydown`, onEscKeyDownClosePopup);
      filmPopup.setCloseBtnHandler(closeBtnHandler);
    }
  }

}
