
const emptyLocalStorage = {
  movies: {},
  comments: {}
};

export default class Store {

  constructor(key, storage) {
    this._key = key;
    this._storage = storage;
  }

  getItems() {
    try {
      return JSON.parse(this._storage.getItem(this._key)) || emptyLocalStorage;
    } catch (err) {
      return emptyLocalStorage;
    }
  }

  setItem(dataType, key, value) {
    const storeData = this.getItems();
    const objectToSave = Object.assign({}, storeData[dataType], {[key]: value});
    storeData[dataType] = objectToSave;
    this._storage.setItem(
        this._key,
        JSON.stringify(storeData)
    );
  }

  removeItem(key) {
    this._storage.removeItem(key);
  }

}
