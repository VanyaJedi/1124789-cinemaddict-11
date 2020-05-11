
import FilmPopup from "../components/filmPopup.js";
import FilmCard from "../components/filmCard.js";
import {render, replace, remove} from "../util/manipulateDOM.js";

import {encode} from "he";

export default class MovieController {

  constructor(container, onDataChange, onViewChange, api, onCommentsChange) {
    this._container = container;
    this._filmData = null;
    this._filmComments = null;
    this._filmComponent = null;
    this._filmPopupComponent = null;

    this._api = api;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._onCommentsChange = onCommentsChange;

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
          this._filmComments = parsedComments;
          this._filmPopupComponent = new FilmPopup(this._filmData, this._filmComments);
          this._onViewChange();
          this._filmPopupComponent.setAddToWatchBtnClick(() => {
            const newFilmData = Object.assign({}, this._filmData, {
              addToWatchlist: !this._filmData.addToWatchlist,
            });
            this._onDataChange(this, this._filmData, newFilmData);
            this._filmData = newFilmData;
            this._filmPopupComponent._film = newFilmData;
            this._filmPopupComponent.rerender();
          });

          this._filmPopupComponent.setMarkAsWatchedBtnClick(()=>{
            const newFilmData = Object.assign({}, this._filmData, {
              watched: !this._filmData.watched,
            });
            this._onDataChange(this, this._filmData, newFilmData);
            this._filmData = newFilmData;
            this._filmPopupComponent._film = newFilmData;
            this._filmPopupComponent.rerender();
          });

          this._filmPopupComponent.setAddToFavoriteBtnClick(()=>{
            const newFilmData = Object.assign({}, this._filmData, {
              favourites: !this._filmData.favourites,
            });
            this._onDataChange(this, this._filmData, newFilmData);
            this._filmData = newFilmData;
            this._filmPopupComponent._film = newFilmData;
            this._filmPopupComponent.rerender();
          });

          this._filmPopupComponent.setEmojiClickHandler((smileEvt) => {
            this._filmPopupComponent.insertEmojiElement(smileEvt.target.value);
          });

          this._filmPopupComponent.setSendFormHanlder(() => {
            this._filmPopupComponent.removeWrongInputEffect();
            const encodeMessage = encode(this._filmPopupComponent.getElement().querySelector(`.film-details__comment-input`).value);
            const emojiValue = this._filmPopupComponent._emojiValue;
            const commentObject = {
              comment: encodeMessage,
              date: new Date(),
              emotion: emojiValue
            };

            this._filmPopupComponent.disableForm();

            this._api.addComment(this._filmData.item, commentObject)
              .then((comments) => {
                this._filmData.comments = comments;
                this._filmPopupComponent._comments = comments;
                this._filmPopupComponent.rerender();
                this.render(this._filmData);
                this._onCommentsChange();
              })
              .catch(()=>{
                this._filmPopupComponent.enableForm();
                this._filmPopupComponent.addWrongInputEffect();
                this._filmPopupComponent.shakePopup();
              });
          });

          this._filmPopupComponent.setDeleteCommentHandler((btnEvt) => {
            btnEvt.preventDefault();
            const deleteBtn = btnEvt.target;
            const commentAddress = deleteBtn.dataset.address;
            deleteBtn.disabled = true;
            deleteBtn.innerText = `Deleting...`;
            this._api.deleteComment(commentAddress)
              .then(() => {
                return this._api.getComments(this._filmData.item);
              })
              .then((newParsedComments) => {
                this._filmData.comments = newParsedComments;
                this._filmPopupComponent._comments = newParsedComments;
                this._filmPopupComponent.rerender();
                this._onCommentsChange();
              })
              .catch(()=>{
                deleteBtn.disabled = false;
                deleteBtn.innerText = `Delete`;
                this._filmPopupComponent.shakeComment(btnEvt);
              });
          });


          render(document.body, this._filmPopupComponent);
          document.body.classList.add(`hide-overflow`);

          const onEscKeyDownClosePopup = (btnEvt) => {
            const isEscKey = btnEvt.key === `Escape` || btnEvt.key === `Esc`;

            if (isEscKey) {
              this._filmPopupComponent.closePopup();
              document.removeEventListener(`keydown`, onEscKeyDownClosePopup);
              document.removeEventListener(`keydown`, this._filmPopupComponent.sendFormByBtn);
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

  updatePopup(data) {
    if (this._filmPopupComponent) {
      this._filmPopupComponent.setNewFilmData(data);
      this._filmPopupComponent.rerender();
    }
  }
}
