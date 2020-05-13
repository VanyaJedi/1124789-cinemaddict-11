
import AbstractComponent from "./abstract-component.js";

export default class AbstractSmartComponent extends AbstractComponent {

  recoveryListeners() {
    throw new Error(`Methos recoveryListeners should exist`);
  }

  reRender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, oldElement);

    this.recoveryListeners();
  }
}
