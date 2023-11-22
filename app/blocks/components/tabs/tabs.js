const tabs = document.querySelectorAll('[data-tabs]')

if(tabs) {
  tabs.forEach((element) => {
    let tab = new Tabs(element, {})
  })
}
