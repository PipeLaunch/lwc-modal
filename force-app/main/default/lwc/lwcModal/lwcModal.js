/**
 * @description       : Generic LWC Modal Component
 * @group             : LWC Generic Components
 * @last modified on  : 24-08-2022
 * @last modified by  : samuel@pipelaunch.com
 * @changelog         : 04-10-2022 - Initial version
 *                      12-08-2022 - Rename files (WARNING: look out with any any custom modifications done inside the files)
 *                                 - Only scroll to top on mobile devices
 *                                 - keepFooterButtons option
 *                      24-08-2022 - fix slot content
 **/
import { LightningElement, api, track } from "lwc";

import template_desktop from "./lwcModalTemplateDesktop.html";
import template_mobile from "./lwcModalTemplateMobile.html";

import CUSTOM_LABELS from "./lwcModalLabels";
import * as utils from "./lwcModalUtils";
import * as styling from "./lwcModalStyling";
import {
  DEFAULT_SLDS_Z_INDEX,
  DEFAULT_ACTION_BUTTONS,
  DEFAULT_CANCEL_BUTTON
} from "./lwcModalConfig";

export default class LwcModal extends LightningElement {
  /**
   * @description define all the component options with a single object (easier when
   * the user needs to define multiple options and don't want to pollute the html with
   * a lot of parameters)
   */
  @api get options() {
    return {
      hideBackdrop: this.hideBackdrop,
      hideCloseButton: this.hideCloseButton,
      propagateEvents: this.propagateEvents,
      level: this.level,
      headless: this.headless,
      footless: this.footless,
      size: this.size,
      directional: this.directional,
      modalTitle: this.modalTitle,
      startVisible: this.startVisible,
      cancelButton: this.cancelButton,
      actionButtons: this.actionButtons,
      keepFooterButtons: this.keepFooterButtons
    };
  }
  set options(value) {
    if (Object.prototype.hasOwnProperty.call(value, "hideBackdrop"))
      this.hideBackdrop(value.hideBackdrop);
    if (Object.prototype.hasOwnProperty.call(value, "hideCloseButton"))
      this.hideCloseButton(value.hideCloseButton);
    if (Object.prototype.hasOwnProperty.call(value, "propagateEvents"))
      this.propagateEvents(value.propagateEvents);
    if (Object.prototype.hasOwnProperty.call(value, "level"))
      this.level(value.level);
    if (Object.prototype.hasOwnProperty.call(value, "headless"))
      this.headless(value.headless);
    if (Object.prototype.hasOwnProperty.call(value, "footless"))
      this.footless(value.footless);
    if (Object.prototype.hasOwnProperty.call(value, "size"))
      this.size(value.size);
    if (Object.prototype.hasOwnProperty.call(value, "directional"))
      this.directional(value.directional);
    if (Object.prototype.hasOwnProperty.call(value, "modalTitle"))
      this.modalTitle(value.modalTitle);
    if (Object.prototype.hasOwnProperty.call(value, "startVisible"))
      this.startVisible(value.startVisible);
    if (Object.prototype.hasOwnProperty.call(value, "cancelButton"))
      this.cancelButton(value.cancelButton);
    if (Object.prototype.hasOwnProperty.call(value, "actionButtons"))
      this.actionButtons(value.actionButtons);
    if (Object.prototype.hasOwnProperty.call(value, "keepFooterButtons"))
      this.keepFooterButtons(value.keepFooterButtons);
  }

  /**
   * @description Hides the backdrop (only desktop)
   * @default false
   */
  @api get hideBackdrop() {
    return this._hideBackdrop;
  }
  _hideBackdrop = false; // true to hide backdrop
  set hideBackdrop(value) {
    this._hideBackdrop = utils.normalizeBoolean(value);
  }

  /**
   * @description Hides the close button (only desktop). When you hide the close button
   * make sure you have the cancel button enabled or any action that can be triggered to close
   * the modal
   * @default false
   */
  @api get hideCloseButton() {
    return this._hideBackdrop;
  }
  _hideCloseButton = false;
  set hideCloseButton(value) {
    this._hideCloseButton = utils.normalizeBoolean(value);
  }

