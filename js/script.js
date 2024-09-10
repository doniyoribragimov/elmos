jQuery(document).ready(function ($) {
    $('.info__plus').on('click', function(){
        let initialNum = parseInt($(this).closest('.info__acts').find('.info__number').text());
        initialNum++;
        $(this).closest('.info__acts').find('.info__number').text(initialNum);
    });
    
    $('.info__minus').on('click', function(){
        let initialNum = parseInt($(this).closest('.info__acts').find('.info__number').text());
        initialNum = Math.max(0, initialNum - 1);
        $(this).closest('.info__acts').find('.info__number').text(initialNum);
    });

    // ДЛЯ DISABLED КНОПКИ, ЕСЛИ ЧЕКБОКС В ФОРМЕ НЕ CHECKED
    $('.form__confirm input').click(function () {
        var isChecked = $(this).prop('checked');
        var $submitButton = $(this).closest('.form').find('button[type="submit"]');
        $submitButton.prop('disabled', !isChecked);
    });

    // ДЛЯ ОТКРЫТИЯ МОДАЛКИ
    function openModalOrMenu(trigger, targetSelector) {
        $(trigger).addClass('active');
        $('body').css('overflow-y', 'hidden');
        $(targetSelector).on('click', function (e) {
            if (e.target === this) {
                $(this).removeClass('active');
                $('body').css('overflow-y', 'initial');
            }
        });
    }

    // ДЛЯ ЗАКРЫТИЯ МОДАЛКИ, КОГДА ПРОКЛИКАНО ЗА ПРЕДЕЛЫ МОДАЛКИ
    function closeModalOrMenu(trigger) {
        $(trigger).removeClass('active');
        $('body').css('overflow-y', 'initial');
    }

    // ДЛЯ ВЫБОРА HREF ДЛЯ МОДАЛКИ
    $('a.getModal').on('click', function (e) {
        e.preventDefault();
        let triggerHref = $(this).attr('href');
        openModalOrMenu(triggerHref, triggerHref);  
    });

    // ДЛЯ ЗАКРЫТИЯ МОДАЛКИ
    $('.modal__close').on('click', function () {
        closeModalOrMenu($(this).parents('.modal'));
    });

    // ДЛЯ ЗАКРЫТИЯ МОБИЛЬНОГО МЕНЮ
    $('.mobile-menu__close, .mobile-menu, .mobile-menu a').on('click', function () {
        closeModalOrMenu($(this).parents('.mobile-menu'));
    });

    $('.header__btn').on('click', function(){
        $('.header__dropdown').toggleClass('active')
    })
});

// МАСКА ДЛЯ ТЕЛЕФОНА В input[type='tel']
let maskedPhones = document.querySelectorAll("input[type='tel']");
for (var i = 0; i < maskedPhones.length; i++) {
    new IMask(maskedPhones[i], {
        mask: '+{7} (000) 000-00-00',
        placeholder: {
            show: 'always'
        }
    });
}


// ДЛЯ ЗАКРЫТИЯ МОДАЛКИ, КОГДА ПРОКЛИКАНО ЗА ПРЕДЕЛЫ МОДАЛКИ - УНИВЕРСАЛЬНЫЙ
let body = document.querySelector('body')
function closeModal(modalName, reverse = false) {
    modalName = document.querySelector(modalName)
    window.addEventListener('click', function (e) {
        if (reverse) {
            if (e.target === modalName) {
                modalName.classList.remove('active')
                body.style.overflowY = 'initial'

            }
        } else {
            if (e.target !== modalName) {
                modalName.classList.remove('active')
                body.style.overflowY = 'initial'

            }
        }

    })
}
closeModal('.modal', true)
closeModal('.mobile-menu', true)

