import { LightningElement } from "lwc";

export default class Samples extends LightningElement {
  showModal = true;

  startvisibleActionButtons = {
    label: "OK",
    variant: "brand",
    class: "",
    onClick: null,
    iconName: null,
    iconPosition: null,
    customEvent: "okevent",
    disabled: false,
    hideModal: false,
  };

  handleClickButtonTest(evt) {
    const selector = evt.target.dataset.modalselector;
    this._showModal(selector);
  }

  handleClickButtonTestStartVisible() {
    this.showModal = true;
  }

  handleHideModalEvent() {
    this.showModal = false;
  }

  _showModal(selector) {
    this.template
      .querySelector(`c-lwc-modal[data-selector="${selector}"]`)
      .show();
  }
}
