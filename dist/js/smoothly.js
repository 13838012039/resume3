!function () {

    var view = document.querySelector('nav.menu');
    view.style.border = '1px solid red';
    var controller = {
        view: null,
        aTags: null,
        initAnimation: function () {
            function animate(time) {
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }
            requestAnimationFrame(animate);
        },
        scrollToElement: function (element) {
            let targerTop = element.offsetTop - 80;

            let currentTop = window.scrollY;
            s = targerTop - currentTop;

            let time = s / 100 * 300;
            time = Math.abs(time);
            if (time > 500) {
                time = 500;
            }
            var coords = {

                y: currentTop
            }; // Start at (0, 0)
            var tween = new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
            .to({

                y: targerTop
            }, time) // Move to (300, 200) in 1 second.

            .easing(TWEEN.Easing.Quadratic.InOut) // Use an easing function to make the animation smooth.
            .onUpdate(function () {
                window.scroll(0, coords.y);
            }).start(); // Start the tween immediately.
        },
        bindEvents: function () {

            let liTags = view.querySelectorAll('nav.menu > ul > li');
            for (let i = 0; i < liTags.length; i++) {
                liTags[i].onmouseenter = function (x) {
                    let li = x.currentTarget;
                    li.classList.add('active');
                };
                liTags[i].onmouseleave = function (x) {
                    let li = x.currentTarget;
                    li.classList.remove('active');
                };
            }

            let aTags = this.view.querySelectorAll('nav.menu>ul>li>a');
            for (let i = 0; i < aTags.length; i++) {
                aTags[i].onclick = x => {
                    x.preventDefault();
                    let a = x.currentTarget;
                    let href = a.getAttribute('href');
                    let element = document.querySelector(href);
                    this.scrollToElement(element);
                };
            }
        },
        init: function (view) {
            this.view = view;

            this.initAnimation();
            this.bindEvents();
        }
    };

    controller.init(view);
}.call();