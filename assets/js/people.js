$(document).ready(function(){
	$(".people_btn").hover(function(){
		const slug = $(this).data("slug");
		const $cell = $(this).closest("td");
		const index = $cell.index();
		
		$("#" + slug).toggleClass('hidden visible');
		$(".people_bwimage").eq(index).toggleClass('hidden visible');
		$(this).toggleClass('rotate90');
	}, function(){
		const slug = $(this).data("slug");
		const $cell = $(this).closest("td");
		const index = $cell.index();
		
		$("#" + slug).toggleClass('hidden visible');
		$(".people_bwimage").eq(index).toggleClass('hidden visible');
		$(this).toggleClass('rotate90');
	});
	
	$(".container").hover(function(){
		$(this).find('img').toggleClass('hidden visible');
	});
});