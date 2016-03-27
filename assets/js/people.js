var selectedID = 0;

$(document).ready(function(){
	$("#btn_ljw").click(function(){
		switch(selectedID){
			case 0:
				$("#btn_ljw").toggleClass('rotate90');
				$("#ljh").toggleClass('hidden visible');
				selectedID = 1;
			break;
			case 1:
				$("#btn_ljw").toggleClass('rotate90');
				$("#ljh").toggleClass('hidden visible');
				selectedID = 0;
			break;
			case 2:
				$("#btn_chj").toggleClass('rotate90');
				$("#chj").toggleClass('hidden visible');
				$("#btn_ljw").toggleClass('rotate90');
				$("#ljh").toggleClass('hidden visible');
				selectedID = 1;
			break;
		}
	});
	
	$("#btn_chj").click(function(){
		switch(selectedID){
			case 0:
				$("#btn_chj").toggleClass('rotate90');
				$("#chj").toggleClass('hidden visible');
				selectedID = 2;
			break;
			case 1:
				$("#btn_ljw").toggleClass('rotate90');
				$("#ljh").toggleClass('hidden visible');
				$("#btn_chj").toggleClass('rotate90');
				$("#chj").toggleClass('hidden visible');
				selectedID = 2;
			break;
			case 2:
				$("#btn_chj").toggleClass('rotate90');
				$("#chj").toggleClass('hidden visible');			
				selectedID = 0;
			break;
		}
	});
});