  /**
   * @description Propagate events up with bubble and composed to use when the component
   * is nested
   * @default false
   */
  @api get propagateEvents() {
    return this._propagateEvents;
  }
  _propagateEvents = false;
  set propagateEvents(value) {
    this._propagateEvents = utils.normalizeBoolean(value);
  }

  /**
   * @description set the level of the modal (z-index) to display multiple modals
   * @default 0
   */
  @api get level() {
    return this._level;
  }
  _level = 0;
  set level(value) {
    this._level = utils.validatePositiveInteger(value);
  }

  /**
   * @description true to show a headless modal
   * @default false
   */
  @api get headless() {
    return this._headless;
  }
  _headless = false;
  set headless(value) {
    this._headless = utils.normalizeBoolean(value);
  }

  /**
   * @description true to show a footless modal
   * @default false
   */
  @api get footless() {
    return this._footless;
  }
  _footless = false;
  set footless(value) {
    this._footless = utils.normalizeBoolean(value);
  }

  /**
   * @description keep footer buttons event if there is slot content
   * @default false
   */
  @api get keepFooterButtons() {
    return this._keepFooterButtons;
  }
  _keepFooterButtons = false;
  set keepFooterButtons(value) {
    this._keepFooterButtons = utils.normalizeBoolean(value);
  }

  /**
   * @description makes button inside the footer spread to both left and right
   * @default false
   */
  @api get directional() {
    return this._directional;
  }
  _directional = false;
  set directional(value) {
    this._directional = utils.normalizeBoolean(value);
  }

  /**
   * @description size of the modal (desktop only)
   * Sizes from SLDS stylesheet
   * small: max-width: 52.0625rem,  width: 60%
   * medium: max-width: 75rem, width: 70%
   * large: max-width: none, width: 90%
   */
  @api get size() {
    return this._size;
  }
  _size = null;
  set size(value) {
    this._size = utils.validateSize(value);
  }

  /**
   * @description text to display below the headline
   * if you need a custom content, please use the header slot
   * @default null - hide tagline
   */
  @api get tagline() {
    return this._tagline;
  }
  _tagline = null;
  set tagline(value) {
    this._tagline = utils.validateString(value);
  }

  /**
   * @description the title of the modal. Note that this title is also used by the aria attributes
   * so include a title if you want to keep accessibility
   * @default null - hide title
   */
  @api get modalTitle() {
    return this._modalTitle;
  }
  _modalTitle = null;
  set modalTitle(value) {
    this._modalTitle = utils.validateString(value);
  }

  /**
   * @description if true the modal will be visible when the component is created
   * this can be useful when the modal component is controlled by other template directive
   * and we don't want to load the content of the modal to the DOM
   * @default false
   */
  @api get startVisible() {
    return this._startVisible;
  }
  _startVisible = false;
  set startVisible(value) {
    this._startVisible = utils.normalizeBoolean(value);
  }

  /**
   * @description use a guid to unique identify each modal.
   * If none value is provided, a guid will be generated
   * @default random guid
   */
  @api get guid() {
    return this._guid;
  }
  _guid = utils.generateGuid();
  set guid(value) {
    this._guid = utils.validateString(value);
  }

  @api get cancelButton() {
    return this._cancelButton;
  }
  _cancelButton = DEFAULT_CANCEL_BUTTON;
  set cancelButton(value) {
    this._cancelButton = value; // TODO: validate
  }

  @api get actionButtons() {
    return this._actionButtons;
  }
  _actionButtons = [DEFAULT_ACTION_BUTTONS];
  set actionButtons(value) {
    this._actionButtons = utils.validateActionButtons(value); // TODO: validate
  }

  @track status = {
    visible: false, // visibility status
    showFooterButtons: true, // show footer buttons, should be hidden automatically if there is a slot content
  };

  labels = CUSTOM_LABELS;

  connectedCallback() {
    this._init();
  }

  render() {
    return utils.isDesktop() ? template_desktop : template_mobile;
  }

  // Temp testing z[index]
  get computeModalStyle() {
    return `z-index: ${DEFAULT_SLDS_Z_INDEX + this._level};`;
  }

  get computeFooterStyle() {
    return `z-index: ${DEFAULT_SLDS_Z_INDEX - 1 + this._level};`;
  }

