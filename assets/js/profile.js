var popup = null;

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
			"background-image" : "url(/assets/images/profile/" + url + ".jpg)",
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

$(document).ready(function(){	
	$.each($(".btn"), function(index, value){		
		(new Image()).src = "/assets/images/profile/" + $(this).data("url") + ".jpg";
		
		$(this).on("click", function(){
			makePopup($(this).data("title"), $(this).data("url"), $(this).data("year"), $(this).data("company"))
		});
	});
});