'use strict';

const preloader_init = function () {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('_active');
        })
    }
}();

const animation__init = function () {
    const animation = new AnimationListener({
        params: {
            reverse: true,
        },

        selectors: {
            '.hero-content__title>span:nth-child(1)': {
                duration: '1s',
            },
            '.hero-content__title>span:nth-child(2)': {
                duration: '1s',
                delay: '0.15s',
            },
            '.hero-content__title>span:nth-child(3)': {
                duration: '1s',
                delay: '0.2s',
            },
            '.hero-content__text': {
                duration: '1s',
                delay: '0.25s',
            },
            '.hero-content__button': {
                duration: '1s',
                delay: '0.3s',
            },
            '.home-inner__title': {},
            '.home-block__content': {
                direction: 'left',
            },
            '.home-block__image': {
                direction: 'right',
            },
            '.home-block__title': {
                delay: '0.15s',
            },
            '.home-block__text': {
                delay: '0.2s',
            },
            '.home-block__button': {
                delay: '0.25s',
            },
            '.testimonials-inner__title': {},
            '.testimonials-inner__swiper-wrapper': {
                delay: '0.15s',
            },
            '.facilities-content__title': {},
            '.facilities-content__text': {
                delay: '0.15s',
            },
            '.facilities-block': {},
            '.rooms-content__title': {},
            '.rooms-content__text': {
                delay: '0.15s',
            },
            '.rooms-block': {},
            '.rooms-block__title': {},
            '.rooms-description__details': {
                direction: 'left',
            },
            '.rooms-description__button': {
                direction: 'right',
            },
            '.contact-content__title': {},
            '.contact-content__text': {
                delay: '0.15s',
            },
            '.contact-data__address': {},
            '.contact-data__map': {
                delay: '0.15s',
            },
            '.contact-data__links': {
                delay: '0.2s',
            },
            '.contact-form__name': {},
            '.contact-form__email': {
                delay: '0.15s',
            },
            '.contact-form__message': {
                delay: '0.2s',
            },
            '.contact-form__button': {
                delay: '0.25s',
            },
        },
    });
}();

// Image background
const ibg_init = function () {
    const ibg = document.querySelectorAll('.ibg');
    for (let i = 0; i < ibg.length; i++) {
        if (ibg[i].querySelector('img')) {
            ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
        }
    }
}();

// Navigation
const navigation_init = function () {
    const hero = document.querySelector('.hero');
    const headerWrapper = document.querySelector('.header__wrapper');
    const burgerIcon = document.querySelector('.burger__icon');
    const burgerNav = document.querySelector('.burger__nav');

    if (burgerIcon && burgerNav) {
        // Burger icon
        burgerIcon.addEventListener('click', () => {
            document.body.classList.toggle('_lock');
            burgerIcon.classList.toggle('_active');
            burgerNav.classList.toggle('_active');
        })
    }

    const menuItems = burgerNav.querySelectorAll('.menu-item');
    const imageTabs = document.querySelectorAll('.hero-background>[data-tab]');
    const titleTabs = document.querySelectorAll('.hero-content__title[data-tab]');
    const sectionTabs = document.querySelectorAll('section[data-tab]');

    for (let menuItem of menuItems) {
        menuItem.addEventListener('click', (e) => {
            e.preventDefault();

            scrollTo({
                top: 0,
                behavior: 'smooth',
            });

            if (document.body.classList.contains('_lock')) {
                document.body.classList.toggle('_lock');
                burgerIcon.classList.toggle('_active');
                burgerNav.classList.toggle('_active');
            }

            for (const menuItem of menuItems) {
                if (menuItem.classList.contains('_active')) {
                    menuItem.classList.remove('_active');
                }
            }
            menuItem.classList.add('_active');

            const tabSelector = e.target.getAttribute('href').replace('#', '');
            for (const sectionTab of sectionTabs) {
                if (sectionTab.classList.contains('_active')) {
                    sectionTab.classList.remove('_active');
                }

                if (sectionTab.dataset.tab === tabSelector) {
                    sectionTab.classList.add('_active');
                }
            }

            for (const imageTab of imageTabs) {
                if (imageTab.classList.contains('_active')) {
                    imageTab.classList.remove('_active');
                }

                if (imageTab.dataset.tab === tabSelector) {
                    imageTab.classList.add('_active');
                }
            }
            
            for (const titleTab of titleTabs) {
                if (titleTab.classList.contains('_active')) {
                    titleTab.classList.remove('_active');
                }

                if (titleTab.dataset.tab === tabSelector) {
                    titleTab.classList.add('_active');
                }
            }
        });
    }
}();

const header__init = function () {
    const headerWrapper = document.querySelector('.header__wrapper');

    function stickyHeader() {
        if (scrollY > 40) {
            headerWrapper.classList.add('_active');
        } else {
            headerWrapper.classList.remove('_active');
        }
    }
    stickyHeader();

    window.addEventListener('scroll', stickyHeader);
}();

const hero__init = function () {
    const hero = document.querySelector('.hero');
    const headerWrapper = document.querySelector('.header__wrapper');
    const scrollDown = hero.querySelector('.hero-content__scroll-down');
    const menuItems = document.querySelectorAll('.menu-item');

    scrollDown.addEventListener('click', (e) => {
        e.preventDefault();

        const topValue = hero.offsetHeight - headerWrapper.offsetHeight;
        scrollTo({
            top: topValue,
            behavior: 'smooth',
        });
    });
}();

const rooms__init = function () {
    const roomsDescriptionDetails = document.querySelectorAll('.rooms-description__details');
    for (const roomsDescriptionDetail of roomsDescriptionDetails) {
        const roomsButton = roomsDescriptionDetail.querySelector('.rooms-description__details-button')
            .querySelector('a');
        const roomsInfo = roomsDescriptionDetail.querySelector('.rooms-description__details-info');

        roomsButton.addEventListener('click', (e) => {
            e.preventDefault();
            roomsDescriptionDetail.classList.toggle('_active');
            if (roomsDescriptionDetail.classList.contains('_active')) {
                roomsInfo.style.height = `${roomsInfo.scrollHeight}px`;
            } else {
                roomsInfo.style.height = `0px`;
            }
        })
    }
}();

const sliders__init = function () {
    const testimonialsSwiperSelector = document.querySelector('.testimonials-inner__swiper');
    const testimonialsPrev = testimonialsSwiperSelector.querySelector('.swiper-button-prev');
    const testimonialsNext = testimonialsSwiperSelector.querySelector('.swiper-button-next');
    const testimonialsSwiper = new Swiper(testimonialsSwiperSelector, {
        loop: true,
        autoHeight: true,
        speed: 500,
        autoplay: {
            delay: 5000,
        },
        navigation: {
            prevEl: testimonialsPrev,
            nextEl: testimonialsNext,
        },
    });

    const roomsBlockSwipers = document.querySelectorAll('.rooms-block__swiper');
    for (const roomsSwiperSelector of roomsBlockSwipers) {
        const roomsPagination = roomsSwiperSelector.querySelector('.swiper-pagination');
        const roomsSwiper = new Swiper(roomsSwiperSelector, {
            loop: true,
            autoHeight: true,
            grabCursor: true,
            pagination: {
                el: roomsPagination,
                clickable: true
            },
        });
    }
}();