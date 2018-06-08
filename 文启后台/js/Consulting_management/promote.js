$(function() {
	new Vue({
		el: "#app",
		data: {
			databox: [],
			item_: "item_",
			bauId: "",
			total:'',
			row:'15',
			page:'1',
			dataID:{},
			flat:true,
			addimg:{
				
			}

		},
		methods: {
			
		
			//首页请求东西
			getAdminUserAll:function(page,rows){
//				var flat="true"
				//这里是分页
			var _this=this
//			if(this.flat){
					var p = new Paging();
			p.init({target:'#pageToolbar',pagesize:5,count:_this.total, toolbar: true,hash: true,callback:function(page,size,count){
//          getParamsAll(_this.page,_this.row);
			},go:function(p){
//				getParamsAll(p,_this.row);
			},changePagesize:function(ps){
//           getParamsAll(_this.page,ps);
			}});
//			}
				
				//当前登陆用户ID
			var adminUser = GlobalData.getUerInfo();
			if(adminUser == null || adminUser.id == null || adminUser.id == "") {
				location.href = "../../login.html";
			};
			var bauId = adminUser.id;
//			console.log(bauId)
			this.bauId = bauId

//			var _this = this
			function boxx(){
				
			
				$.ajax({
				type: "post",
				url: GlobalData.ADVER_URL+"getextension",
				async: true,
				dataType: "json",
				contentType: "application/json",
				data: JSON.stringify({
					page: page,
					rows: rows
				}),
				success: function(res) {
//					console.log(res.data.total)
					_this.total=res.data.total
					_this.databox = res.data.objectList;
					console.log(_this.databox)
					_this.flat=false;
					p.render({count:res.data.total,pagesize:_this.row,current:1});
				},
				error: function() {
					console.log("错误")
				}

			});
			}
			boxx()
			},
			//这里是切换分页
			pageTool:function(){
				
//				var son= $(".ui-paging-container li.ui-pager").size()
//				for (var i=0;i<son-1;i++) {
//					if($(".ui-paging-container li.ui-pager").eq(i).text=="Infinity"){
//						$(".ui-paging-container li.ui-pager").remove()
//					}
//				}
				var _this=this
				var page=$(".ui-paging-container li.ui-pager:hover, .ui-paging-container li.focus").text();
//				var row=$(".ui-paging-container li.ui-paging-toolbar select").val();
				
                    console.log(page)
             
               	if(this.page!=page){
               		  	this.databox=[];
               		this.getAdminUserAll(page,this.row)
               		var length=$(".ui-paging-container").size()
               		$(".ui-paging-container").eq(length-1).remove()
               		this.page=page
               	}
               	$(".ui-paging-container li.ui-paging-toolbar select").change(function(){
              
               		this.databox=[];
               		var row=$(".ui-paging-container li.ui-paging-toolbar select").val();
               		_this.getAdminUserAll(1,row)
               		var length=$(".ui-paging-container").size()
               		$(".ui-paging-container").eq(length-2).remove()
               		_this.row=row
               		setTimeout(function(){
               			$("li[data-page='Infinity']").css("display","none")
               		$(".ui-paging-container li.ui-paging-ellipse").next().remove()
               		},200)
               		
               	})
//             	this.page=page;
//             	this.row=row;
              
			},
			
			
			search:function(){
				
				var _this=this
				
				var p = new Paging();
			p.init({target:'#pageToolbar',pagesize:5,count:_this.total, toolbar: true,hash: true,callback:function(page,size,count){
//          getParamsAll(_this.page,_this.row);
			},go:function(p){
//				getParamsAll(p,_this.row);
			},changePagesize:function(ps){
//           getParamsAll(_this.page,ps);
			}});
				
				
				
				this.databox=[]
//				var _this=this
				var bauId=this.bauId;
				var company=$(".Affiliated ").val()
				var id=$(".tuiguangID").val()
				var page=this.page
				var row=this.row
				
				console.log($(".tuiguang").val())
//				var status=$(".chosen-container-single .chosen-single span").text()
//				if(status=="启用"){
//					status=0
//				}else if(status=="停用"){
//					status=1
//				}else{
//					status=null
//				}
				$.ajax({
							type:"post",
							url:GlobalData.ADVER_URL+"getextension",
							async:true,
							dataType: "json",
						    contentType: "application/json",
						    data: JSON.stringify({
							  bauId: _this.bauId,
							  page: _this.page,
							  rows: _this.row,
							  title:$(".tuiguang").val(),
							  id:id
//							  status:1
						}),
						success:function(res){
							console.log("成功")
							console.log(res)
							if(res.code==200){
								_this.databox=res.data.objectList
								
								p.render({count:res.data.total,pagesize:_this.row,current:1});
//						_this.getAdminUserAll(1,_this.row)
				          var length=$(".ui-paging-container").size()
               		      $(".ui-paging-container").eq(length-2).remove()
								
								
                          $("body").append('<div class="tips win slideInDowns"><i class="iconfont icon-chenggong"></i><div class="tip_text warm-box">'+res.message+'</div></div>')
								$('#adopt').addClass("fadeOut")
							}else{
							$("body").append('<div class="tips error slideInDowns"><i class="iconfont icon-zhifushibai"></i><div class="tip_text warm-box">'+res.message+'</div></div>')
								
							}
							
						},
						error:function(res){
							console.log("失败")
							$("body").append('<div class="tips error slideInDowns"><i class="iconfont icon-zhifushibai"></i><div class="tip_text warm-box">'+res.message+'</div></div>')
							
						}
						});
			},
			//这里是重置
			reset:function(){
				this.databox=[]
				$(".material .material-box .form-control").val("")
				 this.getAdminUserAll(1,this.row)
//				  this.getAdminUserAll(1,this.row)
				 var length=$(".ui-paging-container").size()
               		$(".ui-paging-container").eq(length-2).remove()
			},
			
			mescue:function(){
//				           alert("0000")
                       this.dataID=$("#Adver").val()
                        var _this=this
						var imgUrl=$("#adopt .adopt-box .content .contain .left .load #nextview").attr("src");
						var weight=$('#adopt .adopt-box .content .contain .contain-item .weight').val()
						var title=$('#adopt .adopt-box .content .contain .contain-item .titles').val()
						var address=$('#adopt .adopt-box .content .contain .contain-item .address').val()
						var state=$('#adopt .adopt-box .content .contain .contain-item .state').val()
						var extensionType=$('#adopt .adopt-box .content .contain .contain-item .extensionType').val()
						
						console.log("----")
						console.log(_this.dataID)
                          if(state=="全部"){
                          	state=null
                          }
						if($("#Adver").val()){
							URL=GlobalData.ADVER_URL+"editextension"
						}else{
							URL=GlobalData.ADVER_URL+"addextension"
						}
						
//						var datas={
//							  bauId: _this.bauId,
//							  weight: weight,
//							  advertisementPicture: imgUrl,
//							  advertisementUrl:address,
//							  affiliatedCompany:company,
//							  status:state,
//							  createTime:new Date().getTime()
//						}
						$.ajax({
							type:"post",
							url:URL,
							async:true,
							dataType: "json",
						    contentType: "application/json",
						    data: JSON.stringify({
							  id:_this.dataID,
							  bauId: _this.bauId,
							  weight: weight,
							  advertisementPicture: imgUrl,
							  advertisementUrl:address,
							  title:title,
							  status:0,
							  extensionType:extensionType
						}),
						success:function(res){
							console.log("成功")
							console.log(res)
							if(res.code==200){
//								_this.databox.unshift(datas)
                           _this.getAdminUserAll(1,_this.row)
               		        var length=$(".ui-paging-container").size()
               		         $(".ui-paging-container").eq(length-1).remove()
                           
                          $("body").append('<div class="tips win slideInDowns"><i class="iconfont icon-chenggong"></i><div class="tip_text warm-box">'+res.message+'</div></div>')
								$('#adopt').addClass("fadeOut")
								$('#adopt').removeClass("fadeIn")
								setTimeout(function(){
								$('#adopt').css("display","none")
									
								},1000)
							}else{
							$("body").append('<div class="tips error slideInDowns"><i class="iconfont icon-zhifushibai"></i><div class="tip_text warm-box">'+res.message+'</div></div>')
								
							}
							
						},
						error:function(res){
							console.log("失败")
							$("body").append('<div class="tips error slideInDowns"><i class="iconfont icon-zhifushibai"></i><div class="tip_text warm-box">'+res.message+'</div></div>')
							
						}
						});
					
			},
			
			
			//这里是添加按钮
			Addimg:function(){
				$("#Adver").val("")
				$("#adopt .adopt-box .content .title span").text("新增")
				
				$("#adopt .adopt-box .content .contain .left .load img").attr("src","");
				$('#adopt .adopt-box .content .contain .contain-item .titles').val("")
				$('#adopt .adopt-box .content .contain .contain-item .weight').val("")
				$('#adopt .adopt-box .content .contain .contain-item .extensionType').val("")
				$('#adopt .adopt-box .content .contain .contain-item .address').val("")
				$('#adopt .adopt-box .content .contain .contain-item .state').val("全部")
				
				
				$("#adopt").css("display", "block")
					$("#adopt").addClass("fadeIn")
					$("#adopt").removeClass("fadeOut")
					$("#adopt .content").addClass("zoomInDown")
					var _this=this
					
			},
			//这里是删除按钮
			deletes:function(index){
				
				   $("#sitchd").css("display", "block")
				$("#sitchd").addClass("fadeIn")
				$("#sitchd .content").addClass("zoomInDown")
				$("#sitchd .sitch-box .content .contain .tip-con").text("确认删除此广告")
				var _this=this
//				 var bauId=this.bauId
				  var userId=$(".person_" + index).find(".userID").val()
				  $("#sitchd .sitch-box .content .contain .set button.btn-success").click(function(){
				   $.ajax({
				   	type:"post",
				   	url:GlobalData.ADVER_URL+"delextension",
				   	async:true,
				   	dataType: "json",
						    contentType: "application/json",
						    data: JSON.stringify({
							  bauId: _this.bauId,
							  id:userId
						}),
						success:function(res){
							var msg="删除成功"
							console.log("成功")
							console.log(res)
							 _this.getAdminUserAll(1,_this.row)
               		        var length=$(".ui-paging-container").size()
               		         $(".ui-paging-container").eq(length-1).remove()
							
							
//							_this.databox.splice(index,1)
                          $("body").append('<div class="tips win slideInDowns"><i class="iconfont icon-chenggong"></i><div class="tip_text warm-box">'+msg+'</div></div>')
							
						},
						error:function(){
							console.log("失败")
						}
				   });
				   });
			},
			//编辑图片
			editpicture:function(index){
			
				$("#adopt .adopt-box .content .title span").text("编辑")
				$("#Adver").val($(".person_" + index).find(".allVal").val())
				 $("#adopt").css("display", "block")
				 $("#adopt").removeClass("fadeOut")
					$("#adopt").addClass("fadeIn")
					$("#adopt .content").addClass("zoomInDown")
					var _this=this
					
//					var userId=$(".person_" + index).find(".userID").val()
					var batid=$(".person_" + index).find(".userID").val()
//               var status=$(".person_" + index).find(".status").val()
                 var weight=$(".person_" + index).find(".weight").val()
                 var advertisementPicture=$(".person_" + index).find(".imgurl").val()
                 var title=$(".person_" + index).find(".title").val()
                 var status=$(".person_" + index).find(".status").val()
                 var extensionType=$(".person_" + index).find(".extensionType").val()
                 var advertisementUrl=$(".person_" + index).find(".advertisementUrl").val()
                 var stat=status
                 var extens=extensionType
                 if(extens=0){
                 	extens="barnner"
                 }else if(extens==1){
                 	extens="推广"
                 }else{
                 	extens="咨询barnner"
                 	
                 }
                   stat=="0"?stat="启用":stat="停用"
					console.log(weight)
					$("#adopt .adopt-box .content .contain .left .load img").attr('src',advertisementPicture)
					$("#adopt .adopt-box .content .contain .contain-item .titles").val(title)
					$("#adopt .adopt-box .content .contain .contain-item .weight").val(weight)
					$("#adopt .adopt-box .content .contain .contain-item select.state").val(stat)
//					$("#adopt .adopt-box .content .contain .contain-item select.extensionType").val(extens)
					$("#adopt .adopt-box .content .contain .contain-item .address").val(advertisementUrl)
					
					var options = document.getElementById('select').children;
//					var selectIndex=""
//					status==0
                    options[status].selected=true;
					
			},
			
			switche:function(){
				var _this=this
				var index=$("#sitch .sitch-box #Index").val()
				var status=$("#sitch .sitch-box #State").val()
				var userId=$("#sitch .sitch-box #picId").val()
				$.ajax({
						type: "post",
						url: GlobalData.ADVER_URL+"editextension",
						async: true,
						dataType: "json",
						contentType: "application/json",
						data: JSON.stringify({
							bauId: _this.bauId,
							id: userId,
							status: status
						}),
						success: function(res) {
//							console.log("成功")
                            var msg=""
                           status==true?_this.databox[index].status=1:_this.databox[index].status=0;
                           status==true?msg="已经停用":msg="已经启用";
                           
//                         	_this.databox.unshift(datas)
//                         _this.getAdminUserAll(1,_this.row)
//             		        var length=$(".ui-paging-container").size()
//             		         $(".ui-paging-container").eq(length-1).remove()
                           
                          $("body").append('<div class="tips win slideInDowns"><i class="iconfont icon-chenggong"></i><div class="tip_text warm-box">'+msg+'</div></div>')
						},
						error: function() {
							console.log("错误")
						}
					});
			},
			

			//这里是点击是否启用
			Enable: function(index) {
				var _this=this
				//              	evt.stopPropagation()
				var texts = $(".person_" + index).find(".top i").text()
				
				$("#sitch .sitch-box #Index").val(index)
                 $("#sitch .sitch-box #picId").val($(".person_" + index).find(".userID").val())
                 
                 var bauId=this.bauId
                 var userId=$(".person_" + index).find(".userID").val()
                 var status=$(".person_" + index).find(".status").val()
                 console.log(bauId)
                 console.log(userId)
                 console.log(status)
//               var status=this.bauId
				   
				if(texts == "启用") {
					$("#sitch .sitch-box .content .contain .tip-con").text("确认停用此广告")
					$("#sitch .sitch-box #State").val("1")
				} else {
					$("#sitch .sitch-box .content .contain .tip-con").text("确认启用此广告")
					$("#sitch .sitch-box #State").val("0")

				}

				$("#sitch").css("display", "block")
				$("#sitch").addClass("fadeIn")
				$("#sitch .content").addClass("zoomInDown")

			},
			gernerateId: function(index) {

				return "person_" + index

			}
		},
		//这里是过滤器
		filters: {
			time: function(value) {
				var data = new Date(value)
				return data.getFullYear() + "-" + (data.getMonth() >= 10 ? (data.getMonth()+1) : ("0" + (data.getMonth()+1))) + "-" + data.getDate()
				
			}
		},
		mounted: function() {

			
            this.getAdminUserAll(1,this.row)
			
		},
		watch:{
			 row:{  
                handler:function(val,oldval){  
                    console.log(val)  
                     console.log(this.page)
                },  
                deep:true//对象内部的属性监听，也叫深度监听  
            },
		}
	})

})