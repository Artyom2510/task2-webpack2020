'use strict';

import '../scss/libs/bootstrap.scss';
import '../scss/main.scss';

import $ from 'jquery';
import datepickerFactory from 'jquery-datepicker';
datepickerFactory($);
/* eslint-disable-next-line */
$.datepicker._get_original=$.datepicker._get,$.datepicker._get=function(t,e){var i=$.datepicker._get_original(t,e),a=t.settings.range;if(!a)return i;var s=this;switch(a){case"period":case"multiple":var n=$(this.dpDiv).data("datepickerExtensionRange");switch(n||(n=new _datepickerExtension,$(this.dpDiv).data("datepickerExtensionRange",n)),n.range=a,n.range_multiple_max=t.settings.range_multiple_max||0,e){case"onSelect":var r=i;r||(r=function(){}),i=function(t,e){n.onSelect(t,e),r(t,e,n),s._datepickerShowing=!1,setTimeout(function(){s._updateDatepicker(e),s._datepickerShowing=!0}),n.setClassActive(e)};break;case"beforeShowDay":var r=i;r||(r=function(){return[!0,""]}),i=function(t){var e=r(t);return e=n.fillDay(t,e)};break;case"beforeShow":var r=i;r||(r=function(){}),i=function(t,e){r(t,e),n.setClassActive(e)};break;case"onChangeMonthYear":var r=i;r||(r=function(){}),i=function(t,e,i){r(t,e,i),n.setClassActive(i)}}}return i},$.datepicker._setDate_original=$.datepicker._setDate,$.datepicker._setDate=function(t,e,i){var a=t.settings.range;if(!a)return $.datepicker._setDate_original(t,e,i);var s=this.dpDiv.data("datepickerExtensionRange");if(!s)return $.datepicker._setDate_original(t,e,i);switch(a){case"period":("object"!=typeof e||void 0==e.length)&&(e=[e,e]),s.step=0,$.datepicker._setDate_original(t,e[0],i),s.startDate=this._getDate(t),s.startDateText=this._formatDate(t),$.datepicker._setDate_original(t,e[1],i),s.endDate=this._getDate(t),s.endDateText=this._formatDate(t),s.setClassActive(t);break;case"multiple":("object"!=typeof e||void 0==e.length)&&(e=[e]),s.dates=[],s.datesText=[];var n=this;$.map(e,function(e){$.datepicker._setDate_original(t,e,i),s.dates.push(n._getDate(t)),s.datesText.push(n._formatDate(t))}),s.setClassActive(t)}};var _datepickerExtension=function(){this.range=!1,this.range_multiple_max=0,this.step=0,this.dates=[],this.datesText=[],this.startDate=null,this.endDate=null,this.startDateText="",this.endDateText="",this.onSelect=function(t,e){switch(this.range){case"period":return this.onSelectPeriod(t,e);case"multiple":return this.onSelectMultiple(t,e)}},this.onSelectPeriod=function(t,e){this.step++,this.step%=2,this.step?(this.startDate=this.getSelectedDate(e),this.endDate=this.startDate,this.startDateText=t,this.endDateText=this.startDateText):(this.endDate=this.getSelectedDate(e),this.endDateText=t,this.startDate.getTime()>this.endDate.getTime()&&(this.endDate=this.startDate,this.startDate=this.getSelectedDate(e),this.endDateText=this.startDateText,this.startDateText=t))},this.onSelectMultiple=function(t,e){var i=this.getSelectedDate(e),a=-1;$.map(this.dates,function(t,e){t.getTime()==i.getTime()&&(a=e)});var s=$.inArray(t,this.datesText);-1!=a?this.dates.splice(a,1):this.dates.push(i),-1!=s?this.datesText.splice(s,1):this.datesText.push(t),this.range_multiple_max&&this.dates.length>this.range_multiple_max&&(this.dates.splice(0,1),this.datesText.splice(0,1))},this.fillDay=function(t,e){var i=e[1];switch(1==t.getDate()&&(i+=" first-of-month"),t.getDate()==new Date(t.getFullYear(),t.getMonth()+1,0).getDate()&&(i+=" last-of-month"),e[1]=i.trim(),this.range){case"period":return this.fillDayPeriod(t,e);case"multiple":return this.fillDayMultiple(t,e)}},this.fillDayPeriod=function(t,e){if(!this.startDate||!this.endDate)return e;var i=e[1];return t>=this.startDate&&t<=this.endDate&&(i+=" selected"),t.getTime()==this.startDate.getTime()&&(i+=" selected-start"),t.getTime()==this.endDate.getTime()&&(i+=" selected-end"),e[1]=i.trim(),e},this.fillDayMultiple=function(t,e){var i=e[1],a=!1;return $.map(this.dates,function(e){e.getTime()==t.getTime()&&(a=!0)}),a&&(i+=" selected selected-start selected-end"),e[1]=i.trim(),e},this.getSelectedDate=function(t){return new Date(t.selectedYear,t.selectedMonth,t.selectedDay)},this.setClassActive=function(t){var e=this;setTimeout(function(){$("td.selected > *",t.dpDiv).addClass("ui-state-active"),"multiple"==e.range&&$("td:not(.selected)",t.dpDiv).removeClass("ui-datepicker-current-day").children().removeClass("ui-state-active")})}};
import Inputmask from 'inputmask';


