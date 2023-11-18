# Template-dev-webpack
## Краткая инструкция
### Начало работы
* `npm install` - установить node_modules
* `npm run watch` - запустить сборку
* `npm run favicon` - сгенерировать favicons
### Нюансы сборки
* в dev-temp.js необходимо заменить template-dev-webpack на название проекта
* все подключения скриптов компонентов закомментированы в `gulpfile.js`
* все подключения стилей компонентов закомментированы в `app/sass/style.scss`
* все файлы скриптов компонентов лежат в `app/js/custom-libs/*.js`
* все компоненты лежат отдельно в `app/blocks/components/*`
* используем только шрифт `.woff2`
* удаляем картинки-заглушки `app/img/image/template.jpg` и `app/img/image-content/template.jpg`
* удаляем шрифт-заглушку `app/fonts/template.woff2`
### Нюансы компонентов
* ко всем компонентам с предполагаемой высотой 100vh необходимо добавить `mixin adaptive-height` для более гибкого расчета
* если компонент `rating` не используется, необходимо удалить иконку `app/icons/single/star.svg`
* если компонент `tooltip` не используется, необходимо удалить иконку `app/icons/single/tooltip.svg`
* для sticky элемента используем свойство position: sticky, js реализацию используем только в крайних случаях. Если секции необходим overflow: hidden - используем класс section--no-overflow
* всем элементам с `position: fixed` нужно добавлять data-lock-scroll и оборачивать их в контейнер с `width: 100vw`, чтобы при `overflow: hidden` элементы не дергались
* класс `Modal` в файле `js/custom-libs/modal.js` :
  + валидация находится в конструкторе
  + метод `create` заполняется вручную в зависимости от нужд проекта
### Обновления компонентов
* обновлена функция `showThanks(form)`: теперь для её вызова нужно указать не `data-attribute` формы, а обратиться к элементу через `document.querySelector('имя формы')`
