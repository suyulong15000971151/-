$(function(){
	$("#header").load("../../Header.html");
	$("#footer").load("../../Footer.html");
	
});

var resetMesg=true;

//IP地址
//测试
var ipUrl="http://121.196.206.199:8885";
//生产
//var ipUrl="https://agentapi.big.top";


function Message(message,type){
		
		if(resetMesg){
			resetMesg=false
		if(type=="win"){
			$("body").append('<div class="notice animated lightSpeedIn"><i class="iconfont icon-chenggong"></i><span>'+message+'</span></div>')
		}else if(type=="warm"){
			$("body").append('<div class="notice animated lightSpeedIn"><i class="iconfont icon-jinggao1"></i><span>'+message+'</span></div>')
			
		}else{
			$("body").append('<div class="notice animated lightSpeedIn"><i class="iconfont icon-zhifushibai"></i><span>'+message+'</span></div>')
			
		}
		
		setTimeout(function(){
			$(".notice").remove()
			resetMesg=true
		},3000)
		}
	}

//全局变量
var PCData = {
	
	//密码加密前缀
	PREX:"BIG",
	
	//用户服务
	APPUSER_URL:ipUrl+"/appUser/",
	
	//无需权限网关的权限	
	OUTSIDE_AUTHORITY_URL:ipUrl+"/outsideauthority/",
	
	//币币首页数据的websocket
	//测试
	QUOTATION_WEBSOCKET_URL:"ws://118.31.2.91:8026/websocket",
	//生产
	//QUOTATION_WEBSOCKET_URL:"wss://agentapi.big.top:452/websocket",
	
	//交易列表的websocket
	//测试
	TRADELIST_WEBSOCKET_URL:"ws://118.31.2.91:8025/websocket",
	//生产
	//TRADELIST_WEBSOCKET_URL:"wss://agentapi.big.top:454/websocket",
	
	//实时成交列表的websocket
	//测试
	REALTIME_WEBSOCKET_URL:"ws://118.31.2.91:8024/websocket",
	//生产
	//REALTIME_WEBSOCKET_URL:"wss://agentapi.big.top:453/websocket",
	
	//深度的websocket
	//测试
	DEEP_WEBSOCKET_URL:"ws://47.96.154.1:8023/websocket",
	//生产
	//DEEP_WEBSOCKET_URL:"wss://agentapi.big.top:451/websocket",
	
	
	//k线的websocket
	//测试
	KLINE_WEBSOCKET_URL:"ws://118.31.2.91:8008/websocket",
	//生产
	//KLINE_WEBSOCKET_URL:"wss://agentapi.big.top:455/websocket",
	
	
	// //代币记录服务：
	TOKENRECORD_URL:ipUrl+"/tokenRecord/",
	
	// //代币服务：
	 TOKEN_URL:ipUrl+"/token/",
	 
	// //交易服务
	 TRANSACTION_URL:ipUrl+"/transaction/",
	 
	//交易服务
	AGENT_URL:ipUrl+"/agent/",
	
	// //资讯服务
	INFORMATION_URL:ipUrl+"/information/",
	
	
	//用户服务
	PCUSER_URL:ipUrl+"/pcUser/",
	
	APPAGENT_URL:ipUrl+"/agent/",
	//代理服务
	PCAGENT_URL:ipUrl+"/pcAgent/",
	
	//PC端咨询服务
	PCINFO_URL:ipUrl+"/pcInfo/",
	
	PCQUOTATION_URL:ipUrl+"/pcTransaction/",
	
	//PC端交易服务
	PCTRANSACTION_URL:ipUrl+"/pcTransaction/",
	
	//查询单个虚拟币详情
	PCVIRTUAL_DEDAIL:ipUrl+"/token/bigToken/selectBigAdminTokenOne",
	//币币k线的行情
	PCBIBI_KLINE:ipUrl+"/quotation/quotation/PCBIGselectTradingAreaQuotation",
	//导航栏币币交易下查询的代币序列
	PCTOKEN_LIST:ipUrl+"/token/bigToken/selectListBigAdminTokenArea",
	
	PCQUOTATION_TR_URL:ipUrl+"/quotation/",

	setUserInfo : function(obj) {
		localStorage.setItem('pcUser', JSON.stringify(obj));
	},
	getUerInfo : function() {
		var pcUser = localStorage.getItem('pcUser');
		return pcUser ? JSON.parse(pcUser) : null;
	}	
};


//全局方法
var PCUtils = {
	getNowDate: function(value){
		var d = new Date();
		return d.getFullYear() + value + PCUtils.addZero((d.getMonth()+1)) + value + PCUtils.addZero(d.getDate());
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
	getBeforeMonthFull:function(data,num,value){
		d = new Date(data);
		d = +d - 1000*60*60*24*29;
		d = new Date(d);
		var year = d.getFullYear();
		var mon = d.getMonth()+num;
		var day = d.getDate();
		return year+value+(mon<10?('0'+mon):mon)+value+(day<10?('0'+day):day)+" " + PCUtils.addZero(d.getHours()) + ":" + PCUtils.addZero(d.getMinutes())+ ":" +PCUtils.addZero(d.getSeconds());
	},
	getTimeFull: function(time,value){
		var d = new Date(time);
		var s = d.getFullYear() + value + PCUtils.addZero((d.getMonth()+1)) + value + PCUtils.addZero(d.getDate());
		s += " " + PCUtils.addZero(d.getHours()) + ":" + PCUtils.addZero(d.getMinutes())+ ":" +PCUtils.addZero(d.getSeconds());
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
					var reg = new RegExp(/^1[3,4,5,7,8]\d{9}$/); //手机号码验证
					break;
				case 1:
					var reg = new RegExp(/^[1-9]\d{5}$/); //邮政编码验证
					break;
				case 2:
					var reg = new RegExp(/^[0-9a-z_]+@(([0-9a-z]+)[.]){1,2}[a-z]{2,3}$/); //匹配EMAIL
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
				case 8:
					var reg = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,32}$/); //包含数字和字母
					break;
					
				case 9:
					var reg = new RegExp(/^\d+(?=\.{0,1}\d+$|$)/); //正数
					break;
					
					
			} //end switch
			if(reg.exec($.trim(str))) return true;
			else return false;
		} //end if
		else return false;
	},
};

//oss上传
//测试
var client = new OSS.Wrapper({
      region: "oss-cn-shanghai",
      accessKeyId: 'LTAIVw3xw7xOyZMU',
      accessKeySecret: 'DQ0CjlrjJB3fqeMPru6MH7BQLj9Yfs',
      bucket: 'testbigtop'
    });

//生产
// var client = new OSS.Wrapper({
      // region: "oss-cn-hongkong",
      // accessKeyId: 'LTAI0U4rIYVfxJdC',
      // accessKeySecret: '3mOoqu37c7DM3zNKxVt2zWJ1sNHPaF',
      // bucket: 'bigcard'
    // });
    
    

function IdentityCodeValid(code) { 
    var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
    var tip = "";
    var pass= true;

    if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
        tip = "身份证号格式错误";
        pass = false;
    }

   else if(!city[code.substr(0,2)]){
        tip = "地址编码错误";
        pass = false;
    }
    else{
        //18位身份证需要验证最后一位校验位
        if(code.length == 18){
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
            //校验位
            var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++)
            {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];
            if(parity[sum % 11] != code[17]){
                tip = "校验位错误";
                pass =false;
            }
        }
    }
    // if(!pass) alert(tip);
    return pass;
 }

