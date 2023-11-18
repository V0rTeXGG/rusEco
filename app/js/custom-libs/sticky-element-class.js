class StickyElement {
  constructor(selector, options) {
    this.selector = selector;
    this.parent = this.selector.closest(
      `[${options.parentAttr ? options.parentAttr : "data-sticky"}]`
    );
    this.fixedClass = options.fixedClass
      ? options.fixedClass
      : "sticky__element--fix";
    this.absoluteClass = options.absoluteClass
      ? options.absoluteClass
      : "sticky__element--absolute";
    this.topOffset = options.topOffset ? +options.topOffset : 0;
    this.unsetSticky = options.unsetSticky ? +options.unsetSticky : 991;
    this.isOnView = false;

    this.stickyElementScroll();
    this.isElementInViewport(this.parent);
    this.stickyEvents();
  }

  stickyEvents() {
    window.addEventListener("scroll", () => {
      if (this.isOnView) {
        this.stickyElementScroll();
      }
    });

    window.addEventListener("resize", () => this.clearStickyStyle());
  }

  // очищение стилей и классов
  clearStickyStyle() {
    if (window.innerWidth <= this.unsetSticky) {
      this.toggleClass("remove", "remove");
      this.toggleStyle();
    }
  }

  // проверка, находится ли элемент в зоне видимости
  isElementInViewport(el) {
    const checkView = ([entry]) => {
      this.isOnView = entry.isIntersecting;
    };

    const observer = new IntersectionObserver(checkView, {});
    observer.observe(el);
  }

  // прокрутка элемента
  stickyElementScroll() {
    if (
      !(window.innerWidth > this.unsetSticky &&
    this.selector.clientHeight < this.parent.clientHeight)
    ) {
      return;
    }
    const stickyElementWidth = this.selector.offsetWidth;
    const stickyBlockOffset =
    this.parent.getBoundingClientRect().y + window.pageYOffset;
    const stickyBlockHeight =
    this.parent.clientHeight - this.selector.clientHeight;
    const scrollStart = stickyBlockOffset - this.topOffset;

    if (
      window.scrollY >= scrollStart &&
      window.scrollY < scrollStart + stickyBlockHeight
    ) {
      this.toggleClass("add", "remove");
      this.toggleStyle(`${stickyElementWidth}px`, `${this.topOffset}px`);
    } else if (window.scrollY < stickyBlockOffset) {
      this.toggleClass("remove", "remove");
      this.toggleStyle();
    } else {
      this.toggleClass("remove", "add");
      this.toggleStyle(`${stickyElementWidth}px`);
    }
  }

  toggleClass(fixEvent, absoluteEvent) {
    this.selector.classList[fixEvent](this.fixedClass);
    this.selector.classList[absoluteEvent](this.absoluteClass);
  }

  toggleStyle(width = "", top = "") {
    this.selector.style.top = top;
    this.selector.style.width = width;
  }
}
