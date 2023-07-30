import 'bootstrap';
import Swiper from 'swiper/bundle';
import $ from 'jquery';

$(document).ready(function() {

	$(window).on('resize', function() {
		let header = $('header');
		$('.first-screen').css('min-height', $(window).height() - header.height());
		$('.first-screen__wrap').css('min-height', $(window).height() - header.height());
	});

	$(window).resize();

	$(document).ready(function() {
		function onEntry(entry) {
			entry.forEach(function(change) {
				if (change.isIntersecting) {
					let animationValue = $(change.target).attr('data-animation');

					setTimeout(function(element) {
						if (animationValue && animationValue.indexOf('active') === -1) {
							$(element).attr('data-animation', animationValue + ' active');
						}

						setTimeout(function() {
							$(element).removeAttr('data-animation');
						}, 800);

					}, 500, change.target);
				}
			});
		}

		let options = { threshold: [0.1] };
		let observer = new IntersectionObserver(onEntry, options);
		let elements = $('[data-animation]');
		elements.each(function() {
			observer.observe(this);
		});
	});

});


// Плавный скролл до tab-pane
/*
document.querySelectorAll('[data-bs-toggle="tab"]').forEach(tab => {
	tab.addEventListener('click', () => {
		const targetId = tab.getAttribute('data-bs-target');
		const targetTab = document.querySelector(targetId);
		targetTab.scrollIntoView({ behavior: 'smooth', block: 'start' });
	});
});
*/

$(document).ready(function() {
	$('[data-bs-toggle="tab"]').on('click', function() {
		const targetId = $(this).data('bs-target');
		const targetTab = $(targetId);
		targetTab[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
	});
});


const mainSlider = new Swiper('.first-screen .mainSlider', {
	spaceBetween: 0,
	effect: "fade",
	loop: true,
	navigation: {
		nextEl: ".first-screen .swiper-button-next",
		prevEl: ".first-screen .swiper-button-prev",
	},
	pagination: {
		el: ".first-screen .swiper-pagination",
		clickable: true,
	},
});

mainSlider.on('slideChange', function () {
	let activeSlideIndex = mainSlider.realIndex;
	const firstScreenTitle = $('.first-screen__title');
	const firstScreenLi = $('.first-screen__list li');
	const firstScreenDesc = $('.first-screen__desc');


	if (activeSlideIndex !== 0) {
		firstScreenTitle.css('background-color', 'rgba(0, 0, 0, 0.9)');
		firstScreenLi.css('background-color', 'rgba(255, 255, 255, 1)');
		firstScreenDesc.css('background-color', 'rgba(255, 255, 255, 1)');
	} else {
		firstScreenTitle.css('background-color', 'rgba(0, 0, 0, 0.2)');
		firstScreenLi.css('background-color', 'rgba(255, 255, 255, 0.95)');
		firstScreenDesc.css('background-color', 'rgba(255, 255, 255, 0.95)');
	}
});



function validateForm(formId) {
	const $form = $('#' + formId);
	const $formName = $form.find('[name="name"]');
	const $formEmail = $form.find('[name="email"]');
	const $formCheckbox = $form.find('[name="check"]');
	const $formSubmitBtn = $form.find('[name="button"]');

	function validateInput($inputElement, validationFunction) {
		const isValid = validationFunction($inputElement);

		$inputElement.toggleClass('invalid', !isValid);

		return isValid;
	}

	function nameCheck($input) {
		return $input.val().trim() !== '';
	}

	$formName.on('input blur', function() {
		validateInput($formName, nameCheck);
	});

	function emailCheck($input) {
		const value = $input.val().trim();

		if (value === '') {
			return false;
		}

		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
	}

	$formEmail.on('input blur', function() {
		validateInput($formEmail, emailCheck);
	});

	function checkboxCheck($input) {
		return $input.prop('checked');
	}

	$formCheckbox.on('input blur', function() {
		validateInput($formCheckbox, checkboxCheck);
	});

	$form.on('submit', function(event) {
		const isNameValid = validateInput($formName, nameCheck);
		const isEmailValid = validateInput($formEmail, emailCheck);
		const isCheckboxValid = validateInput($formCheckbox, checkboxCheck);

		if (isNameValid && isEmailValid && isCheckboxValid) {
			alert('Форма успешно отправлена!');

			return;
		} else {
			$formSubmitBtn.addClass('disabled');
		}

		event.preventDefault();
	});

	function enableSubmitButton() {
		const isNameValid = validateInput($formName, nameCheck);
		const isEmailValid = validateInput($formEmail, emailCheck);
		const isCheckboxValid = validateInput($formCheckbox, checkboxCheck);

		if (isNameValid && isEmailValid && isCheckboxValid) {
			$formSubmitBtn.removeClass('disabled');
		} else {
			$formSubmitBtn.addClass('disabled');
		}
	}

	$formName.on('input', enableSubmitButton);
	$formEmail.on('input', enableSubmitButton);
	$formCheckbox.on('input', enableSubmitButton);
}

validateForm('requestForm');
validateForm('callbackForm');