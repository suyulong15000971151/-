$(function(){
	//下拉列表
	$(".money").click(function(event){
    		pullDown($(".moneyImg"),$(".moneyDiv"));
    		$(".selectDiv").hide();
    		$(".markDiv").hide();
    		 event.stopPropagation();
    		 $(".selectImg").addClass("down").attr("src","../../img/select.png");
    	});

	$(".select").click(function(event){
		pullDown($(".selectImg"),$(".selectDiv"));
		event.stopPropagation();
		$(".moneyDiv").hide();
    		$(".markDiv").hide();
    		$(".moneyImg").addClass("down").attr("src","../../img/select.png");
    		
	});
	$(".markTh").click(function(event){
		$(".markDiv").toggle();
		$(".moneyDiv").hide();
    		$(".selectDiv").hide();
		event.stopPropagation();
		$(".selectImg").addClass("down").attr("src","../../img/select.png");
		$(".moneyImg").addClass("down").attr("src","../../img/select.png");
	});
	$(document).click(function(){
		$(".moneyDiv").hide();
		$(".moneyImg").addClass("down").attr("src","../../img/select.png");
		$(".selectDiv").hide();
		$(".selectImg").addClass("down").attr("src","../../img/select.png");
		$(".markDiv").hide();
	})
	//切换协议背景
	$(".dischargedImg").click(function(){
		var imgs = ["../../img/selecrbox.png","../../img/selectbox1.png"];	
		if($(this).hasClass("hasselect")){
			$(this).attr("src",imgs[1]);
			$(this).removeClass("hasselect");
		}else{
			$(this).attr("src",imgs[0]);
			$(this).addClass("hasselect");
		}
	});
	
//	切换付款方式背景
	$(".radios").click(function(){	
		$(this).toggleClass("radioBack");
//		alert($(this).parents(":eq(1)"))
		$(this).parents(":eq(1)").siblings().find(".radios").removeClass("radioBack");
	});
	//买入弹窗
	$(".buyBtn").click(function(){
		$("#buying").show();
		$("body").css("overflow","hidden");
	});
	//卖出弹窗
	$(".saleBtn").click(function(){
		$("#buying").show();
		$(".buyTitle .titleText").html("确认卖出")
		$("body").css("overflow","hidden");
	});
	//拨打电话弹窗
	$(".floatRight").click(function(){
		$("#call").show();
		$("body").css("overflow","hidden");
	});
	//关闭买入弹窗
	$(".buyTitle .titleBtn,#buying .cancelBtn").click(function(){
		$("#buying").hide();
		$("body").css("overflow","visible");
	});
	//关闭卖出弹窗
//	$(".buyTitle .titleBtn").click(function(){
//		$("#sale").hide();
//		$("body").css("overflow","visible");
//	});
	//确认支付弹窗
	$(".unfinishedOrder .signBtn").click(function(){
		$("#confirmPay").show();
		$("body").css("overflow","hidden");
	});
	//确认放币弹窗
	$(".unfinishedDischargeOrder .signBtn").click(function(){
		$("#discharged").show();
		$("body").css("overflow","hidden");
	});
	//关闭确认支付弹窗
	$(".payTitle .titleBtn,.cancelBtn").click(function(){
		$("#confirmPay").hide();

		$("body").css("overflow","visible");
	});
	//取消订单弹窗
	$(".unfinishedOrder .cancelForm").click(function(){
		$("#cancel").show();
		$("body").css("overflow","hidden");
	});
	//关闭支付宝二维码
	$("#zhiFuBao,.close").click(function(){
		$("#zhiFuBao").hide();
		$("body").css("overflow","visible");
	})
	//关闭取消订单弹窗
	$(".cancelTitle .titleBtn,.cancelBtn").click(function(){
		$("#cancel").hide();
		$("body").css("overflow","visible");
	});
	//关闭拨打电话弹窗
	$(".callTitle .titleBtn,#call .cancelBtn").click(function(){
		$("#call").hide();
		$("body").css("overflow","visible");
	});
	//关闭确认放行弹窗
	$(".dischargedTitle .titleBtn").click(function(){
		$("#discharged").hide();
		$("body").css("overflow","visible");
	});
	//订单导航
	$(".liOne").click(function() {
		$(".pro").stop().animate({
			left: '0px'
		}, 300);

	});
	$(".liTwo").click(
		function() {
			$(".pro").stop().animate({
				left: '180px'
			}, 300);

	});
	$(".liThree").click(
		function() {
			$(".pro").stop().animate({
				left: '360px'
			}, 300);

	});
	$(".formNav ul li").click(function(){
		$(this).addClass("colorLi").siblings().removeClass("colorLi");
	})
//	$(".formNav .liOne").click(function() {
//		$(".centerDiv").hide().eq(0).show();
//		
//	});	
//	$(".formNav .liTwo").click(function() {
//		$(".centerDiv").hide().eq(1).show();
//		allUnifished(2);
//	});	
//	$(".formNav .liThree").click(function() {
//		$(".centerDiv").hide().eq(1).show();
//		allUnifished(3);
//	});
//	//表格展开
//	$("#finishedOrderTable tbody tr:even").click(function(){
//      $(this).next("tr").toggle();      
// });
})
function pullDown(img,div){
	var imgs = ["../../img/select.png","../../img/money.png"];
	if(img.hasClass("down")){
		img.attr("src",imgs[1]);
		img.removeClass("down");
		div.show();
	}else{
		img.attr("src",imgs[0]);
		img.addClass("down");
		div.hide();
	}
}


