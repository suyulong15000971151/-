$(function() {

	

// AppData.userInfo = AppData.getUerInfo();
// AppData.cuserInfo = AppData.getUerInfoC();
// 
	// var u = location.href;
	// var flag = true;
// 
	// //取代系统commit
	// icom.commit = function(text, callback) {
		// if(text && text != '') {
			// var box = $('<aside class="commitBox"><div><p class="text">' + text + '</p><p class="btn"><a href="javascript:;" class="close">取消</a><a href="javascript:;" class="commit">确定</a></p></div></aside>').appendTo('body');
			// box.find('.close').one('click', function() {
				// callback(0);
				// icom.fadeOut(box, 800, function() {
					// box.remove();
				// });
			// });
			// box.find('.commit').one('click', function() {
				// callback(1);
				// icom.fadeOut(box, 800, function() {
					// box.remove();
				// });
			// });
			// icom.fadeIn(box, 800);
		// } //end if
	// } //end func
// 
	// $('input.moneyInput').on('click', function(){
		// this.selectionStart = this.selectionEnd = this.value.length;
	// });
	// if($('input.moneyInput').length > 0){
		// var t = setInterval(function(){
			// $('input.moneyInput').each(function(){
				// var s = this.value;
				// var len = s.length;
				// if(len <= 1){
					// this.value = "¥0";
				// }
				// if(len >= 3 && s.substr(1,1) == "0"){
					// this.value = this.value.replace('0','');
				// }
				// var n = this.value.substr(1).replace(/[^0-9]/g,'').replace(/,/g, "");
				// var m = AppUtils.toThousands(n);
				// this.value = "￥" + m;
			// });
		// },50);
	// }
	// $('input.moneyInput').bind('change', function(){
		// console.log(this.value.length);
		// if(this.value.length == 1){
			// this.value = "¥0";
		// }
	// });
});



//oss上传
var client = new OSS.Wrapper({
      region: "oss-cn-hongkong",
      accessKeyId: 'LTAI0U4rIYVfxJdC',
      accessKeySecret: '3mOoqu37c7DM3zNKxVt2zWJ1sNHPaF',
      bucket: 'bigtoppic'
    });




/**
 * GlobalData
 * */
var GlobalData = {
	
	//后台管理服务：
	ADMIN_URL:"http://47.97.215.64:8882/adminUser/",
	//ADMIN_URL:"http://127.0.0.1:8002/",
	//代币记录服务：
	TOKENRECORD_URL:"http://47.97.215.64:8882/tokenRecord/",
	//TOKENRECORD_URL:"http://127.0.0.1:8013/",
	
	//代币服务：
	TOKEN_URL:"http://47.97.215.64:8882/token/",
	//交易服务
	TRANSACTION_URL:"http://47.97.215.64:8882/transaction/",
	
	//交易服务
	AGENT_URL:"http://47.97.215.64:8882/agent/",
	//资讯服务
	INFORMATION_URL:"http://47.97.215.64:8882/information/",
	//用户服务
	APPUSER_URL:"http://47.97.215.64:8882/appUser/",
	//好友服务
	CHAT_URL:"http://47.97.215.64:8882/chat/",
	//广告管理
	ADVER_URL:"http://47.97.215.64:8882/information/info/",

	
	
	
	setUserInfo : function(obj) {
		localStorage.setItem('adminUser', JSON.stringify(obj));
	},
	getUerInfo : function() {
		var adminUser = localStorage.getItem('adminUser');
		return adminUser ? JSON.parse(adminUser) : null;
	}
	
}

/**
 * GlobalUtils
 * 
*/
var GlobalUtils = {
	getNowDate: function(value){
		var d = new Date();
		return d.getFullYear() + value + GlobalUtils.addZero((d.getMonth()+1)) + value + GlobalUtils.addZero(d.getDate());
	},
	getBeforeMonth:function(data,num,value){
		d = new Date(data);
		d = +d - 1000*60*60*24*29;
		d = new Date(d);
		var year = d.getFullYear();
		var mon = d.getMonth()+num;
		var day = d.getDate();
		return year+value+(mon<10?('0'+mon):mon)+value+(day<10?('0'+day):day);
	},
	
	
	getTimeFull: function(time,value){
		var d = new Date(time);
		var s = d.getFullYear() + value + GlobalUtils.addZero((d.getMonth()+1)) + value + GlobalUtils.addZero(d.getDate());
		s += " " + GlobalUtils.addZero(d.getHours()) + ":" + GlobalUtils.addZero(d.getMinutes())+ ":" +GlobalUtils.addZero(d.getSeconds());
		
		return s;
	},
	addZero: function(value){
		var s = value + "";
		if(s.length == 1){
			s = "0" + s;
		}
		return s;
	},
	checkStr:function(str, type) {

		if(str && str != '') {
			type = type || 0;
			switch(type) {
				case 0:
					var reg = new RegExp(/^1[3-9]\d{9}$/); //手机号码验证
					break;
				case 1:
					var reg = new RegExp(/^[1-9]\d{5}$/); //邮政编码验证
					break;
				case 2:
					var reg = new RegExp(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/); //匹配EMAIL
					break;
				case 3:
					var reg = new RegExp(/^\d+$/); //是否为0-9的数字
					break;
				case 4:
					var reg = new RegExp(/^[a-zA-Z\u0391-\uFFE5]*[\w\u0391-\uFFE5]*$/); //不能以数字或符号开头
					break;
				case 5:
					var reg = new RegExp(/^\w+$/); //匹配由数字、26个英文字母或者下划线组成的字符串
					break;
				case 6:
					var reg = new RegExp(/^[\u0391-\uFFE5]+$/); //匹配中文
					break;
				case 7:
					var reg = new RegExp(/^[a-zA-Z\u0391-\uFFE5]+$/); //不能包含数字和符号
					break;
			} //end switch
			if(reg.exec($.trim(str))) return true;
			else return false;
		} //end if
		else return false;
	},
	changeBlank:function(str){
		if(str==null||str==""||str=="null"||str.length<1){
			return "";
		}else{
			return str.trim();
		}
	},
	
}

