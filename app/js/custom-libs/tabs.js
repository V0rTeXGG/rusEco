class Tabs {
  constructor(parent, options) {
    this.parent = parent;
    this.navs = this.parent.querySelectorAll("[data-tabs-nav]");
    this.activeTab = this.parent.querySelector(`[data-tabs-nav].active`);
    this.nextTab = this.activeTab ? this.activeTab.nextElementSibling : false;
    this.prevTab = this.activeTab
      ? this.activeTab.previousElementSibling
      : false;
    if (options.controls) {
      this.controls = {
        prev: options.controls.prev,
        next: options.controls.next,
      };
    }
    this.init();
  }

  init() {
    this.navs.forEach((element) => {
      element.addEventListener("click", () => this.toggleTabs(element));
    });
    this.arrowsToggles();
  }

  arrowsToggles() {
    if (this.controls) {
      if (this.controls.prev) {
        this.controls.prev.addEventListener("click", () => {
          if (this.prevTab && this.prevTab.hasAttribute("data-tabs-nav")) {
            this.toggleTabs(this.prevTab);
          }
        });
      }
      if (this.controls.next) {
        this.controls.next.addEventListener("click", () => {
          if (this.nextTab && this.nextTab.hasAttribute("data-tabs-nav")) {
            this.toggleTabs(this.nextTab);
          }
        });
      }
    }
  }

  togglePrevArrow() {
    if (this.controls.prev) {
      if (!this.prevTab || !this.prevTab.hasAttribute("data-tabs-nav")) {
        this.controls.prev.classList.add("disabled");
      } else {
        this.controls.prev.classList.remove("disabled");
      }
    }
  }

  toggleNextArrow() {
    if (this.controls.next) {
      if (!this.nextTab || !this.nextTab.hasAttribute("data-tabs-nav")) {
        this.controls.next.classList.add("disabled");
      } else {
        this.controls.next.classList.remove("disabled");
      }
    }
  }

  updateTabs() {
    this.activeTab = this.parent.querySelector(`[data-tabs-nav].active`);
    this.nextTab = this.activeTab.nextElementSibling;
    this.prevTab = this.activeTab.previousElementSibling;
  }

  toggleTabs(element) {
    const currentTabName = element.getAttribute("data-tabs-nav");
    const currentFold = this.parent.querySelector(
      `[data-tabs-fold="${currentTabName}"]`
    );
    const prevTabName = this.activeTab.getAttribute("data-tabs-nav");
    const prevFold = this.parent.querySelector(
      `[data-tabs-fold="${prevTabName}"]`
    );

    if (element.classList.contains("active")) {
      return;
    }

    this.toggle(element, currentFold, "add");
    this.toggle(this.activeTab, prevFold, "remove");
    this.updateTabs();
    this.togglePrevArrow();
    this.toggleNextArrow();
  }

  toggle(tab, fold, status) {
    tab.classList[status]("active");
    if (fold) {
      if (status === "add") {
        fold.classList[status]("open");
        fadeIn({
          el: fold,
          timeout: 300,
        });
      } else {
        fold.classList[status]("open");
        fadeOut({
          el: fold,
          timeout: 300,
        });
      }
    }
  }

  hasEmptyFold() {
    const prevTabName = this.activeTab.getAttribute("data-tabs-nav");
    const prevFold = this.parent.querySelector(
      `[data-tabs-fold="${prevTabName}"]`
    );
    return !prevFold;
  }
}
