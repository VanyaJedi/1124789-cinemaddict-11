
import FilmPopup from "../components/filmPopup.js";
import FilmCard from "../components/filmCard.js";
import {render, replace, remove} from "../util/manipulateDOM.js";

import {encode} from "he";

export default class MovieController {

  constructor(container, onDataChange, onViewChange, api) {
    this._container = container;
    this._filmData = null;
    this._filmComments = null;
    this._filmComponent = null;
    this._filmPopupComponent = null;

    this._api = api;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._showPopup = this._showPopup.bind(this);
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

    this._filmComponent.setAddToFavoriteBtnClick((evt)=>{
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

    this._filmComponent.setShowPopupHandler(this._showPopup);
  }

  _showPopup(evt) {
    if (evt.target.classList.contains(`film-card__poster`) || evt.target.classList.contains(`film-card__title`) || evt.target.classList.contains(`film-card__comments`)) {
      this._api.getComments(this._filmData.item)
        .then((parsedComments) => {
          console.log(parsedComments);
          this._filmComments = parsedComments;
          this._filmPopupComponent = new FilmPopup(this._filmData, this._filmComments);
          this._onViewChange();
          this._filmPopupComponent.setAddToWatchBtnClick(() => {
            this._onDataChange(this, this._filmData, Object.assign({}, this._filmData, {
              addToWatchlist: !this._filmData.addToWatchlist,
            }));
          });

          this._filmPopupComponent.setMarkAsWatchedBtnClick(()=>{
            this._onDataChange(this, this._filmData, Object.assign({}, this._filmData, {
              watched: !this._filmData.watched,
            }));
          });

          this._filmPopupComponent.setAddToFavoriteBtnClick(()=>{
            this._onDataChange(this, this._filmData, Object.assign({}, this._filmData, {
              favourites: !this._filmData.favourites,
            }));
          });

          this._filmPopupComponent.setEmojiClickHandler((smileEvt) => {
            const encodeMessage = encode(this._filmPopupComponent.getElement().querySelector(`.film-details__comment-input`).value);
            /*const commentObject = {
              item: this._filmData.comments.length,
              smile: `${smileEvt.target.value}.png`,
              user: `random from server`,
              message: encodeMessage,
              date: new Date()
            };*/
            const commentObject = {
              comment: encodeMessage,
              date: new Date(),
              emotion: smileEvt.target.value
            };

            this._api.addComment(this._filmData.item, commentObject)
              .then((comments) => {

                console.log(this._filmData.item);
                this._filmData.comments = comments;
                this._filmPopupComponent.rerender();
              });

            //this._filmData.comments.push(commentObject);

          });

          this._filmPopupComponent.setDeleteCommentHandler((btnEvt) => {
            btnEvt.preventDefault();
            const commentAddress = btnEvt.target.dataset.address;
            this._api.deleteComment(commentAddress)
              .then((comment) => {
                console.log(comment)
                const indexComment = this._filmData.comments.findIndex((it) => parseInt(it.item, 10) === parseInt(commentAddress, 10));
                this._filmData.comments.splice(indexComment, 1);
                this._filmPopupComponent.rerender();
              });
          });


          render(document.body, this._filmPopupComponent);
          document.body.classList.add(`hide-overflow`);

          const onEscKeyDownClosePopup = (btnEvt) => {
            const isEscKey = btnEvt.key === `Escape` || btnEvt.key === `Esc`;

            if (isEscKey) {
              this._filmPopupComponent.closePopup();
              document.removeEventListener(`keydown`, onEscKeyDownClosePopup);
            }
          };

          document.addEventListener(`keydown`, onEscKeyDownClosePopup);

          this._filmPopupComponent.setCloseBtnHandler(this._filmPopupComponent.closePopup);
        });

    }
  }

  setDefaultView() {
    if (this._filmPopupComponent) {
      this._filmPopupComponent.closePopup();
    }
  }

  destroy() {
    remove(this._filmComponent);
  }
}
