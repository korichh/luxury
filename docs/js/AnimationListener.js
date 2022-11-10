'use strict';

const AnimationListener = function () {
    // Defaults
    const DEFAULT_PARAMS = {
        leftRightAction: 1.3,
        bottomAction: 1.15,
        reverse: false,
        mobile: false,
    };

    const DEFAULT_OPTIONS = {
        duration: '0.3s',
        function: 'ease',
        delay: '0.1s',
        direction: 'bottom',
    };

    // Variables
    let elements = [];
    let elementsOptions = [];

    // Functions
    function isMobile() {
        return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ||
            (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) ||
            ('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/))
            ? true : false;
    }

    function extend(defaults, options) {
        let results = {};
        for (const key in defaults) {
            (typeof options[key] !== 'undefined') ? results[key] = options[key] : results[key] = defaults[key];
        }
        return results;
    }

    function stylize(elem, properties) {
        for (const property in properties) {
            elem.style[property] = properties[property];
        }
    }

    // Class
    class AnimationListener {
        constructor({
            params,
            selectors
        }) {
            this.params = extend(DEFAULT_PARAMS, params || {});

            if (!this.params.mobile && isMobile()) return;

            for (const selector in selectors) {
                const elementsList = document.querySelectorAll(selector);
                if (elementsList.length == 0) throw new Error('Invalid selector.');
                const options = extend(DEFAULT_OPTIONS, selectors[selector]);

                for (const element of elementsList) {
                    elements.push(element);
                    elementsOptions.push(options);
                }
            }

            this._init();
            this._event();
        }

        /** @private */
        _init() {
            for (let i = 0; i < elements.length; i++) {
                const element = elements[i];
                const elementOptions = elementsOptions[i];

                stylize(element, {
                    opacity: '0',
                });

                if (elementOptions.direction === 'left') {
                    stylize(element, {
                        transform: `translate(-100px, 0px)`,
                    });
                } else if (elementOptions.direction === 'bottom') {
                    stylize(element, {
                        transform: `translate(0px, 40px)`,
                    });
                } else if (elementOptions.direction === 'right') {
                    stylize(element, {
                        transform: `translate(100px, 0px)`,
                    });
                }
            }
        }

        /** @private */
        _event() {
            window.addEventListener('scroll', createAnimation.bind(this));
            function createAnimation() {
                const leftRightAction = document.body.clientHeight / this.params.leftRightAction;
                const bottomAction = document.body.clientHeight / this.params.bottomAction;

                for (let i = 0; i < elements.length; i++) {
                    const element = elements[i];
                    const elementOptions = elementsOptions[i];
                    const elementTop = element.getBoundingClientRect().top;

                    stylize(element, {
                        transition: `transform ${elementOptions.duration} ${elementOptions.function},
                                     opacity ${elementOptions.duration} ${elementOptions.function}`,
                    });

                    if (elementOptions.direction === 'left' || elementOptions.direction === 'right') {
                        if (elementTop <= leftRightAction) {
                            stylize(element, {
                                transitionDelay: `${elementOptions.delay}`,
                                opacity: '1',
                                transform: 'translate(0px, 0px)',
                            });
                        } else if (this.params.reverse && elementTop > leftRightAction) {
                            if (elementOptions.direction === 'left') {
                                stylize(element, {
                                    transitionDelay: `0s`,
                                    opacity: '0',
                                    transform: `translate(-100px, 0px)`,
                                });
                            } else if (elementOptions.direction === 'right') {
                                stylize(element, {
                                    transitionDelay: `0s`,
                                    opacity: '0',
                                    transform: `translate(100px, 0px)`,
                                });
                            }
                        }
                    } else if (elementOptions.direction === 'bottom') {
                        if (elementTop <= bottomAction) {
                            stylize(element, {
                                transitionDelay: `${elementOptions.delay}`,
                                opacity: '1',
                                transform: 'translate(0px, 0px)',
                            });
                        } else if (elementTop > bottomAction && this.params.reverse) {
                            stylize(element, {
                                transitionDelay: `0s`,
                                opacity: '0',
                                transform: 'translate(0px, 40px)',
                            });
                        }
                    }
                }
            }
            createAnimation.call(this);
        }
    }

    return AnimationListener;
}();