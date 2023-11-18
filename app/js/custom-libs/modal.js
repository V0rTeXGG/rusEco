class Modal {
  constructor(options) {
    this.overlay = document.querySelector("[data-overlay]");
    this.closeElems = document.querySelectorAll("[data-modal-close], [data-overlay]");
    this.showElems = document.querySelectorAll("[data-modal-open]");
    this.previousModal = null;
    this.validation = options && options.validation ? options.validation : null;
    this.overlayOpacity = options && options.overlayOpacity ? options.overlayOpacity  :  1;
    this.showEvent();
    this.closeEvent();
  }

  showEvent() {
    this.showElems.forEach((button) => {
      button.addEventListener("click", () => {
        const modalAttr = button.getAttribute("data-modal-open");
        const parentModal = button.closest("[data-modal]");
        if (parentModal) {
          this.closePreviousModal(parentModal, modalAttr);
        }
        this.show(modalAttr);
      });
    });
  }

  closeEvent() {
    this.closeElems.forEach((button) => {
      button.addEventListener("click", () => {
        const openedModal = document.querySelector(".modal--vis");
        const modalAttr = openedModal.getAttribute("data-modal");
        if (this.previousModal) {
          this.showPreviousModal(modalAttr);
        } else {
          this.close(modalAttr);
        }
      });
    });
  }

  closePreviousModal(parentModal, modalAttr) {
    const parentModalName = parentModal.getAttribute("data-modal");
    this.closeModal(parentModal);
    this.previousModal = modalAttr === "policy" ? parentModalName : null;
  }

  showPreviousModal(modal) {
    this.close(modal, false);
    this.show(this.previousModal);
    this.previousModal = null;
  }

  backToForm(formHolder) {
    const holder = document.querySelector(`[data-modal=${formHolder}]`);
    const formBody = holder.querySelector(`[data-form-body]`);
    const formThanks = holder.querySelector(`[data-form-thanks]`);
    if (formBody) {
      formBody.style = "";
    }
    if (formThanks) {
      formThanks.style = "";
    }
    if (this.validation) {
      this.validation.clear();
    }
  }

  close(modal, closeOverlay = true) {
    const thisModal = document.querySelector(`[data-modal=${modal}]`);
    const isModalForm = thisModal.querySelector("form");
    if (closeOverlay) {
      fadeOut({
        el: this.overlay,
        timeout: 500,
      });
    }

    this.closeModal(thisModal);

    if (isModalForm) {
      this.backToForm(modal);
    }
    if(!this.previousModal) {
      enableScrolling();
    }
    this.backScroll(thisModal);
  }

  show(modal) {
    const thisModal = document.querySelector(`[data-modal=${modal}]`);
    const activePP = document.querySelectorAll(".modal--vis");
    const showOverlay = thisModal.hasAttribute('data-hide-overlay')
    if (activePP.length) {
      return false;
    }
    if(!showOverlay) {
      fadeIn({
        el: this.overlay,
        timeout: 500,
        display: "block",
        opacityIn: this.overlayOpacity,
      });
    }
    this.openModal(thisModal);
    if(!this.previousModal){
      disableScrolling();
    }
    return true;
  }

  closeModal(modal) {
    fadeOut({
      el: modal,
      timeout: 500,
    });
    modal.classList.remove("modal--vis");
  }

  openModal(modal) {
    fadeIn({
      el: modal,
      timeout: 500,
      display: "block",
    });
    modal.classList.add("modal--vis");
  }
  backScroll(modal) {
    const modalScrollEl = modal.querySelector("[data-scroll-container]");
    if (modalScrollEl) {
      modalScrollEl.scrollTop = 0;
    }
  }
}
