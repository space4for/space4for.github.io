var popup = null;

var makePopup = function(title, url){
	var pos_top = ($(".profile_image").offset().top);
	var pos_left = ($(".profile_image").offset().left);
	
	if(popup == null){
		popup = $("<div/>", {
			"class":"popup"
		}).css({		
			'position':'fixed',
			'top':pos_top +'px',
			'left':pos_left+'px',
			"width":"400px",
			"height":"400px",
			'backgroundColor': '#FFF',
			'cursor':'pointer',
			"display":"none"
		});	
		
		var image = $("<div/>").appendTo(popup).css({
			"background-image" : "url(/assets/images/profile/" + url + ".jpg)",
			"background-position": "center",
			"background-size": "contain",
			"background-repeat": "no-repeat",
			"width":"400px",
			"height":"350px",
		});
		
		var desc = $("<div/>", {
		text: title
		}).appendTo(popup).css({
			"top":0,
			"text-align":"center",
			"font-size": "0.7em"
		});
		
		popup.appendTo($('body')).stop().fadeIn(1000);
		
		popup.on("click", function(){
			$(this).fadeOut(1000);
		});	
	}
	else{
		popup.css({
			'top':pos_top +'px',
			'left':pos_left+'px'
		});
		popup.children().eq(0).css({
			"background-image" : "url(/assets/images/profile/" + url + ".jpg)"			
		});
		
		popup.children().eq(1).text(title);
		popup.stop().fadeIn(1000);
	}
	
	$(window).resize(function(){
		var pos_top = ($(".profile_image").offset().top);
		var pos_left = ($(".profile_image").offset().left);
		
		popup.css({
			'top':pos_top +'px',
			'left':pos_left+'px'
		});
	});
}

$(document).ready(function(){	
	$.each($(".btn"), function(index, value){		
		(new Image()).src = "/assets/images/profile/" + $(this).data("url") + ".jpg";
		
		$(this).on("click", function(){
			makePopup($(this).data("title"), $(this).data("url"))
		});
	});
});