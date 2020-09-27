'use strict';
import '../scss/main.scss';

import $ from 'jquery';
import datepickerFactory from 'jquery-datepicker';

datepickerFactory($);

$(function() {
	const burger = $('.js-btn-burger');
	const root = $('.js-root');
	const menu = $('.js-menu');
	// const date = new Date();

	// Бургер в хедере
	burger.on('click', function() {
		$(this).children().toggleClass('btn-burger__icon_open btn-burger__icon_close');
		menu.toggleClass('header__wrap_translate');
		root.toggleClass('root_overflow');
	});

	// Жикури календарь
	$.datepicker.regional['ru']= {
		closeText: 'применить',
		prevText: '',
		nextText: '',
		currentText: 'очистить',
		monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
		'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
		monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
		'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
		dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг',
		'пятница', 'суббота'],
		dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
		dayNamesMin: ['Вс' ,'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
		weekHeader: 'Нед',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''
	};
	$.datepicker.setDefaults($.datepicker.regional['ru']);

	$('.js-datepicker').datepicker({
		showOtherMonths: true,
		minDate: new Date(2007, 1 - 1, 1),
		// showButtonPanel: true,
	});

	let SwitchPopup = window.SwitchPopup || {};

	SwitchPopup = (function () {
		function SwitchPopup(element, settings) {
			const thiz = this;

			thiz.$popup = $(element);
			thiz.state = 'close';
			thiz.pageScrollClass = 'html';
			thiz.btnClass = '';
			thiz.duration = 300;
			thiz.overflow = true;
			thiz.displayClass = 'popup_display';
			thiz.visibleClass = 'popup_visible';
			thiz.scrollWidth = window.innerWidth - document.documentElement.clientWidth;

			thiz.options = $.extend(thiz, settings);

			thiz.init();
		}
		return SwitchPopup;
	})();

	SwitchPopup.prototype.open = function () {
		const thiz = this;
		thiz.state = 'opening';
		thiz.$popup.trigger('beforeOpen', [thiz.$popup]);
		thiz.$popup.trigger('beforeChange', [thiz.$popup, 'open']);
		thiz.$popup.addClass(thiz.displayClass);
		setTimeout(function () {
			thiz.$popup.addClass(thiz.visibleClass);
		}, 1);
		setTimeout(function () {
			thiz.state = 'open';
			thiz.$popup.trigger('afterOpen', [thiz.$popup]);
			thiz.$popup.trigger('afterChange', [thiz.$popup, 'open']);
		}, thiz.duration);
		if (thiz.overflow) {
			$(thiz.pageScrollClass).css({
				position: 'fixed',
				top: 0,
				paddingRight: thiz.scrollwidth,
				overflow: 'hidden'
			});
		}
	};

	SwitchPopup.prototype.close = function () {
		const thiz = this;
		thiz.state = 'closing';
		thiz.$popup.trigger('beforeClose', [thiz.$popup]);
		thiz.$popup.trigger('beforeChange', [thiz.$popup, 'close']);
		thiz.$popup.removeClass(thiz.visibleClass);
		setTimeout(function () {
			thiz.$popup.removeClass(thiz.displayClass);
			thiz.state = 'close';
			thiz.$popup.trigger('afterClose', [thiz.$popup]);
			thiz.$popup.trigger('afterChange', [thiz.$popup, 'close']);
			if (thiz.overflow) {
				$(thiz.pageScrollClass).css({
					position: 'relative',
					top: 'auto',
					paddingRight: 0,
					overflow: 'auto'
				});
			}
		}, thiz.duration);
	};

	SwitchPopup.prototype.toggle = function () {
		const thiz = this;
		if (thiz.$popup.hasClass(thiz.displayClass)) {
			thiz.close();
		} else {
			thiz.open();
		}
	};

	SwitchPopup.prototype.getState = function () {
		const thiz = this;
		return thiz.state;
	};

	SwitchPopup.prototype.init = function () {
		const thiz = this;
		if (thiz.$popup.length) {
			if (!thiz.btnClass.length) return;
			$(document).on('click', '.' + thiz.btnClass, function () {
				thiz.toggle();
			});
		}
		thiz.$popup.trigger('init', [thiz.$popup]);
	};

	$.fn.switchPopup = function () {
		const thiz = this;
		const opt = arguments[0];
		const args = Array.prototype.slice.call(arguments, 1);
		const l = thiz.length;
		let i;
		let ret;

		for (i = 0; i < l; i++) {
			if (typeof opt === 'object' || typeof opt === 'undefined') {
				thiz[i].switchPopup = new SwitchPopup(thiz[i], opt);
			} else {
				ret = thiz[i].switchPopup[opt].apply(thiz[i].switchPopup, args);
			}
			if (typeof ret !== 'undefined') return ret;
		}
		return thiz;
	};

	// Функция для инициализации попапов
	function initPopup(popup, btn) {
		popup.switchPopup({
			btnClass: btn,
			duration: 300,
			overflow: true,
		});
	}

	initPopup($('.js-popup'), 'js-tgl-popup');
});