$(function() {

	// Настройка вспомогательных переменных
	function updateDeviceProps() {
		const main = $('.main');
		const vh = $(window).innerHeight() * 0.01;
		$(':root').css('--vh', vh + 'px');
		const scrollWidth = $(window).width() - main.outerWidth(true);
		$(':root').css('--scroll-width', scrollWidth + 'px');
	}
	$(window).on('resize', updateDeviceProps);
	updateDeviceProps();

	const burger = $('.js-btn-burger');
	const root = $('.js-root');
	const menu = $('.js-menu');

	// Бургер в хедере
	burger.on('click', function() {
		$(this).toggleClass('btn-burger_open');
		menu.toggleClass('header__wrap_translate');
		root.toggleClass('root_overflow');
	});

	// Жикури календарь настройки
	$.datepicker.regional['ru'] = {
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
		yearSuffix: ''
	};
	$.datepicker.setDefaults($.datepicker.regional['ru']);

	// Календарь с выбором даты
	const calendar = $('.js-range-datepicker');
	const from = $('.js-input-datepicker#date-start');
	const to = $('.js-input-datepicker#date-end');

	calendar.datepicker({
		showOtherMonths: true,
		prevText: '',
		nextText: '',
		range: 'period',
		minDate: 0,
		showButtonPanel: false,
		selectOtherMonths: true,
		onSelect: function(dateText, inst, extensionRange) {
			if (extensionRange.startDateText !== extensionRange.endDateText &&
				extensionRange.startDateText && extensionRange.endDateText) {
				$('.js-apply').addClass('btn-purple_visible');
			} else {
				$('.js-apply').removeClass('btn-purple_visible');
			}
		}
	});

	calendar.datepicker('setDate', [null, null]);
	calendar.hide();

	calendar.append(`
		<div class="datepicker-my-btns">
			<button class="btn-purple btn-purple_visible js-reset" type="button">очистить</button>
			<button class="btn-purple js-apply" type="button">применить</button>
		</div>
	`);

	$(document).on('click', '.js-reset', function() {
		const extensionRange = calendar.datepicker('widget').data('datepickerExtensionRange');
		extensionRange.startDateText = null;
		extensionRange.endDateText = null;
		calendar.datepicker('setDate', [null, null]);
		$('.js-apply').removeClass('btn-purple_visible');
		from.val('');
		to.val('');
	});

	$(document).on('click', '.js-apply', function() {
		const extensionRange = calendar.datepicker('widget').data('datepickerExtensionRange');
		if (extensionRange.startDateText !== extensionRange.endDateText) {
			if (extensionRange.startDateText) {
				from.val(extensionRange.startDateText);
			}
			if (extensionRange.endDateText) {
				to.val(extensionRange.endDateText);
			}
		}
		calendar.hide();
	});

	$('.js-btn-datepicker').on('click', function() {
		$(this).siblings('.js-input-datepicker').focus();
	});

	$('.js-input-datepicker').on('focus', () => {
		$('.js-range-datepicker').show();
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
			thiz.$scrollWidth = $(':root').css('--scroll-width');

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
				paddingRight: thiz.$scrollWidth,
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
			pageScrollClass: '.root',
			btnClass: btn,
			duration: 300,
			overflow: true,
		});
	}

	initPopup($('.js-popup'), 'js-tgl-popup');

	// Like
	let initialLike;
	$('.js-like').on('click', function() {
		const child = $(this).children('.like__cnt');
		initialLike = child.text() || 0;
		$(this).toggleClass('like_active');
		if ($(this).hasClass('like_active')) {
			child.text(++initialLike);
		} else {
			child.text(--initialLike);
		}
	});

	// Для телефона
	$('.js-tel').each((id, input) => {
		new Inputmask("8-(978)-999-99-99").mask(input);
	});

});
