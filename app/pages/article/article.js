let articleContent = document.querySelector('.article__content')

if(articleContent) {
  let tables = articleContent.getElementsByTagName('table')
  for(let i = 0; i < tables.length; i++) {
    let tableWrapper = document.createElement('div')
    tableWrapper.classList.add('table-wrapper')
    tableWrapper.appendChild(tables[i].cloneNode(true));
    tables[i].parentNode.replaceChild(tableWrapper, tables[i]);
  }
}
