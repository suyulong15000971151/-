var pcUser=PCData.getUerInfo();

$(function() {
	coverup();
	getArticle(1,10,"");
});


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

function coverup() {
	var str = $(".goodIntroduction").text();
	var tempt = str;
	if(str.length > 50) {
		$(".goodIntroduction").text(tempt.slice(0, 120) + "...");
	}
	var readmore = "<a onclick='showmore()'  style='color: #1660EB;'>[全文]</a>"
	$(".goodIntroduction").append(readmore);
}

function showmore() {
	var str = $(".goodIntroduction").text();
	var tempt = str;
	$(".goodIntroduction").text(str);
	var readmore = "<a onclick='coverup()'  style='color: #1660EB;'>[全文]</a>"
	$(".goodIntroduction").append(readmore);
}

//资讯banner
var data = {
	"extensionTypes": [4]
};
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
				if(banner != null && banner.length > 0) {
					for(var j = 0; j < banner.length; j++) {
						if(j == 0) {
							var topsString= 'tops("'+banner[j].advertisementUrl+'","'+banner[j].id+'")';
							$("#consultarionbanner").empty();
							$("#consultarionbanner").append("<a href='javascript:;' onclick='"+topsString+"' id='top'><img src='"+ banner[j].advertisementPicture+"' name='bgbanner' ></a>");
							$("a[id='top']").attr('onclick');
						}
					}
				}
			}
		}
	},
	error: function(e) {
		console.log(e);
	}
});
//首页banner浏览次数
function tops(obj,id){
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
				location.href = obj;
			}
		});
	}
}
//文章类型
var articleType = "";
$.ajax({
	type: 'GET',
	url: PCData.PCINFO_URL + 'pcinfo/getarticletype',
	dataType: 'json',
	success: function(data) {
		console.log(data);
		if(data.code != "200") {
			return false;
		} else {
			var str = data.data;
			if(str != null && str.length > 0) {
				for(var i = 0; i < str.length; i++) {
					articleType += '<span onclick="getArticleByType(this)">' + str[i] + '</span>';
				}
				$("#articleType").append(articleType);
			}
		}
	},
	error: function(e) {
		console.log(e);
	}
});
//文章类型查询
function getArticleByType(obj) {
	var articleType = $(obj).text();
	if(articleType != null) {
		getArticle(1,10,articleType);
	}
}
//侧边栏广告
var data = {
	"status": 0
};
$.ajax({
	type: 'POST',
	url: PCData.PCINFO_URL + 'pcinfo/selectAdvertisement',
	data: JSON.stringify(data),
	contentType: "application/json",
	dataType: 'json',
	success: function(data) {
		console.log(data);
		if(data.code != "200") {
			return false;
		} else {
			var str = data.data;
			if(str != null && str.length > 0 && str.length == 2) {
				for(var i = 0; i < str.length; i++) {
					if(i == 0) {
						var topsString= 'advertisement("'+str[i].advertisementUrl+'","'+str[i].id+'")';
						$("#advertising1").empty();
						$("#advertising1").append("<a href='javascript:;' onclick='"+topsString+"' id='advertising1'><img src='"+ str[i].advertisementPicture+"' name='advertising1' ></a>");
						$("a[id='advertising1']").attr('onclick');
					} else {
						var topsString= 'advertisement("'+str[i].advertisementUrl+'","'+str[i].id+'")';
						$("#advertising2").empty();
						$("#advertising2").append("<a href='javascript:;' onclick='"+topsString+"' id='advertising2'><img src='"+ str[i].advertisementPicture+"' name='advertising2' ></a>");
						$("a[id='advertising2']").attr('onclick');
					}
				}
			}
		}
	},
	error: function(e) {
		console.log(e);
	}
});

//侧边栏广告浏览次数
function advertisement(obj,id){
	if(id != null) {
		var data = {
			"id": id,
			"tab": 2
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
				location.href = obj;
			}
		});
	}
}

var p = new Paging();
p.init({target:'#pageToolbar',pagesize:10,count:$('#total').val(), toolbar: false,hash: false,callback:function(page,size,count){
	getArticle(page,10,"");
},go:function(p){
	getArticle(p,10,"");
}});




//文章列表
function getArticle(page,rows,articleType){
	var articleList = "";
	var data = {
		"page" : page==null||page==""?1:page,
		"rows" : rows==null||rows==""?10:rows,
		"articleType": articleType
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
				$("#article").empty();
				var str = data.data.objectList;
				if(str != null && str.length > 0) {
					for(var i = 0; i < str.length; i++) {
	
						//时间
						var createTime=PCUtils.getTimeFull(str[i].createTime,"-").substr(0,10);
						
						//文章标题
						var titleOfArticle = str[i].titleOfArticle;
						if(titleOfArticle.length > 25){
							titleOfArticle = titleOfArticle.slice(0,25)+"...";
						}
						//文章来源
						var articleType = str[i].articleType;
						//文章内容
						var redisKey = str[i].redisKey;
						//文章点赞数
						var usefulFrequency = str[i].usefulFrequency;
						//文章被踩数
						var uselessFrequency = str[i].uselessFrequency;
						articleList += '<li><p><span class="contentTitle">' + titleOfArticle + '</span>	<span class="contentTime">' + createTime + '</span><span class="contentAddress">' + articleType + '</span></p><div class="goodIntroduction" value='+str[i].id+' id="'+str[i].id+'">' + redisKey + '</div></li>';
						
					}
					$("#article").append(articleList);
					$(".goodIntroduction").each(function() {
						var str = $(this).text();
						if(str.length > 120) {
							$(this).html(str.slice(0, 120) + "..."+"<a onclick=\"showmore("+ this.id +")\"  style=\"color: #1660EB;\">[详情]</ a>");
						}else{
							$(this).html(str+"<a onclick=\"showmore("+ this.id +")\"  style=\"color: #1660EB;\">[详情]</ a>");
						}
					});
					
					$('#page').val(page==null||page==""?1:page);
					$('#total').val(data.data.total);	
					$('#rows').val(rows==null||rows==""?10:rows);		
					
					//重新渲染分页使用render
					p.render({count:$('#total').val(),pagesize:rows,current:page});
					
				}
			}
		},
		error: function(e) {
			console.log(e);
		}
	});
}





//文章详情跳转
function showmore(id) {
	location.href = "../../view/Consultation/details.html?id=" + id;
}