  /**
   * @description hide the modal
   */
  @api hide() {
    this._hideShow(false);
  }

  /**
   * @description show the modal
   */
  @api show() {
    this._hideShow(true);
    this._scrollToTop();
  }

  /**
   * @description show the modal
   */
  @api open() {
    this._hideShow(true);
  }

  /**
   * @type {String}
   */
  get computeHeaderCssClasses() {
    return this.modalHeader || this.modalTagline
      ? "slds-modal__header"
      : "slds-modal__header custom-slds-modal__header-hidden";
  }

  /**
   * @type {String} classes for modal (desktop only)
   */
  get computeModalCssClasses() {
    return styling.computeModalCssClasses(this.status.visible);
  }

  /**
   * @type {String} classes for mobile devices modal
   */
  get computeModalMobileCssClasses() {
    return styling.computeModalMobileCssClasses(this.status.visible);
  }

  /**
   * @type {String} classes for backdrop
   */
  get computeBackdropCssClasses() {
    return styling.computeBackdropCssClasses(this.status.visible);
  }

  /**
   * @type {String} classes for modal content
   */
  get computeModalContentCssClasses() {
    return styling.computeModalContentCssClasses(this.headless);
  }

  /**
   * @type {String} classes for modal footer
   */
  get computeModalFooterCssClasses() {
    return styling.computeModalFooterCssClasses(this.directional);
  }

  get computeHasMultipleActionButtons() {
    return (
      this.actionButtons &&
      Array.isArray(this.actionButtons) &&
      this.actionButtons.length > 1
    );
  }

  get lastActionButton() {
    if (!this.actionButtons || this.actionButtons.length === 0) return null;
    return this.actionButtons[this.actionButtons.length - 1];
  }

  get remainingActionButtons() {
    if (!this.actionButtons || this.actionButtons.length < 2) return null;
    return this.actionButtons.slice(0, this.actionButtons.length - 1);
  }

  innerKeyUpHandler(event) {
    if (event.code === "Escape") {
      this.hide();
    }
  }

  handleClickCancelButton() {
    utils.executeCustomButtonFunction(this.cancelButton);
    this.hide();
  }

  handleClickActionButton(evt) {
    const buttonDefinition = utils.getCustomActionButtonDefinition(
      evt,
      this.actionButtons
    );
    utils.executeCustomButtonFunction(buttonDefinition);
    this._dispatchActionButtonEvent(buttonDefinition);
  }

  handleFooterSlotChange(evt) {
    this.status.showFooterButtons =
      this._hasSlotContent(evt) && !this._keepFooterButtons ? false : true;
  }

  handleHeaderSlotChange(evt) {
    this.hasHeaderSlot = this._hasSlotContent(evt);
  }

  _init() {
    this.status.visible = this.startVisible;
    this._scrollToTop();
  }

  /**
   * @description checks if slot has content (some elements)
   * Use this if block because assigning event to variable issues in local dev
   * @param {*} evt 
   * @returns {Boolean} true if the slot has content
   */
  _hasSlotContent(evt) {
    if (evt && evt.target !== undefined) {
      return evt.target.assignedElements().length > 0;
    }
    if (evt && evt.currentTarget !== undefined) {
      return evt.currentTarget.assignedElements().length > 0;
    }
  }

  _dispatchActionButtonEvent(buttonDefinition) {
    if (
      buttonDefinition &&
      Object.prototype.hasOwnProperty.call(buttonDefinition, "customEvent") &&
      buttonDefinition.customEvent
    ) {
      this.dispatchEvent(
        new CustomEvent(buttonDefinition.customEvent, {
          detail: this.guid,
          composed: this._propagateEvents,
          bubbles: this._propagateEvents
        })
      );
    }
  }

  _hideShow(visible = true) {
    this.status.visible = visible;
    const eventName = visible ? "show" : "hide";
    this.dispatchEvent(
      new CustomEvent(eventName, {
        composed: this._propagateEvents,
        bubbles: this._propagateEvents
      })
    );
  }

  /**
   * Scroll to top on mobile devices because the modal is positioned absolute
   */
  _scrollToTop() {
    if (!utils.isDesktop()) {
      window.scrollTo(0, 1);
    }
  }
}
