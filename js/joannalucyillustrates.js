(function loader () {
	joannalucy = {
		change_image : function ($po_thumb) {
			var ls_thumbnail_type = $po_thumb.attr('data-thumb-type'),
				li_number_of_alts = $po_thumb.attr('data-number-alts'),
				$lo_section = $po_thumb.parents('.work_section'),
				$lo_alternative_images = $lo_section.find('.alternative_images'),
				$lo_alternative_thumbs = $lo_alternative_images.children('.thumbnail'),
				ls_thumb_image  = $po_thumb.attr('src'),
				ls_str_to_replace = /_thumb|\/thumbs/gi,
				ls_target_image = ls_thumb_image.replace(ls_str_to_replace, ''),
				$lo_section_image = $lo_section.find('.main_image'),
				$lo_new_alt_images = $();

			$po_thumb.addClass('active');

			if ('main-image' === ls_thumbnail_type) {

				// Hide any existing
				$lo_alternative_images.fadeOut(200);
				// Wait for the hide to finish
				setTimeout(function () {
					// Remove them from the DOM
					$lo_alternative_thumbs.remove();

					// If there is more than one image for the newly chosen main image, then we load them
					if (li_number_of_alts > 1) {
						// Iterate through for that number	
						for (var i=1; i <= li_number_of_alts; i++) {
							// For each one, create the src
							var thumb_src = ls_thumb_image.replace(/[0-9]+_thumb\.jpg/gi, i + '_thumb.jpg');
							// Add a new div object to the object of new alt images
							$lo_new_alt_images = $lo_new_alt_images.add('<div class="thumbnail"><img data-thumb-type="alt-image" src="' + thumb_src + '" /></div>');
						}

						// Bind the click event again
						$lo_new_alt_images.on('click', function () {
							var $thumb = $(this).children('img:first'),
								$thumbs = $lo_new_alt_images.children('img');

							$thumbs.removeClass('active');
							joannalucy.change_image($thumb);
						});
						// Finally append the new images to the alternative images panel
						$lo_alternative_images.append($lo_new_alt_images).fadeIn(200);
					}
				}, 200);
			}

			// Fade out the original image
			$lo_section_image.fadeOut(200);

			// SetTimeout to make sure that the image is hidden before changing the src
			setTimeout(function () {
				// Change the src attribute of the image
				$lo_section_image.attr('src', ls_target_image);
				// Then fade in the image
				$lo_section_image.fadeIn(200);

				// Again delay the resize until fade in has completed. !! GET WOODY TO LOOK AT THIS !!
				setTimeout(function () {
					// Check to see if the height is greater than the width
					if ($lo_section_image.height() > $lo_section_image.width()) {
						// Add class to change dimensions
						$lo_section_image.addClass('portrait');
					}
					else {
						// Remove class to change dimensions
						$lo_section_image.removeClass('portrait');
					}
				}, 200);
			}, 200);
		}
	}
})();


$('body').ready( function() {
	// Custom functions go here.
	var $currently_shown_image_container = $('#currently_shown_image_container'),
		$currently_shown_image = $('#currently_shown_image'),
		$lo_thumbnails = $('.thumbnail img');

	$lo_thumbnails.on('click', function () {
		$lo_thumbnails.removeClass('active')
		joannalucy.change_image($(this));
	});

	$('#owl_img').hover(
		function () {
			$('#owl-bubble').fadeIn(100);
		},
		function () {
			$('#owl-bubble').fadeOut(100);
		}
	)

});