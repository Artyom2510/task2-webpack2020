import '../postcss/main.scss';

import $ from 'jquery';

const burger = $('.js-btn-burger');
const root = $('.js-root');
const menu = $('.js-menu');

burger.on('click', function() {
	$(this).children().toggleClass('btn-burger__icon_open btn-burger__icon_close');
	menu.toggleClass('header__wrap_translate');
	root.toggleClass('root_overflow');
});