$(function(){
	var url=window.location.pathname
	$.ajax({
		type:"get",
		url:"../../Side.html",
		async:true,
		success:function(data){
			$("#header").html(data)
			
			$("#bod-com").addClass("fadeIn")
			
			console.log(url.split("view/")[1])
//			var indes=$("a").attr("href")
			
			
			setTimeout(function(){
				
				$("#bod-com").insertAfter("#page-wrapper .border-bottom")
				
			},100)
			
		}
	});
})
