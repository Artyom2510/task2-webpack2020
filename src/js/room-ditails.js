'use strict';

import $ from 'jquery';
import 'slick-carousel';

$(function() {

	let wWidth = $(window).width();

	// слайдера
	const mainSl = $('.js-slick-sl');
	const smallSl = $('.js-slick-sm-sl');

	const slidersInit = () => {
		mainSl.not('.slick-initialized').slick({
			asNavFor: smallSl,
			infinite: true,
			dots: false,
			arrows: false,
			slidesToScroll: 1,
			fade: true,
			speed: 300,
			cssEase: 'ease'
		});

		smallSl.not('.slick-initialized').slick({
			asNavFor: mainSl,
			slidesToShow: 2,
			slidesToScroll: 1,
			focusOnSelect: true,
			dots: false,
			arrows: false,
			infinite: true,
			swipe: true,
			speed: 300
		});
	}

	if (mainSl.length && smallSl.length && wWidth < 1024) {
		slidersInit();
	}

	// Ресайз для слайдеров
	$(window).on('resize', () => {
		wWidth = $(this).width();

		if (mainSl.length && smallSl.length && wWidth < 1024) {
			slidersInit();
		} else if ($('.slick-slider').length) {
			mainSl.slick('unslick');
			smallSl.slick('unslick');
		}
	});

	// Круговая диаграмма
	const svg = $('.js-circle-svg');
	const amount = $('.js-amount').text();
	const circleSvgPath = $('.js-circle-svg path');
	const centerSvg = svg.attr('width') / 2;
	const radiusSvg = centerSvg - circleSvgPath.attr('stroke-width');
	const pathPadding = 2;

	const polarToCartesian = (center, radius, angleInDegrees) => {
		const angleInRadians = (angleInDegrees - 90) * Math.PI / 180;

		return {
			x: Math.round(center + radius * Math.cos(angleInRadians)),
			y: Math.round(center + radius * Math.sin(angleInRadians))
		};
	}

	const circlePath = (x, radius, startAngle, endAngle) => {
		const start = polarToCartesian(x, radius, endAngle);
		const end = polarToCartesian(x, radius, startAngle);
		const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
		return `M ${start.x} ${start.y}
			A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
	}

	// Начальная позиция отрисовки
	let startPath = 180;
	circleSvgPath.each(function() {
		const dataAmount = $(this).data('amount');
		if (dataAmount !== 0) {
			let total = dataAmount / amount * 360 + startPath;
			const d = circlePath(centerSvg, radiusSvg, startPath, total - pathPadding);
			$(this).attr('d', d);
			startPath < 361 ? startPath = total - 360 : total;
		}
	});

	// Тултип
	$('.price-info').on('click', function() {
		if (wWidth < 1280) {
			const tooltip = $(this).children();
			tooltip.css('opacity', '1');
			setTimeout(() => {
				tooltip.css('opacity', '0');
			}, 1000);
		}
	});

	// Слайдер на странице с фильтром
	const sliders = $('.js-result-slider');
	const slides = $('.js-result-slide');
	const dots = $('.js-slider-dots');
	const prev = $('.js-slider-prev');
	const next = $('.js-slider-next');
	let currentDots;
	let currentItem;
	let id;
	let parent;
	let parentSliders;

	sliders.slick({
		infinite: true,
		dots: false,
		arrows: false,
		slidesToScroll: 1,
		fade: true,
		speed: 300,
		cssEase: 'ease'
	});

	// Добавление каждому точек
	sliders.each(function() {
		currentDots = $(this).siblings('.js-slider-dots');
		currentItem = $(this).find(slides);
		if (currentItem.length > 1) {
			currentDots.append('<button data-id="0" class="active"></button>');
			for(var i = 1; i < currentItem.length; i++) {
				currentDots.append('<button data-id="' + i + '"></button>');
			}
		}
	});

	// Клик по точкам
	dots.children('button').on('click', function() {
		id = $(this).data('id');
		parent = $(this).parents('.result-slider');
		parentSliders = parent.find(sliders);
		parentSliders.slick('slickGoTo', id);
		// parentSliders.slick('slickGoTo', $(this).index());
	});

	// переключение активной точки
	sliders.on('afterChange', function(e, slick, currentSlide) {
		currentDots = $(this).siblings(dots);
		currentDots.children('button').removeClass('active');
		currentDots.children('button[data-id="' + currentSlide + '"]').addClass('active');
	});

	prev.on('click', function() {
		parent = $(this).parents('.result-slider');
		parent.find(sliders).slick('slickPrev');
	});

	next.on('click', function() {
		parent = $(this).parents('.result-slider');
		parent.find(sliders).slick('slickNext');
	});
});
