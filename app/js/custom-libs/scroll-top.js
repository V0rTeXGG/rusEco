document.addEventListener("DOMContentLoaded", function () {
    if (document.querySelector("[data-scroll-top]")) {
        const btnScrollTop = document.querySelector("[data-scroll-top]");
        scrollTop(btnScrollTop);
    }
});

function scrollTop(el) {
    const windowHalfHeight = window.innerHeight / 2;
    document.addEventListener("scroll", function () {
        if(window.scrollY > windowHalfHeight) {
            if(el.style.display !== 'block') {
                fadeIn({
                    el: el,
                    timeout: 500,
                    display: 'block'
                });
            }
        } else {
            if(el.style.display === 'block') {
                fadeOut({
                    el: el,
                    timeout: 500
                });
            }
        }
    });
    el.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}
