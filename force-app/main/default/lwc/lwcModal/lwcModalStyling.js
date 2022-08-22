export function computeModalCssClasses(visible = false) {
  const baseClasses = ["slds-modal"];

  if (visible) baseClasses.push("slds-fade-in-open");
  
  return baseClasses.join(" ");
}

export function computeModalMobileCssClasses(visible = false) {
  const baseClasses = ["slds-modal", "lwc-modal"];

  if (visible) baseClasses.push("slds-fade-in-open");

  return baseClasses.join(" ");
}

export function computeBackdropCssClasses(visible = false) {
  const baseClasses = ["slds-backdrop"];

  if (visible) baseClasses.push("slds-backdrop_open");

  return baseClasses.join(" ");
}

export function computeModalContentCssClasses(headless = false) {
  const baseClasses = ["slds-modal__content"];

  if (headless) baseClasses.push("slds-modal__content_headless", "custom-lwc-modal__content_headless");

  return baseClasses.join(" ");
}

/**
 * @description computes CSS footer slot classes
 * @param {Boolean} directional 
 * @returns {String}
 */
export function computeModalFooterCssClasses(directional = false) {
  const baseClasses = ["slds-modal__footer"];

  if (directional) baseClasses.push("slds-modal__footer_directional", "custom-lwc-modal__footer_directional");
  // if (!hasFooter) baseClasses.push("custom-slds-modal__footer-hidden"); // not needed anymore with new version

  return baseClasses.join(" ");
}