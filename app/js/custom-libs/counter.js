class Counter {
    constructor() {
        this.minButton = document.querySelectorAll('[data-counter="minus"]');
        this.maxButton = document.querySelectorAll('[data-counter="plus"]');
    }
    clickCounter(buttons, minusCount, minusToggle, plusCount, plusToggle, countCrement) {
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                let counterBox = button.closest('[data-counter-box]');
                let input = counterBox.querySelector('[data-counter-input="input"]');
                let minus = counterBox.querySelector('[data-counter="minus"]');
                let plus = counterBox.querySelector('[data-counter="plus"]');
                let inputMinValue = +(input.getAttribute('data-counter-min'));
                let inputMaxValue = +(input.getAttribute('data-counter-max'));

                if(input.value == inputMinValue + minusCount) {
                    this.countToggleDisable(minus, minusToggle);
                }
                if(input.value == (inputMaxValue - plusCount)) {
                    this.countToggleDisable(plus, plusToggle);
                }
                input.value = +input.value + countCrement;
            });
        });
    }
    clickAllButtons() {
        this.clickCounter(this.minButton, 1, 'add', 0, 'remove', -1);
        this.clickCounter(this.maxButton, 0, 'remove', 1, 'add', 1);
    }
    countToggleDisable(name, status) {
        name.classList[status]('count--disable');
    }
    setDisable(item, state, name) {
        let counterState = item.getAttribute(`data-counter-${state}`);
        let inputValue = item.value;
        if(inputValue == counterState) {
            this.countToggleDisable(item.closest('[data-counter-box]').querySelector(`[data-counter=${name}]`), 'add')
        }
    }
    setValue(item, state, name) {
        item.value = item.value.replace(/\D/g, '').replace(/^0+/, '');
        let stateValue = +(item.getAttribute(`data-counter-${state}`));
        name = item.closest('[data-counter-box]').querySelector(`[data-counter=${name}]`);
        if(name.classList.contains('count--disable')) {
            name.classList.remove('count--disable')
        }
        if(state == 'min') {
            if(item.value == '' || item.value <= stateValue) {
                item.value = stateValue;
                if(!this.countToggleDisable(name, 'contains')) {
                    this.countToggleDisable(name, 'add');
                }
            }
        } else if(state == 'max') {
            if (item.value >= stateValue) {
                item.value = stateValue;
                if (!this.countToggleDisable(name, 'contains')) {
                    this.countToggleDisable(name, 'add')
                }
            }
        }
    }
}

if(document.querySelector('[data-counter-input="input"]')) {
    let counter = new Counter();
    counter.clickAllButtons();
    let counterInput = document.querySelectorAll('[data-counter-input="input"]');
    counterInput.forEach((input) => {
        counter.setDisable(input, 'min', 'minus');
        counter.setDisable(input, 'max', 'plus');

        input.addEventListener('input', () => {
            if(!input.getAttribute('data-counter-min') == '') {
                counter.setValue(input, 'min', 'minus');
            }
            if(!input.getAttribute('data-counter-max') == '') {
                counter.setValue(input, 'max', 'plus');
            }
            input.value = input.value.replace(/\D/g, '').replace(/^0+/, '');
        })
    })
}