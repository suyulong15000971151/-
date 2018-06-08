$(function(){
	var adminUser=GlobalData.getUerInfo();

 $(".clear").click(function(){
    	$(this).parents(".profile-element").toggleClass("open")
    })

	jQuery('#output').qrcode(adminUser.googleUrl);
	$("#googleKey").html(adminUser.googleKey);
	

//     $('.dept_select').chosen();

//修改密码
	$(".cre_psd").click(function(evt) {

					evt.stopPropagation()

					$("#sitchm").css("display", "block")

					$("#sitchm").addClass("fadeIn")
					$("#sitchm .content").addClass("zoomInDown")
				})
	//谷歌认证

$(".googles").click(function(evt) {
					evt.stopPropagation()

					$("#sitchg").css("display", "block")

					$("#sitchg").addClass("fadeIn")
					$("#sitchg .content").addClass("zoomInDown")
				})



	
	
	
	
	
	$("button.can-close").click(function(){
					$(this).parents(".dio-close").addClass("fadeIn")
					$(this).parents(".content").addClass("fadeIn")
					
					var _this=this
					$(this).parents(".dio-close").removeClass("fadeIn")
					$(this).parents(".content").removeClass("zoomInDown")
					$(this).parents(".dio-close").addClass("fadeOut")
					$(this).parents(".content").addClass("zoomOutDown")
					t = setTimeout(function() {
						$(_this).parents(".dio-close").removeClass("fadeOut")
						$(_this).parents(".content").removeClass("zoomOutDown")
						$(_this).parents(".dio-close").css("display", "none")
					}, 1000)
				})
	
	
	
	$(".dio-close .title a").click(function(){
					$(this).parents(".dio-close").addClass("fadeIn")
					$(this).parents(".content").addClass("fadeIn")
					
					var _this=this
					$(this).parents(".dio-close").removeClass("fadeIn")
					$(this).parents(".content").removeClass("zoomInDown")
					$(this).parents(".dio-close").addClass("fadeOut")
					$(this).parents(".content").addClass("zoomOutDown")
					t = setTimeout(function() {
						$(_this).parents(".dio-close").removeClass("fadeOut")
						$(_this).parents(".content").removeClass("zoomOutDown")
						$(_this).parents(".dio-close").css("display", "none")
					}, 1000)
				})
				
				
				
				$("button.cof-close").click(function(){
					$(this).parents(".dio-close").addClass("fadeIn")
					$(this).parents(".content").addClass("fadeIn")
					var _this=this
					
					
					$(this).parents(".dio-close").removeClass("fadeIn")
					$(this).parents(".content").removeClass("zoomInDown")
					$(this).parents(".dio-close").addClass("fadeOut")
					$(this).parents(".content").addClass("zoomOutDown")
					t = setTimeout(function() {
						$(_this).parents(".dio-close").removeClass("fadeOut")
						$(_this).parents(".content").removeClass("zoomOutDown")
						$(_this).parents(".dio-close").css("display", "none")
					}, 1000)
				})
})
//$('.dept_select').chosen();