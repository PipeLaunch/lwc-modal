import FORM_FACTOR from "@salesforce/client/formFactor";

import { DEFAULT_ACTION_BUTTONS } from "./lwcModalConfig";

/**
 * @description Validate color
 * (hex and html color string)
 *
 * @param {String} strColor
 * @returns {Boolean} true if valid color
 */
export function isColor(strColor) {
  if (!strColor || typeof strColor !== "string") {
    return false;
  }

  // hex color (with opacity)
  if (strColor.startsWith("#")) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)|(^#[0-9A-F]{8}$)/i.test(strColor);
  }

  // color string
  let s = new Option().style;
  s.color = strColor;
  return s.color === strColor;
}

/**
 * @description Normalize Boolean
 * @param {*} value value
 * @returns {Boolean} value in boolean
 */
export function normalizeBoolean(value) {
  if (
    typeof value === "string" &&
    (value === "0" || value.toLowerCase() === "false")
  )
    return false;
  return Boolean(value);
}

/**
 * @description checks if the form factor is desktop.
 * Large—A desktop client.
 * Medium—A tablet client.
 * Small—A phone client.
 * @returns {Boolean} true if is desktop
 */
export function isDesktop() {
  return FORM_FACTOR === "Large";
}

/**
 * @description validates CSS units
 * @param {String} value css value eg: 100vh or 100px
 * @returns {Boolean} true if it's valid
 */
function validateCssUnitValue(value) {
  const CSSUNITTYPES = [
    "em",
    "ex",
    "ch",
    "rem",
    "vw",
    "vh",
    "vmin",
    "vmax",
    "%",
    "cm",
    "mm",
    "in",
    "px",
    "pt",
    "pc",
  ];
  const regexps = CSSUNITTYPES.map((unit) => {
    return new RegExp(`^[0-9]+${unit}$|^[0-9]+\\.[0-9]+${unit}$`, "i");
  });

  return regexps.find((regexp) => regexp.test(value)) !== undefined;
}

/**
 * @description Validate dimensions with minimum value
 * @param {number} value
 * @param {number} safeValue
 * @returns {number}
 */
function validateDimensions(value, safeValue) {
  value = parseInt(value, 10);
  if (value < safeValue) {
    value = safeValue;
  }
  return value;
}

export function validatePositiveInteger(value) {
  value = parseInt(value, 10);
  if (value < 0) {
    value = 0;
  }
  return value;
}

/**
 * @description validates modal size
 * @param {String} value
 * @returns {String|null}
 */
export function validateSize(input) {
  const VALID_TYPES = ["small", "medium", "large"];
  if (!input || typeof input !== "string" || !VALID_TYPES.includes(input)) {
    return null;
  }
  return input;
}

export function validateString(value = "") {
  if (typeof value !== "string") return null;
  const _value = value.trim();
  return _value.length === 0 ? null : _value;
}

// note: no error handling
export function executeCustomButtonFunction(buttonDefinition) {
  if (
    buttonDefinition &&
    Object.prototype.hasOwnProperty.call(buttonDefinition, "onClick") &&
    typeof buttonDefinition.onClick === "function"
  ) {
    buttonDefinition.onClick();
  }
}

/**
 * @description checks if slot has some html content
 * @param {*} evt Event received on slot change
 * @returns {Boolean} true if has content
 */
export function hasSlotContent(evt) {
  const slot = evt.target !== undefined ? evt.target : evt.currentTarget;
  return slot && slot.assignedElements().length > 0;
}

export function getCustomActionButtonDefinition(evt, actionButtons) {
  const label = evt.target.dataset.id;
  if (!label) {
    console.warn("Custom action button label not found");
    return;
  }

  const buttonDefinition = actionButtons.find(
    (button) => button.label === label
  );
  if (!buttonDefinition) {
    console.warn("Custom action button not found");
    return;
  }

  return buttonDefinition;
}

export function validateActionButtons(value) {
  if (!value || Object.keys(value).length === 0) return [DEFAULT_ACTION_BUTTONS];

  if (!Array.isArray(value)) value = [value];

  return value.map((x) => {
    return { ...DEFAULT_ACTION_BUTTONS, ...x };
  });
}

/*
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
export function generateGuid() {
  function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
  }

  return (
      s4() +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      s4() +
      s4()
  );
}