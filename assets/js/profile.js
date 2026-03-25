var popup = null;

function sitePath(path) {
	var b = typeof window.SITE_BASE_URL !== 'undefined' ? window.SITE_BASE_URL : '';
	if (!path) {
		return path;
	}
	if (path.charAt(0) === '/') {
		return b + path;
	}
	return b + '/' + path;
}

var makePopup = function(title, url, year, company){
	if(popup == null){
		popup = $("<div/>", {
			"class":"popup"
		}).css({		
			'position':'absolute',
			'top':0,
			"width": $('.profile_image').width() + "px",
			"height": $('.profile_image').height() + "px",
			'backgroundColor': '#FFF',
			'cursor':'pointer',
			"display":"none"
		});	
		
		var image = $("<div/>").appendTo(popup).css({
			"background-image" : "url('" + sitePath('/assets/images/profile/' + url + '.jpg') + "')",
			"background-position": "50% 70%",
			"background-size": "cover",
			"background-repeat": "no-repeat",
			"width": $('.profile_image').width() + "px",
			"height": $('.profile_image').height() + "px"
		});
		
		var desc = $("<div/>", {
		text: title
		}).appendTo(popup).css({
			"display":"inline-block",
			"float":"left",
			"top":0,
			"text-align":"center",
			"line-height" : "20px",
			"font-size": "0.7em"
		});
		
		var comp = $("<div/>", {
		text: company
		}).appendTo(popup).css({
			"display":"inline-block",
			"float":"right",
			"top":0,
			"margin-left":"7px",
			"text-align":"center",
			"line-height" : "20px",
			"font-size": "0.7em"
		});
		
		var year = $("<div/>", {
		text: year
		}).appendTo(popup).css({
			"display":"inline-block",
			"float":"right",
			"top":0,
			"text-align":"center",
			"line-height" : "20px",
			"font-size": "0.7em"
		});		
		
		popup.appendTo($('.profile_image')).stop().fadeIn(500);
		
		popup.on("click", function(){
			$(this).fadeOut(500, function(){
				popup.remove();
				popup = null;
			});			
		});	
	}
}

function revealProfileImageGrid() {
	var $wrap = $('.profile_image.profile-image--pending');
	if (!$wrap.length) {
		return;
	}
	var $imgs = $wrap.find('img');
	var extra = [];
	var jsonEl = document.getElementById('profile-preload-bg');
	if (jsonEl) {
		try {
			extra = JSON.parse(jsonEl.textContent.replace(/^\uFEFF/, '').trim());
		} catch (e) {}
	}
	var total = $imgs.length + extra.length;
	if (total === 0) {
		$wrap.removeClass('profile-image--pending').addClass('profile-image--ready');
		return;
	}
	var left = total;
	var revealed = false;
	var timeoutId = setTimeout(finish, 15000);

	function finish() {
		if (revealed) {
			return;
		}
		revealed = true;
		clearTimeout(timeoutId);
		$wrap.removeClass('profile-image--pending').addClass('profile-image--ready');
	}

	function done() {
		left -= 1;
		if (left <= 0) {
			finish();
		}
	}

	$imgs.each(function () {
		var img = this;
		if (img.complete && img.naturalWidth > 0) {
			done();
		} else {
			$(img).one('load error', done);
		}
	});

	extra.forEach(function (url) {
		if (!url) {
			done();
			return;
		}
		var im = new Image();
		im.onload = im.onerror = done;
		im.src = url;
	});
}

$(document).ready(function () {
	revealProfileImageGrid();

	$.each($('.btn'), function () {
		(new Image()).src = sitePath('/assets/images/profile/' + $(this).data('url') + '.jpg');

		$(this).on('click', function () {
			makePopup($(this).data('title'), $(this).data('url'), $(this).data('year'), $(this).data('company'));
		});
	});
});