'use strict';

import $ from 'jquery';
import noUiSlider from 'nouislider';

$(function() {
	const range = document.querySelector('.js-range');

	/* eslint-disable-next-line */
	if (!!range) {
	// if (range !== null) {
		noUiSlider.create(range, {
			start: [5000, 10000],
			connect: true,
			range: {
				'min': 5000,
				'max': 10000
			},
			step: 500,
		});

		range.noUiSlider.on('update', function (values) {
			$('.js-min-val').text(Math.ceil(values[0]));
			$('.js-max-val').text(Math.ceil(values[1]));
		});

		$('.js-tgl-slidedown').on('click', function() {
			const parent = $(this).parent();
			parent.find('.js-body-slidedown').slideToggle(200);
		});
	}

});
