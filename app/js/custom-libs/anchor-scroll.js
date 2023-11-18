document.addEventListener("DOMContentLoaded", function () {
    if (document.querySelector('a[href*="#"]')) {
        const anchors = document.querySelectorAll('a[href*="#"]');
        for (let anchor of anchors) {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const blockID = anchor.getAttribute('href').split('#')[1];
                document.getElementById(blockID).scrollTo({
                    top: 0,
                    behavior: 'smooth'
                })
            })
        }
    }
})