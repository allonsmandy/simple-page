;(function() {
    'use strict';

    var btn = document.querySelector('.header-nav__hamburgger');
    var html = document.querySelector('html');
    var menu = document.querySelector('#main-menu');
    var menuOpened = false;

    html.addEventListener('click', function(event) {
        if(event.target === html && menuOpened) {
            closeMenu();
        }
    })

    btn.addEventListener('click', function() {
        if(menuOpened) {
            closeMenu();
        } else {
            openMenu();
        }
    })

    function closeMenu() {
        menuOpened = false;
        html.classList.remove('menu-opened');
        btn.blur(); //perde o foco no botão
        menu.setAttribute('aria-expanded', false);
        btn.setAttribute('aria-expanded', false);
    }

    function openMenu() {
        menuOpened = true;
        html.classList.add('menu-opened');
        menu.setAttribute('aria-expanded', true);
        btn.setAttribute('aria-expanded', true);
    }
}())