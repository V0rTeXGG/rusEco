class Cookie {
  constructor(parent, options) {
    this.parent = parent;
    this.name = options.name;
    this.period = +options.period;
    this.path = options.path || "/";
    this.value = options.value || "true";
    this.checkCookie();
    this.addButtonEvent();
  }

  addButtonEvent() {
    const agreeBtns = this.parent.querySelectorAll(`[data-cookie-agree]`);
    agreeBtns.forEach((agreeBtn) => {
      agreeBtn.addEventListener("click", () => this.setCookie());
    });
  }

  setCookie() {
    const date = new Date();
    date.setDate(date.getDate() + this.period);
    document.cookie = `${this.name}=${this.value}; path=${this.path}; expires=${date}`;
    this.parent.style.display = "none";
  }

  checkCookie() {
    const showCookie = this.getCookieByName(this.name);
    if (showCookie != this.value && this.parent) {
      this.parent.style.display = "block";
    }
  }

  deleteCookie() {
    document.cookie = `${this.name}=${this.value}; path=${this.path}; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
  }

  getCookieByName(name) {
    const matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
          "=([^;]*)"
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
}