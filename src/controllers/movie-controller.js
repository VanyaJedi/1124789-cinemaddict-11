
import FilmPopup from "../components/film-popup.js";
import FilmCard from "../components/film-card.js";
import {render, replace, remove} from "../util/manipulate-dom.js";

import {encode} from "he";

const getCommentItems = (comments) => {
  return comments.map((comment) => comment.item);
};

export default class MovieController {

  constructor(container, onDataChange, onViewChange, api, onCommentsChange) {
    this._container = container;
    this._filmData = null;
    this._filmComments = null;
    this._filmComponent = null;
    this._filmPopupComponent = null;

    this._api = api;
    this._isFormSending = false;

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
      }, {watchingDate: new Date()
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
      this._filmPopupComponent.reRender();
    }
  }


  _showPopup(evt) {
    if (evt.target.classList.contains(`film-card__poster`) || evt.target.classList.contains(`film-card__title`) || evt.target.classList.contains(`film-card__comments`)) {
      this._api.getComments(this._filmData.item)
        .then((parsedComments) => {
          this._filmComments = parsedComments;
          this._onViewChange();
          this._filmPopupComponent = new FilmPopup(this._filmData, this._filmComments);
          this._filmPopupComponent.setAddToWatchBtnClick(() => {
            const newFilmData = Object.assign({}, this._filmData, {
              addToWatchlist: !this._filmData.addToWatchlist,
            });
            this._onDataChange(this, this._filmData, newFilmData);
            this._filmData = newFilmData;
            this._filmPopupComponent._film = newFilmData;
            this._filmPopupComponent.reRender();
          });

          this._filmPopupComponent.setMarkAsWatchedBtnClick(()=>{
            const newFilmData = Object.assign({}, this._filmData, {
              watched: !this._filmData.watched,
            }, {watchingDate: new Date()
            });
            this._onDataChange(this, this._filmData, newFilmData);
            this._filmData = newFilmData;
            this._filmPopupComponent._film = newFilmData;
            this._filmPopupComponent.reRender();
          });

          this._filmPopupComponent.setAddToFavoriteBtnClick(()=>{
            const newFilmData = Object.assign({}, this._filmData, {
              favourites: !this._filmData.favourites,
            });
            this._onDataChange(this, this._filmData, newFilmData);
            this._filmData = newFilmData;
            this._filmPopupComponent._film = newFilmData;
            this._filmPopupComponent.reRender();
          });

          this._filmPopupComponent.setEmojiClickHandler((smileEvt) => {
            this._filmPopupComponent.insertEmojiElement(smileEvt.target.value);
          });

          this._filmPopupComponent.setSendFormHanlder(() => {
            if (!this._isFormSending) {
              this._isFormSending = true;
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
                this._filmData.comments = getCommentItems(comments);
                this._filmPopupComponent._comments = comments;
                this._filmPopupComponent.reRender();
                this.render(this._filmData);
                this._onCommentsChange();
                this._isFormSending = false;
              })
              .catch(()=>{
                this._filmPopupComponent.enableForm();
                this._filmPopupComponent.addWrongInputEffect();
                this._filmPopupComponent.shakePopup();
                this._isFormSending = false;
              });
            }


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
                this._filmPopupComponent.reRender();
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


          document.addEventListener(`keydown`, this._filmPopupComponent.onEscKeyDownClosePopup);
          this._filmPopupComponent.setCloseBtnHandler(this._filmPopupComponent.closePopup);
        });

    }
  }
}
