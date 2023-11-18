document.addEventListener("DOMContentLoaded", function () {
    if (document.querySelector("[data-tippy]")) {
        const tooltips = document.querySelectorAll("[data-tippy]");

        if (tooltips.length) {
            tooltips.forEach((tooltip) => {
                const addCloseBtn = tooltip.dataset.tippyClose ? true : false;

                tippy(tooltip, {
                    content: (reference) => {
                        return reference.querySelector("[data-tippy-content]")
                            ? reference.querySelector("[data-tippy-content]").innerHTML
                            : reference.dataset.tooltipContent;
                    },
                    allowHTML: true,
                    interactive: true,
                    onShow(instance) {
                        if (
                            addCloseBtn &&
                            !instance.popper.querySelector("[data-tippy-close]")
                        ) {
                            createCloseBtn(instance);
                        }

                        if (instance.popper.querySelector("[data-tippy-close]")) {
                            addCloseBtnEvents(instance);
                        }
                    },
                    onHide(instance) {
                        if (instance.popper.querySelector("[data-tippy-close]")) {
                            removeCloseBtnEvents(instance);
                        }
                    },
                });
            });
        }

        function createCloseBtn(instance) {
            const btnClose = document.createElement("button");

            btnClose.classList.add("tippy-close");
            btnClose.setAttribute("data-tippy-close", "");
            instance.popper.querySelector(".tippy-content").appendChild(btnClose);
        }

        function addCloseBtnEvents(instance) {
            instance.popper
                .querySelector("[data-tippy-close]")
                .addEventListener("click", () => {
                    instance.hide();
                });
        }

        function removeCloseBtnEvents(instance) {
            instance.popper
                .querySelector("[data-tippy-close]")
                .removeEventListener("click", () => {
                    instance.hide();
                });
        }
    }
});
