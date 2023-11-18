class tableOfContents {
  constructor(parent, options) {
    this.content = parent;
    if (this.content) {
      this.levels = this.content.querySelectorAll(`${options.levels || "h2"}`);
      this.toc = options.toc;
      this.tocTag = options.isOrdered ? "ol" : "ul";
      this.list = `<${this.tocTag}>`;
      this.title = options.title || false;
      this.static = options.static || false;
      this.modal = options.modal || false;
      this.modalButton = options.modalButton || '';
      this.highlights = options.highlights || false;
      this.idsTmp = options.idsTmp || false;
      this.previousSection = null;
      this.nextSection = null;
      this.topOffset = 90;
      if (this.levels.length) {
        this.init();
      }
    }
  }

  init() {
    this.setTitlesIds();
    this.createList();
    this.generateMarkup();
    if (this.modal) {
      this.openTOCModal();
      this.closeTOCModal();
    }
    if (this.highlights && this.toc) {
      this.scrollObserver();
    }
  }

  setTitlesIds() {
    this.levels.forEach((item, index) => {
      const nodeName = item.nodeName.toLowerCase();
      const idValue = this.idsTmp
        ? `${this.idsTmp}-${index}`
        : `${nodeName}-${index}`;
      item.setAttribute("id", idValue);
      item.setAttribute("data-toc-title", nodeName);
    });
  }

  createList() {
    let prevLevel = 0;
    let curLevel = 0;
    let nextLevel = 0;
    this.levels.forEach((element, index) => {
      curLevel = +element.nodeName[1];
      if (index < this.levels.length - 1) {
        nextLevel = +this.levels[index + 1].nodeName[1];
      }
      this.Link = this._createLink(element);

      if (prevLevel == 0) {
        prevLevel = curLevel;
      }

      if (prevLevel == curLevel) {
        this.list += `<li> ${this.Link}`;
      } else if (prevLevel < curLevel) {
        this.list += `<${this.tocTag}>`;
        this.list += `<li> ${this.Link}`;
      } else if (prevLevel > curLevel) {
        this.list += `</${this.tocTag}>`;
        this.list += `<li> ${this.Link}`;
      }

      if (nextLevel == curLevel) {
        this.list += `</li>`;
      }
      if(nextLevel+1 == curLevel) {
        this.list += `</li>`;
      }

      if(nextLevel+1 < curLevel) {
        let values = curLevel - (nextLevel + 1);
        console.log(curLevel, nextLevel, values);
        for (let index = 0; index < values; index++) {
          this.list += `</li>`;
          this.list += `</${this.tocTag}>`;
        }
      }

      prevLevel = curLevel;
    });
    this.list += `</${this.tocTag}>`;
  }

  _createLink(element) {
    return `<a href="#${element.id}" data-toc-link="${element.id}">${element.innerText}</a>`;
  }

  createStaticTOC() {
    return `
        <div class="contents-table__container">
          ${this.createTOCContent()}
        </div>
    `;
  }

  createModalTOC() {
    return `
        <div class="contents-modal" data-toc-modal="">
            <div class="contents-modal__button"  data-toc-modal-button="">${this.modalButton}</div>
            <div class="contents-modal__overlay" data-toc-modal-overlay=""></div>
            <div class="contents-modal__modal" data-toc-modal-content="">
            <div class="contents-modal__close" data-toc-modal-close=""></div>
              ${this.createTOCContent()}
            </div>
        </div>
    `;
  }

  createTOCTitle() {
    return this.title
      ? `
        <div class="contents-table__title">
            <span>${this.title}</span>
        </div>
        `
      : "";
  }

  createTOCContent() {
    return `
      ${this.createTOCTitle()}
      <div class="contents-table__list">
        ${this.list}
      </div>
    `;
  }

  openTOCModal() {
    const buttons = document.querySelectorAll("[data-toc-modal-button]");
    buttons.forEach((button) => {
      button.addEventListener("click", () => this.toggleModal(button, "add"));
    });
  }

  closeTOCModal() {
    const buttons = document.querySelectorAll(
      "[data-toc-modal-close], [data-toc-modal-overlay], [data-toc-link]"
    );
    buttons.forEach((button) => {
      button.addEventListener("click", () =>
        this.toggleModal(button, "remove")
      );
    });
  }

  toggleModal(button, eventName) {
    const parent = button.closest("[data-toc-modal]");
    if (!parent) {
      return;
    }
    const modal = parent.querySelector("[data-toc-modal-content]");
    const overlay = parent.querySelector("[data-toc-modal-overlay]");
    modal.classList[eventName]("contents-modal__modal--show");
    if (eventName == "add") {
      fadeIn({
        el: overlay,
        timeout: 500,
        display: "block",
        opacityIn: 1,
      });
      disableScrolling();
    } else {
      fadeOut({
        el: overlay,
        timeout: 500,
      });
      enableScrolling();
    }
  }

  generateMarkup() {
    const staticMarkup = this.static ? this.createStaticTOC() : "";
    const modalMarkup = this.modal ? this.createModalTOC() : "";

    const markup = `
      <div class="contents-table">
        ${modalMarkup}
        ${staticMarkup}
      </div>
    `;
    this.toc.insertAdjacentHTML("afterbegin", markup);
  }

  scrollObserver() {
    const callback = (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        const allLinks = this.toc.querySelectorAll(`[data-toc-link]`);
        allLinks.forEach((link, index) => {
          if(link.getAttribute('data-toc-link') == id) {
            if (entry.isIntersecting) {
              link.classList.add("is-visible");
              if(index > 0) {
                this.previousSection = allLinks[index-1].getAttribute("data-toc-link"); 
              }
            } else {
              link.classList.remove("is-visible");
            }
           
          } 
        });
        this.highlightFirstActive();
      });
    };

    const percent =  100 - (this.topOffset * 100) / window.innerHeight;
    const options = {
      rootMargin: `0% 0% -${percent}% 0%`, 
      threshold: 0
    }

    const observer = new IntersectionObserver(callback, options);
    this.levels.forEach((title) => observer.observe(title));
  }

  highlightFirstActive() {
    const visLink = this.toc.querySelector(`[data-toc-link].is-visible`);
    this.toc.querySelectorAll(`[data-toc-link]`).forEach((link) => {
      link.classList.remove("active");
    });

    if (visLink) {
      visLink.classList.add("active");
    }

    if (!visLink && this.previousSection) {
      this.toc.querySelector(
        `a[href="#${this.previousSection}"]`
      ).classList.add('active')
    }

    if (!visLink && !this.previousSection) {
      this.toc.querySelector(
        `a`
      ).classList.add('active')
    }
  }
}
