var pcUser=PCData.getUerInfo();
if(pcUser!=null&&pcUser.phone!=null){
	$("#loginPhone").text(pcUser.phone);
	$("#experience").hide();
	$("#experience1").show();
}


if(pcUser!=null&&pcUser.agentStatus!=null&&pcUser.agentStatus==1){
	$("#c2cDiv").hide();
}

if(pcUser!=null){
	$("#registerhref").hide();
	$("#loginherf").hide();
	$("#fundDiv").show();
	$("#personDiv").show();
}else{
	$("#registerhref").show();
	$("#loginherf").show();
	$("#fundDiv").hide();
	$("#personDiv").hide();
}



function doLoginOut(){
	var data = {
		"bauId":pcUser.id
	};
	$.ajax({
		type : 'POST',
		url :PCData.APPUSER_URL + 'login/loginOut',
		data : JSON.stringify(data),
		contentType : "application/json",
		dataType : 'json',
		async: false,
		success : function(data) {
			if(data!=null){
				localStorage.removeItem('pcUser');
				location.href = "view/system_log/login.html";
			}
		},
		error : function(e) {
			console.log(e);
		}
	});	
}



var websocket = getWebsocket();

if(websocket == null) {
	console.log("你的浏览器不支持websocket服务");
}

$(document).ready(function() {
	$("#liDiv").find("table").find("tbody").addClass("BIGT");
	$("#liDiv").show();
	websocket.onopen = function() {
		websocket.send("BIGT");
	};
	websocket.onmessage = function(event) {
		strJoinFn(event, "BIGT", "BIGT");
	};

});


var tipsList = "";
var data = {
	"extensionTypes": [3, 1]
};
//查询首页banner
$.ajax({
	type: 'POST',
	url: PCData.INFORMATION_URL + 'info/getinfo',
	data: JSON.stringify(data),
	contentType: "application/json",
	dataType: 'json',
	success: function(data) {
		console.log(data);
		if(data.code != "200") {
			return false;
		} else {
			if(data.data != null) {
				var banner = data.data.banner;
				var tips = data.data.tips;
				if(banner != null && banner.length > 0 && banner.length == 3) {
					for(var j = 0; j < banner.length; j++) {
						if(j == 0) {
							$("#banner1").val(banner[j].id);
							$("#advertisementUrl1").val(banner[j].advertisementUrl);
//							$("a[name='demo11']").attr('href', banner[j].advertisementUrl);
							$("img[name='demo1']").attr('src', banner[j].advertisementPicture);
						} else if(j == 1) {
							$("#banner2").val(banner[j].id);
							$("#advertisementUrl2").val(banner[j].advertisementUrl);
//							$("a[name='demo22']").attr('href', banner[j].advertisementUrl);
							$("img[name='demo2']").attr('src', banner[j].advertisementPicture);
						} else if(j == 2) {
							$("#banner3").val(banner[j].id);
							$("#advertisementUrl3").val(banner[j].advertisementUrl);
//							$("a[name='demo33']").attr('href', banner[j].advertisementUrl);
							$("img[name='demo3']").attr('src', banner[j].advertisementPicture);
						}
					}
				}
				if(tips != null && tips.length > 0) {
					$("#tipsId").empty();
					for(var x = 0; x < tips.length; x++) {
						tipsList += '<li><a onclick="doSomething(this)" href="javascript:;">' + tips[x].title + '<input type="hidden" name="tip"  value="'+tips[x].id+','+tips[x].advertisementUrl+'"></a></li>'
					}
					$("#tipsId").html(tipsList);
				}
			}
		}
	},
	error: function(e) {
		console.log(e);
	}
});
//推广点击次数
function doSomething(obj){
	var advertisementUrlId = $(obj).find('input[name = "tip"]').val();
	var UrlId = advertisementUrlId.split(',');
	var id = UrlId[0];
	var advertisementUrl = UrlId[1];
	if(id != null) {
		var data = {
			"id": id,
			"tab": 1
		};
		$.ajax({
			type: 'POST',
			url: PCData.INFORMATION_URL + 'info/addclick',
			data: JSON.stringify(data),
			contentType: "application/json",
			dataType: 'json',
			success: function(data) {
				console.log(data);
				if(data.code != "200") {
					return false;
				}
				location.href = advertisementUrl;
			}
		});
	}
};
//第一张banner点击次数
$("#img1").on('click', function() {
	var id = $("#banner1").val();
	var advertisementUrl = $("#advertisementUrl1").val();
	if(id != null) {
		var data = {
			"id": id,
			"tab": 1
		}
		$.ajax({
			type: 'POST',
			url: PCData.INFORMATION_URL + 'info/addclick',
			data: JSON.stringify(data),
			contentType: "application/json",
			dataType: 'json',
			success: function(data) {
				console.log(data);
				if(data.code != "200") {
					return false;
				}
				location.href = advertisementUrl;
			}
		});
	}
});
//第二张banner点击次数
$("#img2").on('click', function() {
	var id = $("#banner2").val();
	var advertisementUr2 = $("#advertisementUrl2").val();
	if(id != null) {
		var data = {
			"id": id,
			"tab": 1
		}
		$.ajax({
			type: 'POST',
			url: PCData.INFORMATION_URL + 'info/addclick',
			data: JSON.stringify(data),
			contentType: "application/json",
			dataType: 'json',
			success: function(data) {
				console.log(data);
				if(data.code != "200") {
					return false;
				}
				location.href = advertisementUr2;
			}
		});
	}

});
//第三张banner点击次数
$("#img3").on('click', function() {
	var id = $("#banner3").val();
	var advertisementUr3 = $("#advertisementUrl3").val();
	if(id != null) {
		var data = {
			"id": id,
			"tab": 1
		}
		$.ajax({
			type: 'POST',
			url: PCData.INFORMATION_URL + 'info/addclick',
			data: JSON.stringify(data),
			contentType: "application/json",
			dataType: 'json',
			success: function(data) {
				console.log(data);
				if(data.code != "200") {
					return false;
				}
				location.href = advertisementUr3;
			}
		});
	}

});



