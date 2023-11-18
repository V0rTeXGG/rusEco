class customInputMask {
  constructor(parent, options) {
    this.parent = parent;
    this.input = this.parent.querySelector("[data-mask-tel]");
    this.parentClass = options.parentClass || "input-mask";
    this.validationData = options.validationData || null;
    if (options.needDropdown) {
      this.needDropdown = options.needDropdown;
      this.dropdown = null;
      this.dropdownItems = null;
      this.dropdownButton = null;
      this.activeCountry = options.activeCountry || "ru";
      this.onlyCountries = options.onlyCountries || null;
      this.excludeCountries = options.excludeCountries || null;
      this.dropNameTmp = options.dropNameTmp || `rus (en)`;
      if (options.needFlags) {
        this.needFlags = options.needFlags;
        this.flagWidth = options.flagWidth || 18;
        this.flagHeight = options.flagHeight || 12;
      }
    } else {
      this.singleMask = options.mask || "+7 (___) ___-__-__";
    }

    this.back = false;
    this.accept = new RegExp("\\d", "g");
    this.slots = new Set("_");
    this.pattern = null;
    this.prev = null;
    this.first = null;

    this.init();
  }

  init() {
    if (this.needDropdown) {
      this.updateVars(customCountries[this.activeCountry].mask);
      this.dropList();
      this.dropListButton();
      this.dropListEvents();
    }
    if (this.singleMask) {
      this.updateVars(this.singleMask);
    }
    if (this.validationData) {
      this.validationData.maskLength = this.pattern.length;
      this.validationData.update();
    }
    this.inputListeners();
  }

  // отрисовка списка стран
  dropList() {
    const dropdownHolder = `
        <div
            class="${this.parentClass}__options" 
            data-input-mask-options
        >
            ${this.dropListItems()}
        </div>
    `;

    this.parent.insertAdjacentHTML("afterbegin", dropdownHolder);
    this.dropdown = this.parent.querySelector("[data-input-mask-options]");
    this.dropdownItems = this.parent.querySelectorAll("[data-input-mask-code]");
  }

  // отрисовка элементов внутри списка стран
  dropListItems() {
    const countries = this.getCountryList();
    let dropdownItem = "";
    let flagTmp = "";

    Object.entries(countries).forEach((country) => {
      const countryCode = country[0];
      const countryInfo = country[1];
      const activeClass =
        this.activeCountry === countryCode
          ? `${this.parentClass}__options-item--active`
          : "";

      if (this.needFlags) {
        flagTmp = this.dropFlag("options", countryInfo.flagOrder);
      }

      dropdownItem += `            
            <div 
                class="${this.parentClass}__options-item ${activeClass}" 
                data-input-mask-code="${countryCode}"
            >
                <div 
                    class="${this.parentClass}__options-country"
                >
                    ${this.nameTemplate(countryInfo)}
                </div>
                <div 
                    class="${this.parentClass}__options-code">
                    ${countryInfo.code}
                </div>
                ${flagTmp}
            </div>
        `;
    });

    return dropdownItem;
  }

  // отрисовка кнопки для списка стран
  dropListButton() {
    let buttonContent;
    let button;
    let flagOrder;

    if (this.needFlags) {
      flagOrder = customCountries[this.activeCountry].flagOrder;
      buttonContent = this.dropFlag("button", flagOrder);
    } else {
      buttonContent = `
            <span 
                class="${this.parentClass}__button-code" 
                data-input-mask-button-code
            >
                ${this.activeCountry}
            </span>
        `;
    }

    button = `
            <div 
                class="${this.parentClass}__button" 
                data-input-mask-button
            >
                ${buttonContent}
                <span class="${this.parentClass}__arrow"></span>
            </div>
        `;

    this.parent.insertAdjacentHTML("afterbegin", button);
    this.dropdownButton = this.parent.querySelector("[data-input-mask-button]");
  }

  // отрисовка флага списка стран
  dropFlag(type, flag) {
    return `
        <div 
            class="${this.parentClass}__flag 
            ${this.parentClass}__${type}-flag" 
            ${type == "button" ? "data-input-mask-flag" : ""}
            style="background-position: ${this.calcBgPosition(flag)};"
        ></div>
    `;
  }

  // рассчет позиции фона флага
  calcBgPosition(order) {
    const horizontal = (order - 1) * Number(this.flagWidth);
    return `-${horizontal}px ${this.flagHeight}px`;
  }

  // переключение видимости селекта со списком стран
  toggleDropdown(eventName) {
    this.dropdownButton.classList[eventName](
      `${this.parentClass}__button--active`
    );
    this.dropdown.classList[eventName](`${this.parentClass}__options--open`);
  }

  //   события для списка стран
  dropListEvents() {
    this.dropdownButton.addEventListener("click", () => {
      this.toggleDropdown("toggle");
    });

    document.addEventListener("mouseup", () => {
      this.dropdownClickOutside();
    });

    this.dropdownItems.forEach((option) => {
      option.addEventListener("click", () => {
        this.changeCountry(option);
        this.input.focus();
      });
    });

    document.addEventListener("keydown", () => {
      // this.dropdownSearch();
    });
  }

  // подмена маски при выборе страны
  changeCountry(choosen) {
    const country = choosen.getAttribute("data-input-mask-code");
    let prevCountry;
    this.dropdownItems.forEach((item) => {
      item.classList.remove(`${this.parentClass}__options-item--active`);
    });
    choosen.classList.add(`${this.parentClass}__options-item--active`);

    if (this.activeCountry != country) {
      prevCountry = this.activeCountry;
      this.activeCountry = country;
      this.dropListButtonContent();

      if (prevCountry != null) {
        this.updateVars(customCountries[this.activeCountry].mask);
        this.input.value = this.input.value.replace(
          customCountries[prevCountry].code,
          customCountries[this.activeCountry].code
        );
        this.format();

        if (this.validationData) {
          this.validationData.maskLength = this.pattern.length;
          this.validationData.update();
        }
      }
    }

    this.toggleDropdown("toggle");
  }

  // замена контента кнопки при выборе страны
  dropListButtonContent() {
    if (this.needFlags) {
      const flagButton = this.parent.querySelector("[data-input-mask-flag]");
      const flagOrder = customCountries[this.activeCountry].flagOrder;
      flagButton.style.backgroundPosition = this.calcBgPosition(flagOrder);
      return;
    }
    const codeButton = this.parent.querySelector(
      "[data-input-mask-button-code]"
    );
    codeButton.textContent = this.activeCountry;
  }

  // закрытие селекта со списком стран при клике вне блока
  dropdownClickOutside() {
    const target = event.target;
    let isDropdownButton;
    let isDropdownList;
    if (
      !this.dropdown.classList.contains(`${this.parentClass}__options--open`)
    ) {
      return;
    }
    isDropdownButton =
      target == this.dropdownButton || this.dropdownButton.contains(target);
    isDropdownList = target == this.dropdown || this.dropdown.contains(target);

    if (!isDropdownButton && !isDropdownList) {
      this.toggleDropdown("remove");
    }
  }

  // шаблон для вывода навания стран
  nameTemplate(item) {
    const mapObj = {
      en: item.en,
      local: item.local,
      rus: item.rus,
    };
    return this.dropNameTmp
      .replace(/en|local|rus/gi, function (matched) {
        return mapObj[matched];
      })
      .replace(/\(\)/g, "")
      .replace(/\[\]/g, "");
  }

  // получаем список стран по настройкам
  getCountryList() {
    if (this.onlyCountries && this.onlyCountries.length) {
      return this.getOnlyCountries();
    } else if (this.excludeCountries && this.excludeCountries.length) {
      return this.getExcludeCountries();
    }
    return customCountries;
  }

  // получить только выбранные страны
  getOnlyCountries() {
    return Object.keys(customCountries)
      .filter((key) => this.onlyCountries.includes(key))
      .reduce((obj, key) => {
        obj[key] = customCountries[key];
        return obj;
      }, {});
  }

  // получить все страны кроме выбраных
  getExcludeCountries() {
    return Object.keys(customCountries)
      .filter((key) => !this.excludeCountries.includes(key))
      .reduce((obj, key) => {
        obj[key] = customCountries[key];
        return obj;
      }, {});
  }

  // события для инпута
  inputListeners() {
    this.input.addEventListener("keydown", (e) => {
      this.back = e.key === "Backspace";
    });
    this.input.addEventListener("input", () => this.format());
    this.input.addEventListener("click", () => this.format());
    this.input.addEventListener("focus", () => this.format());
    this.input.addEventListener("blur", () => {
      this.input.value ===
        this.pattern.substring(0, this.pattern.indexOf("_")) &&
        (this.input.value = "");
    });
  }

  // форматирование значение инпута
  format() {
    const [i, j] = [this.input.selectionStart, this.input.selectionEnd].map(
      (i) => {
        i = this.clean(this.input.value.slice(0, i)).findIndex((c) =>
          this.slots.has(c)
        );
        return i < 0
          ? this.prev[this.prev.length - 1]
          : this.back
          ? this.prev[i - 1] || this.first
          : i;
      }
    );

    this.input.value = this.clean(this.input.value).join``;
    if (this.input.value.indexOf("_") != -1) {
      this.input.value = this.input.value.substring(
        0,
        this.input.value.indexOf("_")
      );
    }
    this.input.setSelectionRange(i, j);
    this.back = false;
  }

  // форматирование по маске
  clean(input) {
    input = input.match(this.accept) || [];
    return Array.from(this.pattern, (c) =>
      input[0] === c || this.slots.has(c) ? input.shift() || c : c
    );
  }

  // обновление значений маски
  updateVars(mask) {
    this.pattern = mask;
    this.prev = ((j) =>
      Array.from(this.pattern, (c, i) =>
        this.slots.has(c) ? (j = i + 1) : j
      ))(0);
    this.first = [...this.pattern].findIndex((c) => this.slots.has(c));
    this.maxMaskLength();
  }

  // получение длины маски
  maxMaskLength() {
    this.input.setAttribute("maxlength", this.pattern.length);
  }
}
