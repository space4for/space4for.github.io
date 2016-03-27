var projectList = [];

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
	})
	
	projectList = [medical, office, leisure, residence, education, commercial];
}

var makeButtons = function(place){
	for (var i in projectList){
		var list = projectList[i];
		for (var j in list){
			var row = $("<div/>", {
				"class":"row"
			});
			
			var col1;
			if(j == 0){
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
			
			var img_list = JSON
			var col2 = $("<div/>", {
				"class":"title",
				text: list[j].title,
				"data-image":JSON.stringify(list[j].images),
				"data-type":list[j].type,
				"data-client":list[j].client,
				"data-title":list[j].title,
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
}

var onHover = function(){	
	var images = $(this).data('image');
	
	$(".thumbshow").css({"top": $(this).offset().top});
	$(".thumbshow").css({"left": $(this).offset().left - 230});
	
	if($(".thumb").length){
		$(".thumb").attr("src", images[0].url);	
		$(".thumb").stop().fadeToggle(500, "linear");
	}
	else{	
		var img = $("<img/>", {
			"class": "thumb",
			src:images[0].url			
		});		
		$(".thumbshow").html(img);
	}	
}
var mySwiper = null;

var showSlider = function(){
	$(".title").removeClass('selected');
	$(this).toggleClass('selected');
	console.log("show slider" + $(this).data('image')[0].url);
	
	
	if(mySwiper == null){		
		
		mySwiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        effect: 'fade',
		loop: true
		});
		
		var list = $(this).data('image');
		for (i in list){
			mySwiper.appendSlide('<div class="swiper-slide" style="background-image:url(' + list[i].url + ')"></div>');
		}
		$(".swiper-container").css({"visibility" : "visible"});
		$(".swiper-button-prev").css({"visibility" : "visible"});
		$(".swiper-button-next").css({"visibility" : "visible"});
		
		mySwiper.slideTo(1);
		mySwiper.update(true);
		
	}
	else
	{
		mySwiper.removeAllSlides();
		var list = $(this).data('image');
		for (i in list){
			mySwiper.appendSlide('<div class="swiper-slide" style="background-image:url(' + list[i].url + ')"></div>');
		}
		$(".swiper-container").css({"visibility" : "visible"});
		mySwiper.slideTo(1);
		mySwiper.update(true);
		
	}
	
	
	var type = $(this).data('type');
	var client = $(this).data('client');
	var location = $(this).data('location');
	var year = $(this).data('year');	
	
	$(".description").fadeOut(200, function(){
		$(".description").html( 
			"<div class='desc'><b>About This Project</b><br>" + 
			"Type:" + type + "<br>" +
			"Client:" + client + "<br>" +
			"Location:" + location + "<br>" +
			"Project Year:" + year + "</div>"		
		);
	}
	).fadeIn();
	//$(".description").fadeToggle(500, "linear");
}

$(document).ready(function(){
	$.ajax(
		{
			url: "/assets/projects.json",
			success: function(result){
				parseList(result);
				makeButtons('.project-list-table');
			},
			error: function(xhr, status, errormsg){
				console.log(errormsg);
			}
		}
	);
	/*
	var mySwiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30,
        effect: 'fade'
	});*/
});