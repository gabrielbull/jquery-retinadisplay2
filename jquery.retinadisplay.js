/**
 * jQuery.retinaDisplay
 * Dual licensed under MIT and GPL.
 * Date: 03/09/2012
 * @author Gabriel Bull
 * @version 0.1
 *
 * https://github.com/gavroche/jquery-retina-display
 */
(function($) {
	
	var methods = {
		/* Init plugin */
		init : function( options ) {
			return this.each(function(){
				var isRetina = (!!navigator.userAgent.match(/Macintosh|Mac|iPhone|iPad/i) && window.devicePixelRatio==2);
				var resSrc = $(this).attr('data-res-src');
				var exists = false;
				var obj = $(this);
				
				// Check if image is valid
				var loadImage = function (src, callback) {
					var r = new XMLHttpRequest();
					r.open("HEAD", src, true);
					r.onreadystatechange = function () {
						if (r.readyState == 4) {
                    		if (r.status === 200) {
                    			exists = true;
                    		} else {
                    			exists = false;
							}
							callback.call();
						}
					};
					r.send(null);
				};
				
				// Load image
				if (isRetina) {
					loadImage(resSrc, function(){
						if (exists) {
							obj.attr('src', resSrc);
						}
					});
				}
			});
		}
	};
	
	$.fn.retinaDisplay = function( method ) {
		// Method calling logic
		if (methods[method]) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.uploader' );
		}
	};
	
})(jQuery);
