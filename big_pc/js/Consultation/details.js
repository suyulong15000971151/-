$(function() {
	//点赞
	$(".praise").click(function() {
		zanDown($(".zan"));
	});
	$(".unpraise").click(function() {
		caiDown($(".cai"));
	});
	//分享
	$(".weixin").click(function() {
		$("#shareEr").show();
		$("body").css("overflow", "hidden");
	});
	$(".close").click(function() {
		$("#shareEr").hide();
		$("body").css("overflow", "visible");
	});
});

function zanDown(img) {
	var imgs = ["../../img/zan.png", "../../img/zan2.png"];
	if(img.hasClass("down")) {
		img.attr("src", imgs[0]);
		img.removeClass("down");
		$(".zanNum").removeClass("zanNumColor");
	} else {
		img.attr("src", imgs[1]);
		img.addClass("down");
		$(".zanNum").addClass("zanNumColor");
		$(".caiNum").removeClass("caiNumColor");
		var imgs = ["../../img/cai.png", "../../img/cai2.png"];
		var cai = $(".cai");
		cai.attr("src", imgs[0]);
		cai.removeClass("down");
	}
}

function caiDown(img) {
	var imgs = ["../../img/cai.png", "../../img/cai2.png"];
	if(img.hasClass("down")) {
		img.attr("src", imgs[0]);
		img.removeClass("down");
		$(".caiNum").removeClass("caiNumColor");
	} else {
		img.attr("src", imgs[1]);
		img.addClass("down");
		$(".caiNum").addClass("caiNumColor");
		$(".zanNum").removeClass("zanNumColor");
		var zan = $(".zan");
		var imgs = ["../../img/zan.png", "../../img/zan2.png"];
		zan.attr("src", imgs[0]);
		zan.removeClass("down");
	}
}

var pcUser = PCData.getUerInfo();

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return decodeURI(r[2]);
	return null;
}
var id = getQueryString("id");

//增加文章浏览次数
if(id != null) {
	var data = {
		"id": id,
		"tab": 3
	};
	$.ajax({
		type: 'POST',
		url: PCData.INFORMATION_URL + 'info/addclick',
		data: JSON.stringify(data),
		contentType: "application/json",
		dataType: 'json',
		success: function(data) {
			console.log(data);
		}
	});
};

//文章详情
var articleList = "";
if(id != null) {
	var data = {
		"id": id
	};
	$.ajax({
		type: 'POST',
		url: PCData.INFORMATION_URL + 'info/getarticlepc',
		data: JSON.stringify(data),
		contentType: "application/json",
		dataType: 'json',
		success: function(data) {
			console.log(data);
			if(data.code != "200") {
				return false;
			} else {
				var str = data.data.objectList;
				if(str != null && str.length > 0) {
					for(var i = 0; i < str.length; i++) {
						var createTime=PCUtils.getTimeFull(str[i].createTime,"-").substr(0,10);
						
						//文章标题
						var titleOfArticle = str[i].titleOfArticle;
						$("#fenxiang").val(titleOfArticle);
						// if(titleOfArticle.length > 25){
							// titleOfArticle = titleOfArticle.slice(0,25)+"...";
						// }
						//文章来源
						var sourceOfTheArticle = str[i].sourceOfTheArticle;
						//文章内容
						var redisKey = str[i].redisKey;
						$("#redisKey").val(redisKey);
						//文章点赞数
						var usefulFrequency = str[i].usefulFrequency;
						//文章被踩数
						var uselessFrequency = str[i].uselessFrequency;
						$("#zan").text(usefulFrequency == 0?'':usefulFrequency);
						$("#cai").text(uselessFrequency == 0?'':uselessFrequency);

						var zan = $("#zan").text();
						if(zan != null && zan != "" && zan!=0) {
							document.getElementById("zan").style.display = "";
						}
						var cai = $("#cai").text();
						if(cai != null && zan != "" && cai!=0) {
							document.getElementById("cai").style.display = "";
						}
						articleList += '<div class="centerTitle"><span style="width:1600px" class="contentTitle">' + titleOfArticle + '</span><span class="contentTime">' + createTime + '</span><span class="contentAddress">' + sourceOfTheArticle + '</span></div><div class="centerdetails">' + redisKey + '</div><input type="hidden" id="articleId" value="' + str[i].id + '">';
					}
					$("#center").append(articleList);
				}
			}
		},
		error: function(e) {
			console.log(e);
		}
	});
}
//文章点赞
$("#usefulFrequency").on('click', function() {
	if(pcUser == null) {
		return false;
	}

	var data = {
		"bauId": pcUser.id,
		"id": id,
		"useFlag": 1
	};
	$.ajax({
		type: 'POST',
		url: PCData.INFORMATION_URL + 'info/usefulcount',
		data: JSON.stringify(data),
		contentType: "application/json",
		dataType: 'json',
		success: function(data) {
			console.log(data);
			if(data.code == "200") {
				if(data.data != null) {
					var dataIsUp = data.data;
					if(dataIsUp.isUp == 1) {
						//文章点赞数
						var usefulFrequency = dataIsUp.usefulFrequency;
						//文章被踩数
						var uselessFrequency = dataIsUp.uselessFrequency;
						$("#zan").text(usefulFrequency);
						Message("点赞成功", "error");
					} else if(dataIsUp.isUp == 3) {
						Message("已经反对过", "error");
					} else if(dataIsUp.isUp == null) {
						Message("取消点赞", "error");
						//文章点赞数
						var usefulFrequency = dataIsUp.usefulFrequency;
						//文章被踩数
						var uselessFrequency = dataIsUp.uselessFrequency;
						$("#zan").text(usefulFrequency == 0?'':usefulFrequency);
					}
				}
				var zan = $("#zan").text();
				if(zan != null && zan != "" && zan != 0) {
					document.getElementById("zan").style.display = "";
				}else{
					document.getElementById("zan").style.display = "none";
				}
			} else {
				Message(data.message, "error");
				var zan = $("#zan").text();
				if(zan != null && zan != "" && zan !=0) {
					document.getElementById("zan").style.display = "";
				}else{
					document.getElementById("zan").style.display = "none";
				}
			}

		}
	});
});
//文章反对
$("#uselessFrequency").on('click', function() {
	if(pcUser == null) {
		return false;
	}
	var data = {
		"bauId": pcUser.id,
		"id": id,
		"useFlag": 0
	};
	$.ajax({
		type: 'POST',
		url: PCData.INFORMATION_URL + 'info/usefulcount',
		data: JSON.stringify(data),
		contentType: "application/json",
		dataType: 'json',
		success: function(data) {
			console.log(data);
			if(data.code == "200") {
				if(data.data != null) {
					var dataIsUp = data.data;
					if(dataIsUp.isUp == 1) {
						Message("已经点过赞", "error");
					} else if(dataIsUp.isUp == 3) {
						//文章点赞数
						var usefulFrequency = dataIsUp.usefulFrequency;
						//文章被踩数
						var uselessFrequency = dataIsUp.uselessFrequency;
						$("#cai").text(uselessFrequency);
						Message("反对成功", "error");
					} else if(dataIsUp.isUp == null) {
						Message("取消反对", "error");
						//文章点赞数
						var usefulFrequency = dataIsUp.usefulFrequency;
						//文章被踩数
						var uselessFrequency = dataIsUp.uselessFrequency;
						$("#cai").text(uselessFrequency == 0?'':uselessFrequency);
					}
				}
				var cai = $("#cai").text();
				if(cai != null && cai != "" && cai != 0) {
					document.getElementById("cai").style.display = "";
				}else{
					document.getElementById("cai").style.display = "none";
				}
			} else {
				Message(data.message, "error");
				var cai = $("#cai").text();
				if(cai != null && cai != "" && cai != 0) {
					document.getElementById("cai").style.display = "";
				}else{
					document.getElementById("cai").style.display = "none";
				}
			}
		}
	});
});