// ФУНКЦИЯ ДЛЯ ТАБОВ
function createTab(tabName, contentName) {
    tabName = document.querySelectorAll(tabName);
    contentName = document.querySelectorAll(contentName);
    let tabsArray = Array.from(tabName)
    tabsArray.map((tab, tabIndex) => {
        tab.addEventListener('click', function (e) {
            e.preventDefault();
            for (let tabAll of tabName) tabAll.classList.remove('active')
            this.classList.add('active')

            for (let tabsContents of contentName) tabsContents.classList.remove('active')
            contentName[tabIndex].classList.add('active')
        })
    })
}
createTab('.info .tabs__item', '.info .tabs__content')
createTab('.cards .tabs__item', '.cards .tabs__content')
createTab('.cards__tab', '.cards .tabs__content')

// ФУНКЦИЯ ДЛЯ АККОРДИОНОВ - УНИВЕРСАЛЬНЫЙ
function createAccordion(target, content, singleOn, startFrom) {
    const styleSheet = document.styleSheets[0]
    styleSheet.insertRule('.accordion-style { max-height: 0; overflow: hidden; transition: max-height 0.2s ease-out }', styleSheet.cssRules.length);
    target = document.querySelectorAll(target)
    content = document.querySelectorAll(content)


    for (let contentItem of content) {
        // parent creating
        let parentElement = document.createElement('div');

        // adding class to parent
        parentElement.classList.add('accordion-content');

        contentItem.parentNode.insertBefore(parentElement, contentItem);
        parentElement.appendChild(contentItem);
        parentElement.classList.add('accordion-style')
    }

    if (target[startFrom]) {
        target[startFrom].classList.add('active')
        let nextElement = target[startFrom].nextElementSibling
        nextElement.style.maxHeight = nextElement.scrollHeight + "px";
    }



    if (singleOn) {
        for (let targetItem of target) {
            targetItem.addEventListener('click', function () {
                for (let targetItem of target) {
                    targetItem.classList.remove('active')
                    targetItem.nextElementSibling.style.maxHeight = null;
                }

                this.classList.toggle('active')
                itemContent = this.nextElementSibling;

                if (itemContent.style.maxHeight) {
                    itemContent.style.maxHeight = null;
                } else {
                    itemContent.style.maxHeight = itemContent.scrollHeight + "px";
                }
            })
        }

    } else {
        for (let targetItem of target) {
            targetItem.addEventListener('click', function () {
                this.classList.toggle('active')
                itemContent = this.nextElementSibling;
                if (itemContent.style.maxHeight) {
                    itemContent.style.maxHeight = null;
                } else {
                    itemContent.style.maxHeight = itemContent.scrollHeight + "px";
                }
            })
        }
    }
}
createAccordion('.mobile-menu__list img', '.mobile-menu__list ul', false)

// ДЛЯ ОТОБРАЖЕНИЯ КАРТЫ
function init() {
    let myMap = new ymaps.Map('contactMap', {
        center: [55.755863, 37.617700],
        zoom: 15,
        controls: []
    }, {
        searchControlProvider: 'yandex#search'
    });
    myplacemark = new ymaps.GeoObject({
        geometry: {
            type: "Point",
            coordinates: [55.755863, 37.617700]
        },
        properties: {
            hintContent: 'Москва'
        }
    });
    myMap.behaviors.disable('scrollZoom');
    myMap.controls.add('zoomControl');
    myMap.controls.add('rulerControl', {
        scaleLine: false
    });
    myMap.geoObjects.add(myplacemark);
}
let maps = document.querySelectorAll("#contactMap");
if (maps.length > 0) {
    ymaps.ready(init);
}

// SWIPER слайдеры
const viewSlider = new Swiper('.view__slider', {
    loop: true,
    slidesPerView: 1,
    speed: 1500,
    autoplay: true,
    autoplaySpeed: 2000,
    effect: 'fade',
    autoHeight: true,
    fadeEffect: {
        crossFade: true
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
   
});

const photosSlider = new Swiper('.name__slider', {
    loop: true,
    spaceBetween: 30,
    slidesPerView: 3,
    navigation: {
        prevEl: ".name__slider .arrow__left",
        nextEl: ".name__slider .arrow__right",
    },
    pagination: {
        el: '.name__slider .swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 10,
        },

        620: {
            spaceBetween: 20,
            slidesPerView: 2,
        },

        1400: {
            slidesPerView: 3,
        },
    }
});

