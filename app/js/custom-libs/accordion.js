class Accordion {
  constructor(parent, options) {
    this.accordion = parent;
    this.button = this.accordion.querySelector("[data-accordion-toggle]");
    this.content = this.accordion.querySelector("[data-accordion-content]");
    this.group = this.accordion.closest("[data-accordions-group]");
    this.isMobile = this.accordion.getAttribute("data-accordion") === "mobile";
    this.setOn = options.setOn || 991;
    this.isDesctop =
      this.accordion.getAttribute("data-accordion") === "desctop";
    this.unsetOn = options.unsetOn || 991;
    this.init();
  }

  init() {
    this.button.addEventListener("click", () => {
      if (this.isMobile) {
        if (window.innerWidth <= this.setOn) {
          this.toggleItem();
        }
      } else if (this.isDesctop) {
        if (window.innerWidth > this.unsetOn) {
          this.toggleItem();
        }
      } else {
        this.toggleItem();
      }
    });
  }

  toggleItem() {
    this.toggleGroup();
    if (this.accordion.classList.contains("active")) {
      this.toggle(this.accordion, this.content, "remove");
    } else {
      this.toggle(this.accordion, this.content, "add");
    }
  }

  toggleGroup() {
    if (this.group) {
      const prev = this.group.querySelector(".active");
      if (prev && !this.accordion.classList.contains("active")) {
        const content = prev.querySelector("[data-accordion-content]");
        this.toggle(prev, content, "remove");
      }
    }
  }

  toggle(button, content, status) {
    button.classList[status]("active");
    if (status === "add") {
      slideDown({
        el: content,
        timeout: 300,
      });
    } else {
      slideUp({
        el: content,
        timeout: 300,
      });
    }
  }
}
