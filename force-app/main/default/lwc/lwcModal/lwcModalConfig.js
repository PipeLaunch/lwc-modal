import CUSTOM_LABELS from "./lwcModalLabels";

export const DEFAULT_SLDS_Z_INDEX = 9001;

export const DEFAULT_CANCEL_BUTTON = {
  label: CUSTOM_LABELS.CANCEL,
  variant: "neutral",
  detail: "OK",
  class: "",
  onClick: null,
  iconName: null,
  iconPosition: null,
};

export const DEFAULT_ACTION_BUTTONS = {
  label: "OK",
  variant: "brand",
  class: "",
  onClick: null,
  iconName: null,
  iconPosition: null,
  customEvent: null,
  disabled: false,
  hideModal: false,
};

// export const DEFAULT_ACTION_BUTTONS = [
//     {
//         label: "Secondary Action",
//         onClick: () => {
//             console.log("Ok");
//         },
//         variant: "bare",
//     },
//     {
//         label: "Main Action",
//         onClick: () => {
//             console.log("Ok2");
//         },
//         iconName: "utility:check",
//         iconPosition: "left",
//         class: "",
//         variant: "brand",
//     },
// ];

// export const DEFAULT_CANCEL_BUTTON = {
//     label: CUSTOM_LABELS.CANCEL,
//     onClick: () => {
//       console.log("Cancel");
//     },
//     iconName: null, // "utility:close",
//     iconPosition: null, // "left",
//     class: "",
//     variant: "neutral",
//   };
