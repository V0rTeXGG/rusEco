let pageContent = document.querySelector('.page-content')

if(pageContent) {
  let tables = pageContent.getElementsByTagName('table')
  for(let i = 0; i < tables.length; i++) {
    let tableWrapper = document.createElement('div')
    tableWrapper.classList.add('table-wrapper')
    tableWrapper.appendChild(tables[i].cloneNode(true));
    tables[i].parentNode.replaceChild(tableWrapper, tables[i]);
  }
}
