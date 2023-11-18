class loadInputFiles {
  constructor(parentAttr, options) {
    this.parentAttr = parentAttr;
    if (this.parentAttr) {
      this.nameInput = options.nameInput || "file";
      this.maxFiles = +options.maxFiles;
      this.minFiles = +options.minFiles;
      this.maxFileSize = +options.maxFileSize || false;
      this.imageThumbs = options.imageThumbs || false;
      this.sizeThumbs = options.sizeThumbs || false;
      this.acceptedFiles = options.acceptedFiles;
      this.parentClass = options.parentClass || "fileupload";
      this.inputOrder = 0;
      this.uploadButton = this.parentAttr.querySelector(
        `[data-fileupload-button]`
      );
      this.init();
    }
  }

  init() {
    this.parentAttr.addEventListener("change", (e) =>
      this.attachFile(e.target)
    );
    this.parentAttr.addEventListener("click", (e) =>
      this.deleteButtonEvent(e.target)
    );
    this.uploadButton.addEventListener("click", () => this.uploadButtonEvent());
  }

  clear() {
    if (!this.parentAttr) {
      return;
    }
    const inputElements = this.parentAttr.querySelectorAll(
      "[data-fileupload-input], [data-fileupload-list]"
    );
    inputElements.forEach((element) => {
      element.remove();
    });
    this.inputOrder = 0;
    this._toggleButtonClass("remove");
  }

  // событие для кнопки "Прикрепить файл". генерирует инпуты и открывает проводник
  uploadButtonEvent() {
    const inputTmp = this._inputTemplate();
    const listTemplate = this._listTemplate();
    const prevInput = this.parentAttr.querySelector(
      `[data-fileupload-input="filegroup_${this.inputOrder - 1}"]`
    );
    let currentInput;
    const itemsLength = this.parentAttr.querySelectorAll(
      `[data-fileupload-item]`
    ).length;
    if (itemsLength != this.maxFiles) {
      // добавляем обертку для превью, если её нет
      if (!this.parentAttr.querySelector(`[data-fileupload-list]`)) {
        this.uploadButton.insertAdjacentHTML("afterEnd", listTemplate);
      }

      // проверяем, если есть предыдущий инпут и он пустой - открываем проводник для этого инпута.
      // иначе генерируем новый инпут и открываем проводник
      if (prevInput && prevInput.value === "") {
        prevInput.click();
      } else {
        this.uploadButton.insertAdjacentHTML("afterEnd", inputTmp);
        currentInput = this.parentAttr.querySelector(
          `[data-fileupload-input="filegroup_${this.inputOrder}"]`
        );
        currentInput.click();
        ++this.inputOrder;
      }
    }
  }

  // событие для кнопки удаления файла
  deleteButtonEvent(deleteBtn) {
    if (!deleteBtn.hasAttribute(`data-fileupload-delete`)) {
      return;
    }
    const deleteId = deleteBtn.getAttribute(`data-fileupload-delete`);
    this._toggleButtonClass("remove");
    this.parentAttr
    .querySelector(`[data-fileupload-input=${deleteId}]`)
    .remove();
    deleteBtn.closest(`[data-fileupload-item]`).remove();
  }

  // генерация превью
  attachFile(input) {
    if (input === this.parentAttr.querySelector(`[data-fileupload-input]`)) {
      if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const file = input.files[0];
          const fileSize = file.size;
          const fileImage =
            file.type.split("/")[0] === "image" ? e.target.result : "";
          const fileName = file.name;
          const inputId = input.getAttribute(`data-fileupload-input`);
          const fileTmp = this._previewTemplate(
            fileImage,
            fileName,
            fileSize,
            inputId
          );
          let fileItems;
          // если загруженный файл весит больше, чем задано в опциях, то выводим alert с ошибкой. иначе генериуем превью
          if (fileSize < this.maxFileSize || !this.maxFileSize) {
            this.parentAttr
              .querySelector(`[data-fileupload-list]`)
              .insertAdjacentHTML("beforeend", fileTmp);
            fileItems = this.parentAttr.querySelectorAll(
              `[data-fileupload-item]`
            ).length;
            //если количество загруженных файлов равно максимальному количеству, то скрываем кнопку загрузки
            this._toggleButtonClass(
              fileItems === this.maxFiles ? "add" : "remove"
            );
            return;
          }
          input.value = "";
          if (typeof this.addErrors == "function") {
            this.addErrors();
          }
        };

        reader.readAsDataURL(input.files[0]);
      }
    }
  }

  // шаблон для загруженного превью
  _previewTemplate(fileImage, fileName, fileSize, inputId) {
    let imageTmp = "";
    let sizeTmp = "";

    if (this.imageThumbs && fileImage) {
      imageTmp = `
        <div class="${this.parentClass}__item-imageholder">
          <img class="${this.parentClass}__item-image" src=${fileImage}>
        </div>
      `;
    }

    if (this.sizeThumbs) {
      sizeTmp = `
        <span class="${this.parentClass}__item-size">
          ${this._formatSize(fileSize)}
        </span>
      `;
    }

    return `
      <div class="${this.parentClass}__item" data-fileupload-item="">
        ${imageTmp}
        <span class="${this.parentClass}__item-title">${fileName}</span>
        ${sizeTmp}
        <div class="${this.parentClass}__item-delete" data-fileupload-delete="${inputId}"></div>
      </div>
    `;
  }

  // шаблон для инпута
  _inputTemplate() {
    const acceptTmp = this.acceptedFiles ? `accept="${this.acceptedFiles}"` : "";
    return `
      <input type="file" name="${this.nameInput}" ${acceptTmp} class="${this.parentClass}__input" data-fileupload-input="filegroup_${this.inputOrder}">
    `;
  }

  // шаблон для обертки списка превью
  _listTemplate() {
    return `
      <div class="${this.parentClass}__list" data-fileupload-list=""></div>
    `;
  }

  _toggleButtonClass(eventName) {
    this.uploadButton.classList[eventName]("diasbled");
  }

  // перевод байтов в более высокие единицы
  _formatSize(defaultSize) {
    const types = ["байт", "Кб", "Мб", "Гб"];
    const i = parseInt(Math.floor(Math.log(defaultSize) / Math.log(1024)));
    return `${Math.round(defaultSize / Math.pow(1024, i), 2)} ${types[i]}`;
  }
}
