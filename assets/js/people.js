$(document).ready(function(){	
	$("#btn_ljw").hover(function(){
		$("#ljh").toggleClass('hidden visible');
		$(".people_bwimage:eq(0)").toggleClass('hidden visible');
		$("#btn_ljw").toggleClass('rotate90');
	}, function(){
		$("#ljh").toggleClass('hidden visible');
		$(".people_bwimage:eq(0)").toggleClass('hidden visible');
		$("#btn_ljw").toggleClass('rotate90');
	});
	
	$("#btn_chj").hover(function(){
		$("#chj").toggleClass('hidden visible');
		$(".people_bwimage:eq(1)").toggleClass('hidden visible');
		$("#btn_chj").toggleClass('rotate90');
	}, function(){
		$("#chj").toggleClass('hidden visible');
		$(".people_bwimage:eq(1)").toggleClass('hidden visible');
		$("#btn_chj").toggleClass('rotate90');
	});
});