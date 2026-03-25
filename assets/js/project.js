var projectList = [];

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

function escapeCssUrl(u) {
	return String(u).replace(/\\/g, '/').replace(/'/g, "\\'");
}

function escapeHtml(s) {
	return String(s)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

var parseList = function(data){
	var medical = [];
	var office = [];
	var leisure = [];
	var residence = [];
	var education = [];
	var commercial = [];
	
	$.each(data.projects, function(index, value){
		switch(value.group){
			case "Medical":
				medical.push(value);
				break;
			case "Office":
				office.push(value);
				break;
			case "Leisure":
				leisure.push(value);
				break;
			case "Residence":
				residence.push(value);
				break;
			case "Education":
				education.push(value);
				break;
			case "Commercial":
				commercial.push(value);
				break;
		}
	});
	
	projectList = [leisure, residence, office, medical, education, commercial];
};

var preload = function(){
	var i, j, list;
	for (i = 0; i < projectList.length; i++){
		list = projectList[i];
		for (j = 0; j < list.length; j++){
			(new Image()).src = sitePath(list[j].thumbnail);
		}
	}
};

var makeButtons = function(place){
	var i, j, list, row, col1, col2;
	for (i = 0; i < projectList.length; i++){
		list = projectList[i];
		for (j = 0; j < list.length; j++){
			row = $("<div/>", {
				"class":"row"
			});
			
			if(j === 0){
				col1 = $("<div/>", {
				"class":"type",
				text: list[j].group[0]
				}).appendTo(row);
			}
			else{
				col1 = $("<div/>", {
				"class":"type",
				}).appendTo(row);
			}
			
			col2 = $("<div/>", {
				"class":"title",
				text: list[j].list_title,
				"data-thumb":list[j].thumbnail,
				"data-image":JSON.stringify(list[j].images),
				"data-type":list[j].type,
				"data-title":list[j].image_title,
				"data-year":list[j].year,
				"data-location":list[j].location,
			}).appendTo(row);
			
			col2.hover(onHover);
			col2.click(showSlider);

			$(place).append(row);			
		}
		
		$(place).append(
			$("<div/>", {
				"class":"row"
			}).append(
				$("<div/>", {
					"class":"blank"
				})
			)
		);
	}
	
	preload();
};

var onHover = function(){	
	var imageURL = sitePath($(this).data('thumb'));
	
	$(".thumbshow").css({"top": $(this).offset().top});
	$(".thumbshow").css({"left": $(this).offset().left - 230});
	
	if($(".thumb").length){
		$(".thumb").attr("src", imageURL);	
		$(".thumb").stop().fadeToggle(500, "linear");
	}
	else{	
		var img = $("<img/>", {
			"class": "thumb",
			src:imageURL			
		});		
		$(".thumbshow").html(img);
	}	
};
var mySwiper = null;

function appendProjectSlides(swiper, images) {
	var i, url, slideUrl;
	for (i = 0; i < images.length; i++){
		url = sitePath(images[i].url);
		slideUrl = escapeCssUrl(url);
		swiper.appendSlide('<div class="swiper-slide" style="background-image:url(\'' + slideUrl + '\')"></div>');
	}
}

var showSlider = function(){
	var list, type, location, year;

	$(".title").removeClass('selected');
	$(this).toggleClass('selected');

	if(mySwiper == null){		
		
		mySwiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        effect: 'fade',
		loop: true,
		speed: 1000
		});
		
		list = $(this).data('image');
		appendProjectSlides(mySwiper, list);
		$(".swiper-container").css({"visibility" : "visible"});
		$(".swiper-button-prev").css({"visibility" : "visible"});
		$(".swiper-button-next").css({"visibility" : "visible"});
		
		mySwiper.slideTo(1);
		mySwiper.update(true);
		
	}
	else
	{
		mySwiper.removeAllSlides();
		list = $(this).data('image');
		appendProjectSlides(mySwiper, list);
		$(".swiper-container").css({"visibility" : "visible"});
		mySwiper.slideTo(1);
		mySwiper.update(true);
		
	}
	
	
	type = $(this).data('type');
	location = $(this).data('location');
	year = $(this).data('year');	
	
	$(".description").fadeOut(200, function(){
		$(".description").html( 
			"<div class='desc'>" + 
			escapeHtml(type) + "<br>" +
			escapeHtml(year) + "<br>"	+
			escapeHtml(location) + "</div>"
		);
	}
	).fadeIn();
};

var triggerFirst = function(){
	if($('body').width() < 900){		
		$('.title').eq(0).trigger('click');
	}		
};

$(document).ready(function(){
	$.ajax(
		{
			url: sitePath('/assets/projects.json'),
			dataType: 'json',
			success: function(result){
				parseList(result);
				makeButtons('.project-list-table');
				triggerFirst();
			},
			error: function(xhr, status, errormsg){
				console.log(status, errormsg);
			}
		}
	);
});
