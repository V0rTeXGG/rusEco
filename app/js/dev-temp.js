function devLinkUrl() {
    let thisDomainPage = window.location.hostname;
    let links = document.querySelectorAll('a');

    links.forEach(function(item){
        let thisLink = item.getAttribute('href');
        let linkDev = '/template-dev-webpack' + thisLink;
        if ((thisDomainPage === 'dev.texteh.ru') && (thisLink[0] === '/')) {
            item.setAttribute('href', linkDev);
        }
    });
}
document.addEventListener("DOMContentLoaded", function(){
    devLinkUrl();
});