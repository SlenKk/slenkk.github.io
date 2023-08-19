$(document).ready(function(){
		// $('.carousel__inner').slick({
		//     speed: 1200,
		//     adaptiveHeight: true,
		//     prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
		//     nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
		//     responsive: [
		//         {
		//             breakpoint: 992,
		//             settings: {
		//                 dots: true,
		//                 arrows: false
		//             }
		//         }
		//     ]
		//   });
		new WOW().init();
			function toggleSlide(item) {
				$(item).each(function(i) {
					$(this).on('click', function (e) {
						e.preventDefault();
						$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
						$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active')
					})
				})
			};
			const slider = tns({
				container: '.carousel__inner',
				items: 1,
				slideBy: 'page',
				autoplay: false,
				controls: false,
				nav: true,
				navPosition: 'bottom',
				responsive: {
					1200: {
						nav: false,
						navPosition: 'bottom',
						prevButton: false,
						nextButton: false,
					}
				}
			});
			
			// Slider


			document.querySelector('.prev').addEventListener('click', function () {
				slider.goTo('prev');
			});
			
			document.querySelector('.next').addEventListener('click', function () {
				slider.goTo('next');
			});
			
			$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
				$(this)
					.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
					.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
			});


			toggleSlide('.catalog-item__link')
			toggleSlide('.catalog-item__back')


			// Modal


			$('[data-modal=consultation]').on('click', function () {
				$('.overlay, #consultation').fadeIn('slow');
			});
			$('.modal__close').on('click', function () {
				$('.overlay, #consultation, #thanks, #order').fadeOut('fast');
			});

			$('.button_mini').each(function (i) {
				$(this).on('click', function() {
					$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
					$('.overlay, #order').fadeIn('slow');
				})
			});

			function validateForms(form){
				$(form).validate({
					rules: {
						name: {
							required: true,
							minlength: 2
						},
						phone: {
							required: true,
							minlength: 8
						},
						email: {
							required: true,
							email: true
						}
					},
					messages: {
	
						name: {
							required: "Пожалуйста, введите ваше имя.",
							minlength: jQuery.validator.format("Не менее {0} символов!")
						  },
	
						phone: {
							required: "Пожалуйста, введите ваш номер телефона.",
							minlength: jQuery.validator.format("Не менее {0} символов!")
						  },
	
						email: {
						  required: "Пожалуйста, введите ваш адрес электронной почты, чтобы связаться с Вами.",
						  email: "Ваш адрес электронной почты должен быть в формате name@gmail.com"
						}
	
					  }
				});
			};

			validateForms('#consultation-form');
			validateForms('#consultation form');
			validateForms('#order form');

			$('input[name=phone]').mask("+38 (999) 999-99-99");

			$('form').submit(function(e) {
				e.preventDefault();

				if (!$(this).valid()) {
					return;
				};

				$.ajax({
					type: "POST",
					url: "mailer/smart.php",
					data: $(this).serialize()
				}).done(function()	{
					$(this).find("input").val("");
					$('#consultation, #order').fadeOut(); 
					$('.overlay, #thanks').fadeIn('slow');

					$('form').trigger('reset');
				});
				return false;
			})

			// smooth scrol & pageup

			$(window).scroll(function() {
				if ($(this).scrollTop() > 1600) {
					$('.pageup').fadeIn();
				} else {
					$('.pageup').fadeOut();
				}
			});

			$("a[href=#up]").click(function(){
				var _href = $(this).attr("href");
				$("html, body").animate({scrollTop: $(_href).offset().top+"px"});
				return false;
			});
			
			new WOW().init();
	});

