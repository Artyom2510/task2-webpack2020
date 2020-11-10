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
		if (scrollWidth) {
			$(':root').css('--scroll-width', scrollWidth + 'px');
		}
	}
	$(window).on('resize', updateDeviceProps);
	updateDeviceProps();

	const menu = $('.js-menu');
	const burger = $('.js-btn-burger');

	// Меню от 1279
	menu
		.switchPopup({
			pageScrollClass: '.js-root',
			btnClass: 'js-btn-burger',
			duration: 300,
			overflow: true,
			displayClass: 'header__wrap_display',
			visibleClass: 'header__wrap_visible'
		})
		.on('afterClose', function(event, popup) {
			const burgerIcon = popup.siblings(burger).children();
			burgerIcon.removeClass('btn-burger__icon_close');
			burgerIcon.addClass('btn-burger__icon_open');
		});

	// Бургер в хедере
	burger.on('click', function() {
		$(this).toggleClass('btn-burger_open');
		$(this).children().toggleClass('btn-burger__icon_open btn-burger__icon_close');
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

	const clearSpace = (selector) => {
		return +selector.text().replace(/\s/g, '');
	};

	const desiredFormat = (selector, str) => {
		return selector.text(str.toLocaleString('ru-RU'));
	};

	// Календарь с выбором даты
	const calendar = $('.js-range-datepicker');
	const calendarBirthday = $('.js-input-birthday');
	const searchDate = $('.js-input-datepicker#search-date');
	let countDays = 0;
	const selectorCountDays = $('.js-cnt-days');
	const btnDec = $('.js-btn-dec');
	const btnInc = $('.js-btn-inc');
	const oneDay = 86400000;
	const formDataPrice = +$('.form-booking').data('price');
	desiredFormat($('.js-initial-price'), formDataPrice);
	let defultText;
	let totalExpression = '';
	let countPeople = 0;
	let countBaby;
	let countBedrooms;
	let countBed;
	let countSeparateRoom;
	const guestsSelector = $('.js-guests');
	const cases = [2, 0, 1, 1, 1, 2];
	const guestsDeclaration = ['гость', 'гостя', 'гостей'];
	const guestsBabyDeclaration = ['младенец', 'младенца', 'младенцев'];
	const bedroomsDeclaration = ['спальня', 'спальни', 'спален'];
	const bedDeclaration = ['кровать', 'кровати', 'кроватей'];
	const separateRoomDeclaration = ['ванная комната', 'ванные комнаты', 'ванных комнат'];
	const dropdownReset = $('.js-dropdown-reset');
	const multipleDaysSelector = $('.js-price-multiples-days');
	let multipleDays = 0;
	const servicetPrice1 = clearSpace($('.js-service-price1'));
	const servicetPrice2 = clearSpace($('.js-service-price2'));
	const discount = clearSpace($('.js-discount'));
	const totalPrice = $('.js-total-price');
	let total = 0;
	let dayOrDays = 'сутки';
	const btnDatepicker = $('.js-btn-datepicker');
	const inputDatepicker = $('.js-input-datepicker');
	const tglDrop = $('.js-tgl-dropdown');
	const dropdownForm = $('.js-dropdown-form');
	const dropdown = $('.formfield__dropdown');
	const dropdownOpen = 'formfield__dropdown_open';

	// Declaration
	const declOfNum = (number, titles) => {
		return (
			titles[(number % 100 > 4 && number % 100 < 20) ?
				2 : cases[(number % 10 < 5) ? number % 10 : 5]]
		);
	}

	const monthName = (month) => {
		return month.toLocaleString('default', { month: 'short' }).substr(0, 3);
	}

	// Дополнительные настройки + видмость кнопок
	calendar.datepicker({
		showOtherMonths: true,
		prevText: '',
		nextText: '',
		range: 'period',
		minDate: 0,
		showButtonPanel: false,
		selectOtherMonths: true,
		onSelect: function(dateText, inst, extensionRange) {
			const parent = inst.dpDiv.parents('.js-calendar-parent');
			const aplly = parent.find('.js-apply');
			if (extensionRange.startDateText !== extensionRange.endDateText &&
				extensionRange.startDateText && extensionRange.endDateText) {
				aplly.addClass('btn-purple_visible');
			} else {
				aplly.removeClass('btn-purple_visible');
			}
		}
	});

	const inputBirthday = $('.js-input-set');

	// День рождения в регистрации
	calendarBirthday.datepicker({
		showOtherMonths: true,
		prevText: '',
		nextText: '',
		showButtonPanel: false,
		selectOtherMonths: true,
		onSelect: function(dateText) {
			inputBirthday.val(dateText);
			calendarBirthday.hide();
		}
	});

	inputBirthday.on({
		'focus': () => {
			calendarBirthday.show();
		},
		'input': function() {
			if ($(this).val().indexOf('_') === -1) {
				calendarBirthday.datepicker('setDate', $(this).val());
			}
		}
	});

	// Обнуляю при загрузке
	calendar.datepicker('setDate', [null, null]);

	// Добавляю свою кнопки
	calendar.append(`
		<div class="datepicker-my-btns">
			<button class="btn-purple btn-purple_visible js-reset" type="button">очистить</button>
			<button class="btn-purple js-apply" type="button">применить</button>
		</div>
	`);

	// Очистка календаря
	$(document).on('click', '.js-reset', function() {
		const parent = $(this).parents('.js-calendar-parent');
		const thisCalendar = parent.find(calendar);
		const extensionRange = thisCalendar.datepicker('widget').data('datepickerExtensionRange');
		extensionRange.startDateText = null;
		extensionRange.endDateText = null;
		thisCalendar.datepicker('setDate', [null, null]);
		$(this).siblings('.js-apply').removeClass('btn-purple_visible');
		if (parent.hasClass('js-flag-date')) {
			const from = parent.find('.js-input-datepicker#date-start');
			const to = parent.find('.js-input-datepicker#date-end');
			from.val('');
			to.val('');
			countDays = 0;
			multipleDays = 0;
			total = 0;
			selectorCountDays.text('0 суток');
			multipleDaysSelector.text(0);
			totalPrice.text(0);
		} else {
			searchDate.val('');
		}
	});

	// Заполнение дат, подсчёт стоимости
	$(document).on('click', '.js-apply', function() {
		const parent = $(this).parents('.js-calendar-parent');
		const thisCalendar = parent.find(calendar);
		console.log(parent)
		const extensionRange = thisCalendar.datepicker('widget').data('datepickerExtensionRange');
		if (parent.hasClass('js-flag-date')) {
			const start = new Date(extensionRange.startDate).getTime();
			const end = new Date(extensionRange.endDate).getTime();
			const from = parent.find('.js-input-datepicker#date-start');
			const to = parent.find('.js-input-datepicker#date-end');
			from.val(extensionRange.startDateText);
			to.val(extensionRange.endDateText);
			if (parent.parent().hasClass('js-calc')) {
				console.log('mkjkjospl;ls')
				countDays = (end - start) / oneDay;
				dayOrDays = countDays > 1 ? 'суток' : 'сутки';
				selectorCountDays.text(`${countDays.toLocaleString('ru-RU')} ${dayOrDays}`);
				multipleDays = countDays * formDataPrice;
				desiredFormat(multipleDaysSelector, multipleDays);
				total = multipleDays + servicetPrice1 + servicetPrice2 - discount;
				desiredFormat(totalPrice, total);
			}
		} else {
			const monthStart = monthName(extensionRange.startDate);
			const monthEnd = monthName(extensionRange.endDate);
			const dayStart = extensionRange.startDate.getDate();
			const dayEnd = extensionRange.endDate.getDate();
			searchDate.val(`${dayStart} ${monthStart} - ${dayEnd} ${monthEnd}`);
		}
		thisCalendar.hide();
	});

	// Показ календаря
	btnDatepicker.on('click', function() {
		$(this).siblings('.js-input-datepicker').focus();
	});

	inputDatepicker.on('focus', function() {
		calendar.hide();
		const parent = $(this).parents('.js-calendar-parent');
		parent.find(calendar).show();
	});

	$(document).on('click', e => {
		const target = $(e.target);
		// Закрытие календаря
		if (!target.parents('.js-calendar-parent').length && !target.is('.ui-datepicker-prev') &&
			!target.is('.ui-datepicker-next')) {
			calendar.hide();
			calendarBirthday.hide();
		}

		// Закрытие выпадающего списка
		if (dropdown.hasClass(dropdownOpen)) {
			if (!target.parents('.js-dropdown-form').length) {
				dropdown.removeClass(dropdownOpen);
			}
		}
	});

	// Открытие / закрытие выпадающего списка
	tglDrop.on('click', function() {
		const parent = $(this).parents('.js-dropdown-form');
		const thisDrop = parent.find(dropdown);
		dropdown.not(thisDrop).removeClass(dropdownOpen);
		thisDrop.toggleClass(dropdownOpen);
	});

	// Увеличение значения "гостей"
	btnInc.on('click', function() {
		const parent = $(this).parents('.dropdown__block');
		const siblingsInput = $(this).siblings('.js-current-total');
		let value = +siblingsInput.val();
		$(this).siblings(btnDec).addClass('quantity-btn_visible');
		const max = +siblingsInput.attr('max');
		siblingsInput.val(++value);
		parent.find(dropdownReset).addClass('btn-purple_visible');
		if (value === max) {
			$(this).removeClass('quantity-btn_visible');
		}
	});

	// Уменьшение значения "гостей"
	btnDec.on('click', function() {
		let currentBlockVal = 0;
		const parent = $(this).parents('.dropdown__block');
		const total = parent.find('.js-current-total');
		const siblingsInput = $(this).siblings('.js-current-total');
		let value = +siblingsInput.val();
		$(this).siblings(btnInc).addClass('quantity-btn_visible');
		const min = +siblingsInput.attr('min');
		siblingsInput.val(--value);
		if (value === min) {
			$(this).removeClass('quantity-btn_visible');
		}
		total.each(function() {
			currentBlockVal += +$(this).val();
		});
		if (currentBlockVal === 0) {
			dropdownReset.removeClass('btn-purple_visible');
		}
	});

	// Закрытие выпадающего списка по кнопке - Применить
	// Логика далека от идеала, зато работает
	$('.js-dropdown-apply').on('click', function() {
		countPeople = 0;
		countBaby = 0;
		countBedrooms = 0;
		countBed = 0;
		countSeparateRoom = 0;
		totalExpression = '';
		const parent = $(this).parents('.dropdown__block');
		const parentForm = $(this).parents('.js-dropdown-form');
		const total = parent.find('.js-current-total');
		total.each(function() {
			let val = +$(this).val();
			let id = $(this).attr('id');
			switch (id) {
				case 'bedrooms':
					countBedrooms = val;
					return;
				case 'bed':
					countBed = val;
					return;
				case 'separate-room':
					countSeparateRoom = val;
					return;
				case 'baby':
					countBaby = val;
					return;
				default:
					countPeople += val;
					return;
			}
		});
		if (countPeople) {
			totalExpression = `${countPeople} ${declOfNum(countPeople, guestsDeclaration)}`;
			if (countBaby) {
				totalExpression += `, ${countBaby} ${declOfNum(countBaby, guestsBabyDeclaration)}`;
			}
		}
		if (countBedrooms) {
			totalExpression = `${countBedrooms} ${declOfNum(countBedrooms, bedroomsDeclaration)}`;
		}
		if (countBed) {
			if (countBedrooms) totalExpression += ', ';
			totalExpression += `${countBed} ${declOfNum(countBed, bedDeclaration)}`;
		}
		if (countSeparateRoom) {
			if (countBedrooms || totalExpression) totalExpression += ', ';
			totalExpression += `${countSeparateRoom} ${declOfNum(countSeparateRoom, separateRoomDeclaration)}`;
		}
		if (totalExpression.length) {
			parentForm.find(guestsSelector).text(totalExpression);
			parentForm.attr('title', totalExpression);
		} else {
			defultText = parentForm.data('default-text');
			parentForm.find(guestsSelector).text(defultText);
			parentForm.attr('title', '');
		}
		$(this).parents('.formfield__dropdown').removeClass(dropdownOpen);
	});

	// Сброс значений выпадающего списка
	dropdownReset.on('click', function() {
		const parent = $(this).parents('.dropdown__block');
		const parentForm = $(this).parents('.js-dropdown-form');
		parent.find('.js-current-total').val(0);
		parent.find(btnDec).removeClass('quantity-btn_visible');
		parent.find(btnInc).addClass('quantity-btn_visible');
		$(this).removeClass('btn-purple_visible');
		defultText = parentForm.data('default-text');
		parentForm.find(guestsSelector).text(defultText);
	});

	// Функция для инициализации попапов
	function initPopup(popup, btn) {
		popup.switchPopup({
			pageScrollClass: '.js-root',
			btnClass: btn,
			duration: 300,
			overflow: true
		});
	}

	// Зарегистрироваться
	const signUp = $('.js-popup-sign-up');
	const signIn = $('.js-popup-sign-in');

	initPopup(signUp, 'js-tgl-sign-up');
	initPopup(signIn, 'js-tgl-sign-in');

	const closePopup = (currentPopup, nextPopup) => {
		nextPopup.on('beforeOpen', function() {
			currentPopup.switchPopup('close');
		});
	}

	closePopup(menu, signUp);
	closePopup(menu, signIn);
	closePopup(signUp, signIn);
	closePopup(signIn, signUp);

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
		new Inputmask('8-(978)-999-99-99').mask(input);
	});

	// Для даты
	$('.js-mask').each((id, input) => {
		new Inputmask('99.99.9999').mask(input);
	});

	// Цена с пробелами
	$('.js-price').each(function() {
		desiredFormat($(this), +$(this).text());
	});

	// Показать / скрыть фильтр
	let isOpen = false;
	const bntTglFilter = $('.js-tgl-filter');
	const filter = $('.js-search-filter');

	bntTglFilter.on('click', function() {
		$(this).children().text(isOpen ? 'Показать фильтр' : 'Скрыть фильтр');
		$(this).siblings(filter).slideToggle(200);
		isOpen = !isOpen;
	});

	// Для планшете при ресайзе
	$(window).on('resize', function () {
		if (filter.length) {
			if ($(this).width() > 1023) {
				console.log($(this).width())
				filter.css('display', 'block');
			} else {
				isOpen = false;
				filter.css('display', 'none');
				bntTglFilter.children().text('Показать фильтр');
			}
		}
	});

});
