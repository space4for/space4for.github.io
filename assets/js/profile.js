var popup = null;

var makePopup = function(title, url, year, company){
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
			"background-position": "50% 70%",
			"background-size": "cover",
			"background-repeat": "no-repeat",
			"width":"400px",
			"height":"380px",
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
		
		popup.appendTo($('body')).stop().fadeIn(500);
		
		popup.on("click", function(){
			$(this).fadeOut(500);
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
			makePopup($(this).data("title"), $(this).data("url"), $(this).data("year"), $(this).data("company"))
		});
	});
});