//微博分享
$("#weibo").on('click', function() {
	var titleOfArticle = $("#fenxiang").val();
	var _shareUrl = 'http://v.t.sina.com.cn/share/share.php?&appkey=4117631176'; //真实的appkey，必选参数  
	_shareUrl += '&url=' + encodeURIComponent(window.location.href); //参数url设置分享的内容链接|默认当前页location，可选参数  
	_shareUrl += '&title=' + encodeURIComponent(titleOfArticle); //参数title设置分享的标题|默认当前页标题，可选参数  
	_shareUrl += '&source=' + encodeURIComponent('');
	_shareUrl += '&sourceUrl=' + encodeURIComponent('');
	_shareUrl += '&content=' + 'utf-8'; //参数content设置页面编码gb2312|utf-8，可选参数  
	_shareUrl += '&pic=' + encodeURIComponent(''); //参数pic设置图片链接|默认为空，可选参数  
	window.open(_shareUrl, '_blank', 'toolbar=no,menubar=no,scrollbars=no,resizable=1,location=no,status=0,' + 'width=' + 1000 + ',height=' + 500 + ',top=' + (screen.height - 500) / 2 + ',left=' + (screen.width - 1000) / 2);
})

//QQ分享
$("#tencent").on('click', function() {
	var titleOfArticle = $("#fenxiang").val();
	var redisKey = $("#redisKey").val();
	if(redisKey.length > 50) {
		redisKey = redisKey.replace(/<[^>]+>/g, "").slice(0, 120) + "...";
	}
	var _shareUrl = 'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?';
	_shareUrl += 'url=' + encodeURIComponent(window.location.href); //参数url设置分享的内容链接|默认当前页location
	_shareUrl += '&showcount=' + 0; //参数showcount是否显示分享总数,显示：'1'，不显示：'0'，默认不显示
	_shareUrl += '&desc=' + encodeURIComponent(''); //参数desc设置分享的描述，可选参数
	_shareUrl += '&summary=' + encodeURIComponent(redisKey); //参数summary设置分享摘要，可选参数
	_shareUrl += '&title=' + encodeURIComponent(titleOfArticle); //参数title设置分享标题，可选参数
	_shareUrl += '&site=' + encodeURIComponent(''); //参数site设置分享来源，可选参数
	_shareUrl += '&pics=' + encodeURIComponent(''); //参数pics设置分享图片的路径，多张图片以＂|＂隔开，可选参数
	window.open(_shareUrl, '_blank', 'toolbar=no,menubar=no,scrollbars=no,resizable=1,location=no,status=0,' + 'width=' + 1000 + ',height=' + 500 + ',top=' + (screen.height - 1000) / 2 + ',left=' + (screen.width - 500) / 2);
});

//微信分享
$("#weChat").on('click', function() {
	$("#output").empty();
	var qrcode = new QRCode(document.getElementById("output"));
	var QRCodeUrl = window.location.href;
	qrcode.makeCode(QRCodeUrl);
})