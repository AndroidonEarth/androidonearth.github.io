/*
	Personal/Professional Website and Portfolio of Andrew Swaim
	Based on templates by @ajlkn from HTML5 Up
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$main = $('#main'),
		$panels = $main.children('.panel'),
		$nav = $('#nav'), $nav_links = $nav.children('a'),
		$contact = $('#contact-form'),
		$notification = $('#notification');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '361px',   '736px'  ],
			xsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		$nav_links
			.on('click', function(event) {

				var href = $(this).attr('href');

				// Not a panel link? Bail.
					if (href.charAt(0) != '#'
					||	$panels.filter(href).length == 0)
						return;

				// Prevent default.
					event.preventDefault();
					event.stopPropagation();

				// Change panels.
					if (window.location.hash != href)
						window.location.hash = href;

			});

	// Info Icon.
		$(".icon").click(
			function() {
				$(this).toggleClass("select");
			}
		);

	// Contact.
		$contact.submit(function(event) { 

			// Prevent default.
				event.preventDefault();

			// Send a POST request with Axios
				axios({
				    method: 'post',
				    url: 'https://app.99inbound.com/api/e/OyzL0BGX',
				    headers: {
				    	'Content-Type': 'application/json',
				    	'Accept': 'application/json'
				    },
				    data: {
				  		name: $("#name").val(),
				  		email: $("#email").val(),
				  		subject: $("#subject").val(),
				  		message: $("#message").val()
				    }
				}).then((response) => { console.log(response); })

			// Clear input field.
				$(".field").each(function() {
					$(this).val('');
				});

			// Display message.
				$notification.text('Thank you for your submission.');
				//else { $notification.text('There was an error submitting your message.'); }
		});

	// Panels.

		// Initialize.
			(function() {

				var $panel, $link;

				// Get panel, link.
					if (window.location.hash) {

				 		$panel = $panels.filter(window.location.hash);
						$link = $nav_links.filter('[href="' + window.location.hash + '"]');
					}

				// No panel/link? Default to first.
					if (!$panel || $panel.length == 0) {

						$panel = $panels.first();						
					}
					if (!$link || $link.length == 0) {

						$link = $nav_links.first();
					}

				// Deactivate all panels except this one.
					$panels.not($panel)
						.addClass('inactive')
						.hide();

				// Activate link.
					$link
						.addClass('active');

				// Reset scroll.
					$window.scrollTop(0);

			})();

		// Projects.
		

		// Hashchange event.
			$window.on('hashchange', function(event) {

				var $panel, $link;

				// Get panel, link.
					if (window.location.hash) {

				 		$panel = $panels.filter(window.location.hash);
						$link = $nav_links.filter('[href="' + window.location.hash + '"]');

						// No target panel? Bail.
							if ($panel.length == 0)
								return;
					}

				// No panel/link? Default to first.
					else {

						$panel = $panels.first();
						$link = $nav_links.first();
					}

				// Deactivate all panels.
					$panels.addClass('inactive');

				// Unload iframes.
					$("iframe").each(function() {
						$(this).attr('src', "/demo_placeholder.html");
					});

				// Clear input fields
					$(".field").each(function() {
						$(this).val('');
					});

				// Clear notification.
					$notification.text('');

				// Deactivate all links.
					$nav_links.removeClass('active');

				// Activate target link.
					$link.addClass('active');

				// Set max/min height.
					$main
						.css('max-height', $main.height() + 'px')
						.css('min-height', $main.height() + 'px');

				// Delay.
					setTimeout(function() {

						// Hide all panels.
							$panels.hide();

						// Show target panel.
							$panel.show();

						// Set new max/min height.
							$main
								.css('max-height', $panel.outerHeight() + 'px')
								.css('min-height', $panel.outerHeight() + 'px');

						// Reset scroll.
							$window.scrollTop(0);

						// Delay.
							window.setTimeout(function() {

								// Activate target panel.
									$panel.removeClass('inactive');

								// Clear max/min height.
									$main
										.css('max-height', '')
										.css('min-height', '');

								// IE: Refresh.
									$window.triggerHandler('--refresh');

								// Unlock.
									locked = false;

							}, (breakpoints.active('small') ? 0 : 500));

					}, 250);

			});

	// IE: Fixes.
		if (browser.name == 'ie') {

			// Fix min-height/flexbox.
				$window.on('--refresh', function() {

					$wrapper.css('height', 'auto');

					window.setTimeout(function() {

						var h = $wrapper.height(),
							wh = $window.height();

						if (h < wh)
							$wrapper.css('height', '100vh');

					}, 0);

				});

				$window.on('resize load', function() {
					$window.triggerHandler('--refresh');
				});

			// Fix intro pic.
				$('.panel.intro').each(function() {

					var $pic = $(this).children('.pic'),
						$img = $pic.children('img');

					$pic
						.css('background-image', 'url(' + $img.attr('src') + ')')
						.css('background-size', 'cover')
						.css('background-position', 'center');

					$img
						.css('visibility', 'hidden');

				});

		}

})(jQuery);