$(function() {
	//这里是海报banner
	$(".banner .index_focus").hover(function() {
		$(this).find(".banner .index_focus_pre,.index_focus_next").stop(true, true).fadeTo("show", 1);
	}, function() {
		$(this).find(".banner .index_focus_pre,.index_focus_next").fadeOut();
	});

	$(".banner .index_focus").slide({
		titCell: ".slide_nav a ",
		mainCell: ".bd ul",
		delayTime: 500,
		interTime: 3500,
		prevCell: ".index_focus_pre",
		nextCell: ".index_focus_next",
		effect: "fold",
		autoPlay: true,
		trigger: "click",
		startFun: function(i) {
			$(".index_focus_info").eq(i).find("h3").css("display", "block").fadeTo(1000, 1);
			$(".index_focus_info").eq(i).find(".text").css("display", "block").fadeTo(1000, 1);
		}
	});

	//	changeDivWidth(); 
	//海报变化事件
	//海报变化事件
	window.onresize = window.onload = function() {
		$(".banner .index_focus .pic").css("height", "auto");
		changeDivWidth();
	};

	function changeDivWidth() {

		$(".banner .index_focus .pic").css("width", document.body.clientWidth);
		setTimeout(function() {
			var imgheight = document.getElementById("pcimg").height;
			$(".banner .bd ul").css("height", imgheight);
			if(imgheight == 0) {
				location.reload();
			}
		}, 400);
	}

	//交易导航
	$(".li_one").mouseenter(function() {
		$(".pro").stop().animate({
			left: '0px'
		}, 300);
		commonTab("BIGT");
	});
	//	event.preventDefault();
	$(".li_two").mouseenter(
		function() {
			var moveWidth = parseInt($(this).width()) + parseInt($(this).css("marginRight")) + 13 + "px";
			$(".pro").stop().animate({
				left: moveWidth
			}, 300);
			commonTab("BTC");
		});
	//	event.preventDefault();
	$(".li_three").mouseenter(
		function() {
			var moveWidth = (parseInt($(this).width()) + parseInt($(this).css("marginRight")) + 13)*2 + "px";
			$(".pro").stop().animate({
				left: moveWidth
			}, 300);
			commonTab("ETH");
		});
	//	event.preventDefault();
	$(".li_four").mouseenter(
		function() {
			moveWidth = (parseInt($(this).width()) + parseInt($(this).css("marginRight")) + 13)*3 + "px";
			$(".pro").stop().animate({
				left: moveWidth
			}, 300);
			commonTab("CNDT");
		});
	//	event.preventDefault();
	//交易导航结束
	var ref;
	$(".navigation li").click(function() {
		commonTab("");
	});
	//公告文字滚动

	setInterval('autoScroll(".apple")', 2000);
	
	function commonTab(obj){
		if(!!ref) {
			clearInterval(ref);
		}
		var params="";
		if($(this).index() == 0) {
			params = "BIGT";
		} else if($(this).index() == 1) {
			params = "BTC";
		} else if($(this).index() == 2) {
			params = "ETH";
		} else if($(this).index() == 3) {
			params = "CNDT";
		};
		if((params==null||params=="")&&obj!=null&&obj!=""){
			params=obj;
		}
		$("#liDiv").find("table").find("tbody").removeClass().addClass(params);
		websocket.send(params);
		websocket.onmessage = function(event) {
			strJoinFn(event, params, params);
		};
		ref = setInterval(function() {
			websocket.send(params);
			websocket.onmessage = function(event) {
				strJoinFn(event, params, params);
			};

		}, 5000);
	}
	
});

