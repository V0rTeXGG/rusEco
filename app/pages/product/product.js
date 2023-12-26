let accordionsTable = Array.from(document.querySelectorAll("[data-table-accordion]"))

console.log(accordionsTable)

accordionsTable.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.target.classList.add('active')
  })
})

