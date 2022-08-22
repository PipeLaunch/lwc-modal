<lightning-button-icon size="large" class="slds-modal__close" if:false={_hideCloseButton} variant="bare-inverse"
                        icon-name="utility:close" alternative-text={labels.CLOSE_THIS_WINDOW}
                        title={labels.CLOSE_THIS_WINDOW} onclick={closeModal}>
                        <label class="slds-assistive-text">{labels.CLOSE_THIS_WINDOW}</label>
                    </lightning-button-icon>




                    .custom-slds-modal__content-overflow {
	overflow: initial;
}

.custom-slds-modal__header-hidden {
	border: 0;
	padding: 0.25rem;
}

.custom-slds-modal__footer-hidden {
	padding: 0.25rem;
	background-color: white;
	border: 0;
}

.custom-slds-modal__container {
	/* width: max-content; */
	width: fit-content;
	block-size: fit-content;
	max-width: 99vw;
}

/* .custom-slds-modal__content-height {
    max-height: calc(100vh - 80px);
    overflow-y: scroll;
} */

.custom-mobile-header {
	border-bottom: var(--slds-c-modal-sizing-border, var(--sds-c-modal-sizing-border, 2px)) solid var(--slds-c-modal-color-border, var(--sds-c-modal-color-border, #e5e5e5));
}