function autoScroll(obj) {
	$(obj).find("ul").animate({
		marginTop: "-39px"
	}, 500, function() {
		$(this).css({
			marginTop: "0px"
		}).find("li:first").appendTo(this);
	})
}

//创建websocket对象
function getWebsocket() {
	var websocket = null;
	if('WebSocket' in window) {
		websocket = new WebSocket(PCData.QUOTATION_WEBSOCKET_URL);
		return websocket;
	} else {
		return null;
	}
}

function strJoinFn(r, v, params) {
	var res, resCode, resData, ele;
	res = JSON.parse(r.data);
	resCode = res.code;
	if(resCode != "200") {
		return;
	};
	ele = $("." + v);
	if(res.data.length == 0) {
		ele.html("");
	} else {
		var _html = "";
		for(var i = 0; i < res.data.length; i++) {
			var str = res.data[i].rate;
			var reg = RegExp(/-/);

			var rate_html = "";
			if(reg.test(str)) {
				rate_html = "<td style=\"color:red;\">" + Number(str).toFixed(2) +"%"+ "</td>";
			} else {
				rate_html = "<td style=\"color:green ;\">" + Number(str).toFixed(2)+"%" + "</td>";
			};
			var price_cny = ((res.data[i].price)*(res.data[i].tokenprice)).toFixed(6);
			var high_cny  = ((res.data[i].high)*(res.data[i].tokenprice)).toFixed(6);
			var low_cny   = ((res.data[i].low)*(res.data[i].tokenprice)).toFixed(6);
			_html = _html + "<tr onclick='goKineNew(\""+res.data[i].tokenName+"\",\""+v+"\",\""+res.data[i].tokenId+"\");'>" +
				"<td>" + res.data[i].tokenName + "/" + params + "</td>" +
				"<td>" + res.data[i].price.toFixed(6) + "≈￥" + price_cny + "</td>" +
				rate_html +
				"<td>" + res.data[i].high.toFixed(6) + "≈￥" + high_cny + "</td>" +
				"<td>" + res.data[i].low.toFixed(6) + "≈￥" + low_cny + "</td>" +
				"<td>" + res.data[i].vol.toFixed(6) + "</td>" +
				"<td>" + "<a href='view/k_line/k_line.html?Token="+res.data[i].tokenName+"&Trading="+v+"&TokenId="+res.data[i].tokenId+"'>去交易</a>" + "</td>" +
				"</tr>";

		};
		ele.html("");
		ele.html(_html);
	}

}

function goKineNew(Token,Trading,TokenId){
	location.href = "view/k_line/k_line.html?Token="+Token+"&Trading="+Trading+"&TokenId="+TokenId;
}

function goKine(){
	location.href = "view/k_line/k_line.html";
}

function goRegister(){
	var phone=$("#phone").val();
	if(phone==null||phone==""||phone.length<11){
		location.href = "view/system_register/register.html?phone";
	}else{
		location.href = "view/system_register/register.html?phone="+phone;
	}
	
}




